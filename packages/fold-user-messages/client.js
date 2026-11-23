window.__ModuleLoader__.load({
  id: 'dsh-fold-user-messages',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    /** Locale namespace of this plugin's own copy. */
    const NS = 'dsh-fold-user-messages'
    /** Locale namespace the shipped Chat rows translate through. */
    const HOST_NS = 'chat'
    /** Keyed Chat node slot shared with the shipped renderer and other plugins. */
    const SLOT = 'conversation.chat.node'
    /** Row kinds replaced by this plugin. */
    const ROW_KEYS = ['user', 'steering']
    /** Priority of the shipped Chat rows; other plugins patch those components. */
    const ROW_PRIORITY = 0
    /** Natural row height, in px, above which a user message folds. */
    const FOLD_THRESHOLD = 300
    /** Style tag identity, so a re-applied plugin reuses one stylesheet. */
    const STYLE_ID = 'dsh-fold-user-messages/stylesheet'

    const EN = { expand: 'Show more', collapse: 'Show less' }
    const ZH = { expand: '展开全文', collapse: '收起' }

    const CSS = `
.dsh-umf-row{display:flex;flex-direction:column;align-items:flex-end;gap:6px;min-width:0;max-width:100%}
.dsh-umf-clip{display:flex;flex-direction:column;align-items:flex-end;min-width:0;max-width:min(calc(var(--dsh-chat-content-width,748px) * .702),82%)}
.dsh-umf-clip>div{max-width:100%;min-width:0}
.dsh-umf-clip[data-collapsed]{max-height:var(--dsh-umf-collapsed-height,220px);overflow:hidden;-webkit-mask-image:linear-gradient(to bottom,#000 0,#000 calc(100% - 56px),transparent 100%);mask-image:linear-gradient(to bottom,#000 0,#000 calc(100% - 56px),transparent 100%)}
.dsh-umf-toggle{display:inline-flex;align-items:center;gap:4px;height:24px;margin-top:-2px;padding:0 8px;border:0;border-radius:var(--dsw-radius-sm,6px);background:transparent;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary,#81858c));font:inherit;font-size:var(--dsh-content-font-size-secondary,13px);line-height:20px;white-space:nowrap;cursor:pointer;transition:background-color .12s ease,color .12s ease}
.dsh-umf-toggle svg{width:14px;height:14px;flex:none}
@media (hover:hover){.dsh-umf-toggle:hover{color:var(--dsw-alias-label-secondary,#61666b);background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.12))}}
.dsh-umf-toggle:focus-visible{outline:2px solid var(--dsw-alias-brand-primary,#247bbf);outline-offset:1px}
@media (prefers-reduced-motion:reduce){.dsh-umf-toggle{transition:none}}
`

    /** Install this plugin's stylesheet once and remove it with the effect. */
    function installStyles() {
      if (typeof document === 'undefined') return () => {}
      const selector = 'style[data-plugin-css=' + JSON.stringify(STYLE_ID) + ']'
      if (document.querySelector(selector) !== null) return () => {}
      const tag = document.createElement('style')
      tag.dataset.plugin = 'dsh-fold-user-messages'
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

    /** Unwrap the renderer function of one registered slot component. */
    function rendererOf(component) {
      if (typeof component === 'function') return component
      if (component === null || typeof component !== 'object') return undefined
      const type = component.type
      return typeof type === 'function' ? type : undefined
    }

    /** Split durable user content for the fallback row. */
    function contentParts(content) {
      const texts = []
      const attachments = []
      const rest = []
      for (const block of content) {
        const b = block
        if (b.type === 'text' && typeof b.text === 'string') texts.push(b.text)
        else if (b.type === 'image' && b.attachment !== undefined) attachments.push({ type: 'image', image: { attachment: b.attachment } })
        else if (b.type === 'file' && b.attachment !== undefined) attachments.push({ type: 'file', file: b.attachment })
        else rest.push(block)
      }
      return { text: texts.join(''), attachments, rest }
    }

    /**
     * Report whether the rendered bubble stack is tall enough to fold.
     * Layout-effect measurement settles before paint; resize observation
     * keeps late layout (images, font swaps) in sync.
     */
    function useOverflowing(ref) {
      const [overflowing, setOverflowing] = React.useState(false)
      React.useLayoutEffect(() => {
        const element = ref.current
        if (element === null) return undefined
        const measure = () => {
          const next = element.scrollHeight > FOLD_THRESHOLD
          setOverflowing((previous) => (previous === next ? previous : next))
        }
        measure()
        if (typeof ResizeObserver === 'undefined') return undefined
        const observer = new ResizeObserver(measure)
        observer.observe(element)
        const inner = element.firstElementChild
        if (inner !== null) observer.observe(inner)
        return () => observer.disconnect()
      }, [])
      return overflowing
    }

    function ChevronDownGlyph() {
      return h(
        'svg',
        { viewBox: '0 0 16 16', fill: 'none', strokeWidth: 1.3, 'aria-hidden': 'true', focusable: 'false' },
        h('path', { d: 'M4 6L7.29289 9.29289C7.68342 9.68342 8.31658 9.68342 8.70711 9.29289L12 6', stroke: 'currentColor' }),
      )
    }

    function ChevronUpGlyph() {
      return h(
        'svg',
        { viewBox: '0 0 16 16', fill: 'none', strokeWidth: 1.3, 'aria-hidden': 'true', focusable: 'false' },
        h('path', { d: 'M12 10L8.70711 6.70711C8.31658 6.31658 7.68342 6.31658 7.29289 6.70711L4 10', stroke: 'currentColor' }),
      )
    }

    /** Fold wrapper around one shipped user-content stack. */
    function FoldedContent({ labelT, children }) {
      const clipRef = React.useRef(null)
      const overflowing = useOverflowing(clipRef)
      const [expanded, setExpanded] = React.useState(false)
      const collapsed = overflowing && !expanded
      const contentId = 'dsh-umf-' + React.useId() + '-content'
      const label = expanded ? pick(labelT, 'collapse', 'Show less') : pick(labelT, 'expand', 'Show more')
      return h(
        React.Fragment,
        null,
        h(
          'div',
          {
            ref: clipRef,
            id: contentId,
            className: 'dsh-umf-clip',
            ...(collapsed ? { 'data-collapsed': '' } : {}),
          },
          children,
        ),
        overflowing
          ? h(
              'button',
              {
                type: 'button',
                className: 'dsh-umf-toggle',
                'aria-expanded': expanded,
                'aria-controls': contentId,
                onClick: () => setExpanded((value) => !value),
              },
              h('span', null, label),
              expanded ? h(ChevronUpGlyph) : h(ChevronDownGlyph),
            )
          : null,
      )
    }

    /** Degraded row used only when the shipped renderer cannot be resolved. */
    function FallbackRow({ node, loadImage, renderFactorySlot, rowT }) {
      if (typeof renderFactorySlot !== 'function') return null
      const data = node?.data ?? {}
      const content = Array.isArray(data.content) ? data.content : []
      const parts = contentParts(content)
      const prepared = { text: parts.text, attachments: parts.attachments, extraBlocks: parts.rest }
      const facts = {}
      if (data.referenceLabels !== undefined) {
        prepared.referenceLabels = data.referenceLabels
        facts.sessionLabels = data.referenceLabels
      }
      if (data.skillNames !== undefined) facts.skillNames = data.skillNames
      return h(
        'div',
        { className: 'dsh-umf-row' },
        h(
          FoldedContent,
          { labelT: rowT },
          renderFactorySlot('conversation.chat.user.content', { content: prepared, loadImage, facts, interactive: true }),
        ),
      )
    }

    /**
     * Wrap the shipped user row without replacing it.
     *
     * The official renderer (and any plugin that patched its component, such
     * as the rewind action) still builds the whole row — message-source chain,
     * bubble stack, copy/time actions. Only the content Factory output is
     * wrapped, so the bubble folds while every other row feature survives.
     */
    function makeRow(getOfficial) {
      return function RowWithFold(props) {
        const official = getOfficial(props.node?.kind)
        if (typeof official !== 'function' || typeof props.renderFactorySlot !== 'function') {
          return h(FallbackRow, props)
        }
        const row = official({ ...props, t: props.rowT })
        if (!React.isValidElement(row)) return row
        const inner = typeof row.props.renderFactorySlot === 'function' ? row.props.renderFactorySlot : props.renderFactorySlot
        return React.cloneElement(row, {
          renderFactorySlot: (name, factoryProps, options) => {
            const element = inner(name, factoryProps, options)
            if (name !== 'conversation.chat.user.content') return element
            return h(FoldedContent, { labelT: props.rowT }, element)
          },
        })
      }
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => installStyles(), 'dsh-fold-user-messages: styles')
        ctx.effect(() => ctx.locale.register(NS, { en: EN, zh: ZH }), 'dsh-fold-user-messages: dictionaries')

        const hostT = ctx.locale.bind(HOST_NS)
        const ownT = ctx.locale.bind(NS)
        const rowT = (key, params) => {
          let value
          try {
            value = hostT(key, params)
          } catch {
            value = key
          }
          if (value !== key) return value
          try {
            return ownT(key, params)
          } catch {
            return key
          }
        }

        /** Latest renderer for one row kind, including patches from other plugins. */
        const getOfficial = (kind) => {
          if (typeof kind !== 'string' || typeof ctx.slots.entries !== 'function') return undefined
          let found
          for (const entry of ctx.slots.entries(SLOT)) {
            if (entry.options.key !== kind) continue
            if ((entry.options.priority ?? 0) !== ROW_PRIORITY) continue
            found = entry
          }
          return found === undefined ? undefined : rendererOf(found.component)
        }

        const Row = makeRow(getOfficial)
        for (const key of ROW_KEYS) {
          ctx.slots.inject(SLOT, () =>
            ctx.slots.register({
              name: SLOT,
              key,
              priority: -1,
              inject: () => ({ rowT, renderSlotChain: () => null }),
            }, Row),
          )
        }
      },
    }
  },
})
