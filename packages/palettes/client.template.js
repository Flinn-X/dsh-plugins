window.__ModuleLoader__.load({
  id: 'dsh-palettes',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    /** Locale namespace of this plugin's settings row. */
    const NS = 'dsh-palettes'
    /** Layer identity for the theme override stack. */
    const SOURCE = 'dsh-palettes'
    /** Per-browser preference, independent from the built-in appearance setting. */
    const STORAGE_KEY = 'dsh-palettes/scheme'
    /** Key used by the private build this plugin replaced; read once and migrated. */
    const LEGACY_STORAGE_KEY = '@local/dsh-light-palettes/scheme'
    /** Sentinel for "no palette" — the stock DSH appearance. */
    const DEFAULT_ID = 'default'
    /** Palette order in the settings row. */
    const ORDER = ['paper', 'mist', 'moss', 'iris', 'celadon']
    /** Style tag identity, so a re-applied plugin reuses one stylesheet. */
    const STYLE_ID = 'dsh-palettes/stylesheet'

    /** Alias tokens for every palette, in both color schemes. */
    const PALETTES = __PALETTES__

    /** Stock DSH appearance, shown on the "Default" swatch. */
    const DEFAULT_PREVIEW = {
      light: { base: '#FFFFFF', sidebar: '#F9FAFB', bubble: '#EDF3FE', accent: '#4176E6' },
      dark: { base: '#151517', sidebar: '#1B1B1C', bubble: '#2C2C2E', accent: '#7AAAFF' },
    }

    const EN = {
      'row.title': 'Palette',
      'row.note': 'A light and a dark version; follows the appearance setting.',
      'row.default': 'Default',
      'scheme.paper': 'Paper',
      'scheme.mist': 'Mist',
      'scheme.moss': 'Moss',
      'scheme.iris': 'Iris',
      'scheme.celadon': 'Celadon',
    }
    const ZH = {
      'row.title': '配色方案',
      'row.note': '浅色与深色各一套；跟随外观自动切换。',
      'row.default': '默认',
      'scheme.paper': '纸白',
      'scheme.mist': '雾蓝',
      'scheme.moss': '苔绿',
      'scheme.iris': '藕荷',
      'scheme.celadon': '青瓷',
    }

    const CSS = `
.dsh-lp-group{display:flex;flex-direction:column;gap:8px;padding:16px 0;border-top:1px solid var(--dsw-alias-border-l2,rgba(127,127,127,.18))}
.dsh-lp-title{color:var(--dsw-alias-label-primary);font-size:14px;line-height:22px}
.dsh-lp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(92px,1fr));gap:8px}
.dsh-lp-chip{display:flex;flex-direction:column;gap:7px;min-width:0;padding:7px;border:.5px solid var(--dsw-alias-border-l4,rgba(127,127,127,.3));border-radius:10px;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer;transition:background-color .12s ease,border-color .12s ease}
@media (hover:hover){.dsh-lp-chip:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.08))}}
.dsh-lp-chip[aria-pressed="true"]{border-color:var(--dsw-alias-label-secondary);box-shadow:inset 0 0 0 1px var(--dsw-alias-label-secondary)}
.dsh-lp-chip:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary,#4176e6);outline-offset:2px}
.dsh-lp-swatch{position:relative;height:28px;border-radius:6px;overflow:hidden;display:flex;box-shadow:inset 0 0 0 1px rgba(128,128,128,.28)}
.dsh-lp-swatch i{display:block;flex:1}
.dsh-lp-swatch i:nth-child(1){flex:1.05}
.dsh-lp-swatch i:nth-child(3){flex:.95}
.dsh-lp-bar{position:absolute;left:0;right:0;bottom:0;height:3px}
.dsh-lp-name{font-size:12.5px;line-height:16px;color:var(--dsw-alias-label-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dsh-lp-note{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}
@media (prefers-reduced-motion:reduce){.dsh-lp-chip{transition:none}}
`

    /** Install this plugin's stylesheet once and remove it with the effect. */
    function installStyles() {
      if (typeof document === 'undefined') return () => {}
      const selector = 'style[data-plugin-css=' + JSON.stringify(STYLE_ID) + ']'
      if (document.querySelector(selector) !== null) return () => {}
      const tag = document.createElement('style')
      tag.dataset.plugin = 'dsh-palettes'
      tag.dataset.pluginCss = STYLE_ID
      tag.textContent = CSS
      document.head.appendChild(tag)
      return () => tag.remove()
    }

    /** Read a localized label, falling back when the dictionary has no value. */
    function pick(t, key, fallback) {
      let value
      try {
        value = typeof t === 'function' ? t(key) : undefined
      } catch {
        value = undefined
      }
      return typeof value === 'string' && value !== '' && value !== key ? value : fallback
    }

    /** Read the stored palette id, tolerating unavailable storage. */
    function readStored() {
      try {
        const current = localStorage.getItem(STORAGE_KEY)
        const legacy = current === null ? localStorage.getItem(LEGACY_STORAGE_KEY) : null
        const value = current !== null ? current : legacy
        if (value === DEFAULT_ID) return DEFAULT_ID
        if (typeof value === 'string' && PALETTES[value] !== undefined) {
          if (current === null) writeStored(value)
          return value
        }
        return 'paper'
      } catch {
        return 'paper'
      }
    }

    /** Persist the palette id for this browser; storage failures are not fatal. */
    function writeStored(id) {
      try {
        localStorage.setItem(STORAGE_KEY, id)
      } catch {}
    }

    /** Minimal external store so the settings row follows changes from anywhere. */
    function createStore(initial) {
      let value = initial
      const listeners = new Set()
      return {
        get() {
          return value
        },
        set(next) {
          if (next === value) return
          value = next
          for (const listener of Array.from(listeners)) listener()
        },
        subscribe(listener) {
          listeners.add(listener)
          return () => {
            listeners.delete(listener)
          }
        },
      }
    }

    const schemeStore = createStore(readStored())
    const modeStore = createStore('light')

    /** Subscribe a component to one store. */
    function useStore(store) {
      const [value, setValue] = React.useState(store.get())
      React.useEffect(() => store.subscribe(() => setValue(store.get())), [store])
      return value
    }

    /** Set by apply(): change the selected palette from the settings row. */
    let selectScheme = () => {}

    /** Read one display color for a palette in the given scheme. */
    function paletteColor(id, mode, key) {
      if (id === DEFAULT_ID) return DEFAULT_PREVIEW[mode][key]
      const palette = PALETTES[id]
      const colors = palette[mode] !== undefined ? palette[mode] : palette.light
      return colors[key] !== undefined ? colors[key] : 'transparent'
    }

    /** One palette swatch: canvas, sidebar, bubble, and the accent rule. */
    function PaletteSwatch({ id, mode }) {
      return h(
        'span',
        { className: 'dsh-lp-swatch' },
        h('i', { style: { background: paletteColor(id, mode, 'base') } }),
        h('i', { style: { background: paletteColor(id, mode, 'sidebar') } }),
        h('i', { style: { background: paletteColor(id, mode, 'bubble') } }),
        h('span', { className: 'dsh-lp-bar', style: { background: paletteColor(id, mode, 'accent') } }),
      )
    }

    /** Settings → General row that switches the palette. */
    function PaletteRow({ t }) {
      const selected = useStore(schemeStore)
      const mode = useStore(modeStore)
      const title = pick(t, 'row.title', '配色方案')
      const note = pick(t, 'row.note', '浅色与深色各一套；跟随外观自动切换。')
      const items = [{ id: DEFAULT_ID, name: pick(t, 'row.default', '默认') }].concat(
        ORDER.map((id) => ({ id, name: pick(t, 'scheme.' + id, PALETTES[id].name) })),
      )
      return h(
        'div',
        { className: 'dsh-lp-group' },
        h('div', { className: 'dsh-lp-title' }, title),
        h(
          'div',
          { className: 'dsh-lp-grid' },
          items.map((item) =>
            h(
              'button',
              {
                key: item.id,
                type: 'button',
                className: 'dsh-lp-chip',
                'aria-pressed': selected === item.id,
                onClick: () => selectScheme(item.id),
              },
              h(PaletteSwatch, { id: item.id, mode }),
              h('span', { className: 'dsh-lp-name' }, item.name),
            ),
          ),
        ),
        h('div', { className: 'dsh-lp-note' }, note),
      )
    }

    return {
      inject: ['slots', 'locale', 'theme'],
      apply(ctx) {
        const theme = ctx.theme

        ctx.effect(() => installStyles(), 'dsh-palettes: styles')
        ctx.effect(() => ctx.locale.register(NS, { en: EN, zh: ZH }), 'dsh-palettes: dictionaries')

        /** Palette currently layered over the active theme, or null. */
        let applied = null
        /** Disposer for the override layer currently on the stack. */
        let disposeLayer = null
        /** Stylesheet used only when the theme service rejects the override layer. */
        let fallbackStyle = null

        /** Resolved color scheme of the active appearance. */
        const activeMode = () => {
          try {
            return theme.getTheme().active.colorScheme === 'dark' ? 'dark' : 'light'
          } catch {
            return 'light'
          }
        }

        /** Write both schemes through a scoped stylesheet when the service call fails. */
        const writeFallback = (id) => {
          if (typeof document === 'undefined') return
          if (fallbackStyle === null) {
            fallbackStyle = document.createElement('style')
            fallbackStyle.dataset.plugin = 'dsh-palettes'
            fallbackStyle.dataset.pluginCss = STYLE_ID + '/fallback'
            document.head.appendChild(fallbackStyle)
          }
          const declarations = (tokens) =>
            Object.entries(tokens)
              .map(([name, value]) => name + ':' + value)
              .join(';')
          fallbackStyle.textContent =
            'html body:not([data-ds-dark-theme]){' + declarations(PALETTES[id].tokens) + '}\n' +
            'html body[data-ds-dark-theme]{' + declarations(PALETTES[id].darkTokens) + '}'
        }

        /** Remove the fallback stylesheet, if one was written. */
        const clearFallback = () => {
          if (fallbackStyle !== null) {
            fallbackStyle.remove()
            fallbackStyle = null
          }
        }

        /** Layer or retract the selected palette; mode changes recompose in place. */
        const sync = () => {
          modeStore.set(activeMode())
          const selected = schemeStore.get()
          const wanted = selected !== DEFAULT_ID ? selected : null
          if (wanted === applied) return
          applied = wanted
          if (disposeLayer !== null) {
            const dispose = disposeLayer
            disposeLayer = null
            dispose()
          }
          clearFallback()
          if (wanted === null) return
          const light = PALETTES[wanted].tokens
          const dark = PALETTES[wanted].darkTokens
          const tokens = {}
          for (const [name, value] of Object.entries(light)) tokens[name] = { light: value, dark: dark[name] !== undefined ? dark[name] : value }
          try {
            disposeLayer = theme.overrideTokens(SOURCE, tokens)
          } catch (error) {
            disposeLayer = null
            console.warn('[dsh-palettes] cannot layer palette, using a scoped stylesheet', error)
            writeFallback(wanted)
          }
        }

        selectScheme = (id) => {
          if (id !== DEFAULT_ID && PALETTES[id] === undefined) return
          schemeStore.set(id)
          writeStored(id)
          sync()
        }

        ctx.effect(() => {
          sync()
          if (typeof document === 'undefined' || document.body === null || typeof MutationObserver === 'undefined') {
            return () => {}
          }
          const observer = new MutationObserver(sync)
          observer.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] })
          return () => {
            observer.disconnect()
            if (disposeLayer !== null) {
              disposeLayer()
              disposeLayer = null
            }
            clearFallback()
            applied = null
          }
        }, 'dsh-palettes: appearance sync')

        ctx.slots.inject('settings.general.item', () =>
          ctx.slots.register(
            {
              name: 'settings.general.item',
              id: 'palettes',
              order: 10.5,
              locale: NS,
            },
            PaletteRow,
          ),
        )
      },
    }
  },
})
