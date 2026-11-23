/* Development harness: exercise the Client module's apply() with a fake theme service. */
const fs = require('fs')
const path = require('path')
const vm = require('vm')
const assert = require('assert')

const paletteFile = path.join(__dirname, '..', '..', 'design', 'palettes.json')
const palettes = JSON.parse(fs.readFileSync(paletteFile, 'utf8'))
const source = fs.readFileSync(path.join(__dirname, 'client.js'), 'utf8')

const NEW_STORAGE_KEY = 'dsh-palettes/scheme'
const LEGACY_STORAGE_KEY = '@local/dsh-light-palettes/scheme'

const reactStub = {
  createElement: () => ({}),
  useState: (value) => [value, () => {}],
  useEffect: () => {},
}

/** Install the browser globals this module expects and evaluate client.js into a fresh factory. */
function scenario(seedStorage = {}) {
  const storage = new Map(Object.entries(seedStorage))
  const appended = []
  const observers = []
  let captured = null

  global.window = {
    __ModuleLoader__: {
      load(definition) {
        captured = definition
      },
    },
  }
  global.localStorage = {
    getItem: (key) => (storage.has(key) ? storage.get(key) : null),
    setItem: (key, value) => storage.set(key, value),
  }
  global.document = {
    querySelector: () => null,
    createElement: () => ({ dataset: {}, textContent: '', remove() {} }),
    head: { appendChild(tag) { appended.push(tag) } },
    body: {},
  }
  global.MutationObserver = class {
    constructor(callback) {
      this.callback = callback
      observers.push(this)
    }
    observe() {}
    disconnect() {}
  }

  vm.runInThisContext(source, { filename: 'client.js' })
  assert.ok(captured !== null, 'module loader did not receive a definition')
  assert.strictEqual(captured.id, 'dsh-palettes')

  const mod = captured.factory((name) => {
    assert.strictEqual(name, 'react')
    return reactStub
  })
  return { mod, storage, appended, observers }
}

/** Build the fake Client context handed to apply(). */
function makeCtx(theme, state) {
  return {
    theme,
    effect(callback) {
      const cleanup = callback()
      if (typeof cleanup === 'function') state.effectCleanups.push(cleanup)
    },
    locale: {
      register(ns, dicts) {
        state.localeRegistrations.push({ ns, dicts })
        return () => {}
      },
    },
    slots: {
      inject(name, callback) {
        assert.strictEqual(name, 'settings.general.item')
        callback()
      },
      register(options, component) {
        state.registrations.push({ options, component })
        return () => {}
      },
    },
  }
}

function newState() {
  return { registrations: [], effectCleanups: [], localeRegistrations: [], overrides: [], disposed: [] }
}

function makeTheme(getMode) {
  const state = newState()
  const theme = {
    getTheme: () => ({ active: { colorScheme: getMode() } }),
    overrideTokens(sourceId, tokens) {
      state.overrides.push({ source: sourceId, tokens })
      return () => state.disposed.push(sourceId)
    },
  }
  return { theme, state }
}

function assertTokens(actual, palette) {
  assert.deepStrictEqual(Object.keys(actual).sort(), Object.keys(palette.tokens).sort())
  for (const [name, modes] of Object.entries(actual)) {
    assert.strictEqual(modes.light, palette.tokens[name], 'light value mismatch for ' + name)
    assert.strictEqual(modes.dark, palette.darkTokens[name], 'dark value mismatch for ' + name)
  }
}

// ---- normal path: fresh storage defaults to Paper -------------------------
{
  const { mod, appended, observers } = scenario()
  let mode = 'light'
  const { theme, state } = makeTheme(() => mode)

  assert.ok(Array.isArray(mod.inject) && mod.inject.includes('theme'), 'theme service not injected')
  mod.apply(makeCtx(theme, state))

  assert.strictEqual(state.registrations.length, 1)
  const options = state.registrations[0].options
  assert.strictEqual(options.name, 'settings.general.item')
  assert.strictEqual(options.id, 'palettes')
  assert.strictEqual(options.order, 10.5)
  assert.strictEqual(options.locale, 'dsh-palettes')

  assert.strictEqual(state.localeRegistrations.length, 1)
  assert.strictEqual(state.localeRegistrations[0].ns, 'dsh-palettes')
  for (const locale of ['en', 'zh']) {
    assert.strictEqual(typeof state.localeRegistrations[0].dicts[locale]['row.title'], 'string')
  }

  assert.strictEqual(appended.length, 1, 'one stylesheet should be installed')
  assert.strictEqual(appended[0].dataset.plugin, 'dsh-palettes')
  assert.strictEqual(appended[0].dataset.pluginCss, 'dsh-palettes/stylesheet')

  assert.strictEqual(state.overrides.length, 1, 'first run should layer the Paper palette')
  assert.strictEqual(state.overrides[0].source, 'dsh-palettes')
  assertTokens(state.overrides[0].tokens, palettes.paper)

  mode = 'dark'
  observers[observers.length - 1].callback()
  assert.strictEqual(state.disposed.length, 0, 'dark appearance should keep the same layer')
  assert.strictEqual(state.overrides.length, 1, 'the layer recomposes for dark instead of re-registering')

  mode = 'light'
  observers[observers.length - 1].callback()
  assert.strictEqual(state.overrides.length, 1, 'switching back should not re-register')

  state.effectCleanups[state.effectCleanups.length - 1]()
  assert.strictEqual(state.disposed.length, 1, 'disposing the plugin should retract the layer')
}

// ---- legacy storage: the private build's choice is read once and migrated --
{
  const { mod, storage } = scenario({ [LEGACY_STORAGE_KEY]: 'mist' })
  const { theme, state } = makeTheme(() => 'light')
  mod.apply(makeCtx(theme, state))

  assert.strictEqual(state.overrides.length, 1)
  assertTokens(state.overrides[0].tokens, palettes.mist)
  assert.strictEqual(storage.get(NEW_STORAGE_KEY), 'mist', 'legacy choice should migrate to the new key')
}

// ---- fallback path: the theme service refuses the layer -------------------
{
  const { mod, appended } = scenario()
  const state = newState()
  const failingTheme = {
    getTheme: () => ({ active: { colorScheme: 'light' } }),
    overrideTokens() {
      throw new Error('service rejects the layer')
    },
  }
  mod.apply(makeCtx(failingTheme, state))

  const fallback = appended.filter((tag) => String(tag.dataset.pluginCss).endsWith('/fallback'))
  assert.strictEqual(fallback.length, 1, 'fallback stylesheet should be written once')
  assert.strictEqual(fallback[0].dataset.plugin, 'dsh-palettes')
  assert.ok(fallback[0].textContent.startsWith('html body:not([data-ds-dark-theme]){'))
  assert.ok(fallback[0].textContent.includes('body[data-ds-dark-theme]{'))
  assert.ok(fallback[0].textContent.includes('--dsw-alias-bg-base:' + palettes.paper.tokens['--dsw-alias-bg-base']))
  assert.ok(fallback[0].textContent.includes('--dsw-alias-bg-base:' + palettes.paper.darkTokens['--dsw-alias-bg-base']))
}

console.log(
  'client harness passed: %d palettes, %d tokens per mode, legacy migration, dark recompose and fallback verified',
  Object.keys(palettes).length,
  Object.keys(palettes.paper.tokens).length,
)
