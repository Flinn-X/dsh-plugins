#!/usr/bin/env node
/**
 * Validate the two plugin packages in this repository without installing DSH:
 * manifest shape, bundle patch, exports, client module identity, locale metadata,
 * icon bytes, and the fields a registry install and the community catalog read.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const packagesDir = join(root, 'packages')

const failures = []
const notes = []

function fail(pkg, message) {
  failures.push(`${pkg}: ${message}`)
}

function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'))
}

function exists(file) {
  try {
    return statSync(file).isFile()
  } catch {
    return false
  }
}

function requireFile(pkg, file, label) {
  if (!exists(file)) fail(pkg, `missing ${label ?? file}`)
  return exists(file)
}

function checkManifest(pkgDir, manifest) {
  const pkg = manifest.name ?? pkgDir

  if (typeof manifest.name !== 'string' || !/^[a-z0-9][a-z0-9-]*$/.test(manifest.name)) {
    fail(pkg, 'name must be a lowercase unscoped npm name')
  } else if (!manifest.name.startsWith('dsh-')) {
    fail(pkg, "name should start with 'dsh-'")
  }
  const expectedDirs = [manifest.name, String(manifest.name).replace(/^dsh-/, '')]
  if (!expectedDirs.includes(pkgDir)) {
    fail(pkg, `directory name (${pkgDir}) must be '${manifest.name}' or '${expectedDirs[1]}'`)
  }
  if (manifest.private === true) fail(pkg, 'published packages must not be private')
  if (typeof manifest.version !== 'string' || !/^\d+\.\d+\.\d+(-[0-9a-z.-]+)?$/i.test(manifest.version)) {
    fail(pkg, 'version must be semver')
  }
  if (manifest.license !== 'MIT') fail(pkg, "license must be 'MIT'")
  if (typeof manifest.description !== 'string' || manifest.description.length < 20) {
    fail(pkg, 'description must be a meaningful sentence')
  }
  if (manifest.type !== 'module') fail(pkg, "type must be 'module'")
  if (!manifest.repository?.url?.includes('github.com/Flinn-X/dsh-plugins')) {
    fail(pkg, 'repository.url must point at Flinn-X/dsh-plugins')
  }
  if (manifest.repository?.directory !== `packages/${pkgDir}`) {
    fail(pkg, 'repository.directory must match the package directory')
  }
  if (typeof manifest.engines?.dsh !== 'string' || manifest.engines.dsh.trim() === '') {
    fail(pkg, 'engines.dsh must declare the supported DSH range')
  }
  if (!Array.isArray(manifest.keywords) || !manifest.keywords.includes('dsh-plugin')) {
    fail(pkg, "keywords must include 'dsh-plugin'")
  }
  for (const field of ['dependencies', 'peerDependencies', 'optionalDependencies']) {
    if (manifest[field] !== undefined && Object.keys(manifest[field]).length > 0) {
      fail(pkg, `${field} must stay empty: these plugins import nothing at runtime`)
    }
  }
  for (const script of ['preinstall', 'install', 'postinstall', 'prepare']) {
    if (manifest.scripts?.[script] !== undefined) fail(pkg, `${script} would need build approval on install`)
  }

  const dsh = manifest.dsh
  if (dsh === undefined) return fail(pkg, 'missing dsh manifest')
  if (dsh.bundle?.patch !== './cordis.patch.yml') fail(pkg, "dsh.bundle.patch must be './cordis.patch.yml'")
  if (dsh.client?.platform !== 'web') fail(pkg, "dsh.client.platform must be 'web'")
  if (!Array.isArray(dsh.client?.inject) || dsh.client.inject.length === 0) {
    fail(pkg, 'dsh.client.inject should name the client packages the module needs')
  }
  if (dsh.client?.immediately !== true) notes.push(`${pkg}: dsh.client.immediately is not true`)
}

function checkFiles(pkgDir, pkg, manifest, packageDir) {
  const required = ['index.js', 'client.js', 'cordis.patch.yml', 'icon.svg', 'locale/en.json', 'locale/zh.json', 'README.md', 'LICENSE']
  for (const relative of required) requireFile(pkg, join(packageDir, relative), relative)

  const files = manifest.files ?? []
  for (const entry of ['index.js', 'client.js', 'cordis.patch.yml', 'icon.svg', 'README.md', 'LICENSE']) {
    if (!files.includes(entry)) fail(pkg, `files[] must include ${entry}`)
  }
  if (!files.some((entry) => entry.startsWith('locale/'))) fail(pkg, 'files[] must include the locale directory')

  const exportsField = manifest.exports ?? {}
  const expectedExports = { '.': './index.js', './client': './client.js', './icon': './icon.svg' }
  for (const [key, target] of Object.entries(expectedExports)) {
    if (exportsField[key] !== target) fail(pkg, `exports["${key}"] must be "${target}"`)
  }
  if (exportsField['./locale/*.json'] !== './locale/*.json') {
    fail(pkg, 'exports must expose "./locale/*.json"')
  }

  if (exists(join(packageDir, 'icon.svg'))) {
    const icon = readFileSync(join(packageDir, 'icon.svg'), 'utf8')
    if (!icon.trimStart().startsWith('<svg')) fail(pkg, 'icon.svg is not an SVG document')
    if (statSync(join(packageDir, 'icon.svg')).size > 256 * 1024) fail(pkg, 'icon.svg exceeds 256 KiB')
  }

  for (const locale of ['en', 'zh']) {
    const file = join(packageDir, 'locale', `${locale}.json`)
    if (!exists(file)) continue
    let dict
    try {
      dict = readJson(file)
    } catch (error) {
      fail(pkg, `locale/${locale}.json is not valid JSON: ${error.message}`)
      continue
    }
    for (const key of ['title', 'description']) {
      if (typeof dict.meta?.[key] !== 'string' || dict.meta[key].trim() === '') {
        fail(pkg, `locale/${locale}.json meta.${key} is required`)
      }
    }
  }

  const patchFile = join(packageDir, 'cordis.patch.yml')
  if (exists(patchFile)) {
    const patch = readFileSync(patchFile, 'utf8')
    if (!patch.includes(`name: '${manifest.name}'`)) fail(pkg, "patch must insert a row named after the package")
    if (!/id:\s*[a-z0-9-]+/.test(patch)) fail(pkg, 'patch row needs an id')
  }

  const clientFile = join(packageDir, 'client.js')
  if (exists(clientFile)) {
    const head = readFileSync(clientFile, 'utf8').slice(0, 400)
    if (!head.includes('window.__ModuleLoader__.load(')) {
      fail(pkg, 'client.js must register through window.__ModuleLoader__.load()')
    }
    if (!head.includes(`id: '${manifest.name}'`)) {
      fail(pkg, 'client.js module id must equal the package name')
    }
  }
}

const entries = []
for (const pkgDir of readdirSync(packagesDir)) {
  const packageDir = join(packagesDir, pkgDir)
  if (!statSync(packageDir).isDirectory()) continue
  const manifest = readJson(join(packageDir, 'package.json'))
  checkManifest(pkgDir, manifest)
  checkFiles(pkgDir, manifest.name ?? pkgDir, manifest, packageDir)
  entries.push({ name: manifest.name, version: manifest.version })
}

const rootManifest = readJson(join(root, 'package.json'))
if (rootManifest.private !== true) failures.push('root: package.json must be private')
if (rootManifest.workspaces?.join(',') !== 'packages/*') failures.push("root: workspaces must be ['packages/*']")

for (const note of notes) console.log(`note: ${note}`)
if (failures.length > 0) {
  console.error(`check-packages: ${failures.length} problem(s)`)
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exit(1)
}
console.log(`check-packages: ${entries.length} package(s) OK — ${entries.map((entry) => `${entry.name}@${entry.version}`).join(', ')}`)
