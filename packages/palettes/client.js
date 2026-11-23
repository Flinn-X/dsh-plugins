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
    const PALETTES = {
  "paper": {
    "name": "纸白",
    "en": "Paper",
    "light": {
      "base": "#FCFAF6",
      "sidebar": "#F3EEE3",
      "bubble": "#F4EEE1",
      "accent": "#3B4A66"
    },
    "dark": {
      "base": "#17140F",
      "sidebar": "#1E1913",
      "bubble": "#262017",
      "accent": "#AFC0DE"
    },
    "tokens": {
      "--dsw-alias-bg-base": "#FCFAF6",
      "--dsw-alias-bg-layer-1": "#FFFDF9",
      "--dsw-alias-bg-layer-2": "#FFFDF9",
      "--dsw-alias-bg-layer-3": "#FFFDF9",
      "--dsw-alias-bg-overlay": "#EDE6D8",
      "--dsw-specific-input-major": "#FFFDF9",
      "--dsw-specific-sidebar-fill": "#F3EEE3",
      "--dsw-specific-sidebar-nav-item-active": "#EDE6D8",
      "--dsw-specific-sidebar-nav-item-active-accent": "#DFD5C0",
      "--dsw-specific-bubble": "#F4EEE1",
      "--dsw-specific-bubble-highlight": "#E9DFC9",
      "--dsw-specific-selector": "#F1EBDF",
      "--dsw-specific-tip": "#F6F1E7",
      "--dsw-alias-border-l1": "rgba(60,48,20,.07)",
      "--dsw-alias-border-l2": "rgba(60,48,20,.12)",
      "--dsw-alias-border-l3": "rgba(60,48,20,.16)",
      "--dsw-alias-border-l4": "rgba(60,48,20,.22)",
      "--dsw-alias-label-primary": "#1B1813",
      "--dsw-alias-label-secondary": "#57503F",
      "--dsw-alias-label-tertiary": "#6D6656",
      "--dsw-alias-label-caption": "#756D5A",
      "--dsw-alias-markdown-placeholder": "#6D6656",
      "--dsw-alias-brand-primary": "#23211B",
      "--dsw-alias-brand-text": "#23211B",
      "--dsw-alias-button-primary-fill": "#23211B",
      "--dsw-alias-button-primary-hover": "#3A362C",
      "--dsw-alias-button-contrast-fill": "#57503F",
      "--dsw-alias-state-idle-primary": "#CFC7B5",
      "--dsw-alias-interactive-bg-hover": "rgba(60,48,20,.055)",
      "--dsw-alias-interactive-bg-active": "rgba(60,48,20,.09)",
      "--dsw-alias-interactive-bg-hover-solid": "#EDE6D8",
      "--dsw-alias-markdown-code-block": "#F7F2E7",
      "--dsw-alias-markdown-code-block-banner": "#F2EBDE",
      "--dsw-alias-markdown-inline-code": "#F4EEE3",
      "--dsw-alias-markdown-tag": "#EFE8D9",
      "--dsw-alias-markdown-citation": "#ECE4D6",
      "--dsw-alias-link": "#3B4A66",
      "--dsw-alias-state-business-primary": "#3B4A66",
      "--dsw-alias-state-business-tertiary": "#E7EAF1",
      "--dsw-alias-scrollbar-bg-l1": "#DDD5C5",
      "--dsw-alias-scrollbar-hover-l1": "#CEC5B2",
      "--dsw-alias-menu-group-header-fill": "rgba(255,253,249,.94)"
    },
    "darkTokens": {
      "--dsw-alias-bg-base": "#17140F",
      "--dsw-alias-bg-layer-1": "#241F18",
      "--dsw-alias-bg-layer-2": "#2A241B",
      "--dsw-alias-bg-layer-3": "#332C21",
      "--dsw-alias-bg-overlay": "#302A21",
      "--dsw-specific-input-major": "#241F18",
      "--dsw-specific-sidebar-fill": "#1E1913",
      "--dsw-specific-sidebar-nav-item-active": "#2B241A",
      "--dsw-specific-sidebar-nav-item-active-accent": "#382F22",
      "--dsw-specific-bubble": "#262017",
      "--dsw-specific-bubble-highlight": "#2F2820",
      "--dsw-specific-selector": "#1D1812",
      "--dsw-specific-tip": "#241F18",
      "--dsw-alias-border-l1": "rgba(255,244,225,.10)",
      "--dsw-alias-border-l2": "rgba(255,244,225,.15)",
      "--dsw-alias-border-l3": "rgba(255,244,225,.19)",
      "--dsw-alias-border-l4": "rgba(255,244,225,.25)",
      "--dsw-alias-label-primary": "#F2ECE1",
      "--dsw-alias-label-secondary": "#C9C0AF",
      "--dsw-alias-label-tertiary": "#A79D8B",
      "--dsw-alias-label-caption": "#8D8474",
      "--dsw-alias-markdown-placeholder": "#A79D8B",
      "--dsw-alias-brand-primary": "#EDE6D8",
      "--dsw-alias-brand-text": "#EDE6D8",
      "--dsw-alias-button-primary-fill": "#EDE6D8",
      "--dsw-alias-button-primary-hover": "#FFFDF7",
      "--dsw-alias-button-contrast-fill": "#C9C0AF",
      "--dsw-alias-state-idle-primary": "#4A4438",
      "--dsw-alias-interactive-bg-hover": "rgba(255,244,225,.07)",
      "--dsw-alias-interactive-bg-active": "rgba(255,244,225,.12)",
      "--dsw-alias-interactive-bg-hover-solid": "#2B241A",
      "--dsw-alias-markdown-code-block": "#1B1710",
      "--dsw-alias-markdown-code-block-banner": "#241E16",
      "--dsw-alias-markdown-inline-code": "#201B14",
      "--dsw-alias-markdown-tag": "#2A241B",
      "--dsw-alias-markdown-citation": "#302A21",
      "--dsw-alias-link": "#AFC0DE",
      "--dsw-alias-state-business-primary": "#AFC0DE",
      "--dsw-alias-state-business-tertiary": "#222733",
      "--dsw-alias-scrollbar-bg-l1": "#3B352A",
      "--dsw-alias-scrollbar-hover-l1": "#4A4335",
      "--dsw-alias-menu-group-header-fill": "rgba(42,36,27,.94)"
    }
  },
  "mist": {
    "name": "雾蓝",
    "en": "Mist",
    "light": {
      "base": "#F5F8FB",
      "sidebar": "#EBF1F7",
      "bubble": "#E6EFF7",
      "accent": "#2D5F8F"
    },
    "dark": {
      "base": "#0F1419",
      "sidebar": "#151B21",
      "bubble": "#19242E",
      "accent": "#8FB8E0"
    },
    "tokens": {
      "--dsw-alias-bg-base": "#F5F8FB",
      "--dsw-alias-bg-layer-1": "#FFFFFF",
      "--dsw-alias-bg-layer-2": "#FFFFFF",
      "--dsw-alias-bg-layer-3": "#FFFFFF",
      "--dsw-alias-bg-overlay": "#E3EBF3",
      "--dsw-specific-input-major": "#FFFFFF",
      "--dsw-specific-sidebar-fill": "#EBF1F7",
      "--dsw-specific-sidebar-nav-item-active": "#E4EDF6",
      "--dsw-specific-sidebar-nav-item-active-accent": "#D5E5F4",
      "--dsw-specific-bubble": "#E6EFF7",
      "--dsw-specific-bubble-highlight": "#D6E5F4",
      "--dsw-specific-selector": "#EDF3F9",
      "--dsw-specific-tip": "#F1F6FB",
      "--dsw-alias-border-l1": "rgba(20,40,70,.07)",
      "--dsw-alias-border-l2": "rgba(20,40,70,.12)",
      "--dsw-alias-border-l3": "rgba(20,40,70,.16)",
      "--dsw-alias-border-l4": "rgba(20,40,70,.22)",
      "--dsw-alias-label-primary": "#121820",
      "--dsw-alias-label-secondary": "#4C5866",
      "--dsw-alias-label-tertiary": "#5F6C7B",
      "--dsw-alias-label-caption": "#626F7D",
      "--dsw-alias-markdown-placeholder": "#5F6C7B",
      "--dsw-alias-brand-primary": "#17202B",
      "--dsw-alias-brand-text": "#17202B",
      "--dsw-alias-button-primary-fill": "#17202B",
      "--dsw-alias-button-primary-hover": "#2A3947",
      "--dsw-alias-button-contrast-fill": "#4C5866",
      "--dsw-alias-state-idle-primary": "#C7D3DF",
      "--dsw-alias-interactive-bg-hover": "rgba(20,40,70,.055)",
      "--dsw-alias-interactive-bg-active": "rgba(20,40,70,.09)",
      "--dsw-alias-interactive-bg-hover-solid": "#E4EDF6",
      "--dsw-alias-markdown-code-block": "#F2F6FA",
      "--dsw-alias-markdown-code-block-banner": "#EDF3F8",
      "--dsw-alias-markdown-inline-code": "#EFF4F9",
      "--dsw-alias-markdown-tag": "#E8EFF6",
      "--dsw-alias-markdown-citation": "#E3ECF5",
      "--dsw-alias-link": "#2D5F8F",
      "--dsw-alias-state-business-primary": "#2D5F8F",
      "--dsw-alias-state-business-tertiary": "#E1EBF5",
      "--dsw-alias-scrollbar-bg-l1": "#D8E2EC",
      "--dsw-alias-scrollbar-hover-l1": "#C7D5E3",
      "--dsw-alias-menu-group-header-fill": "rgba(255,255,255,.94)"
    },
    "darkTokens": {
      "--dsw-alias-bg-base": "#0F1419",
      "--dsw-alias-bg-layer-1": "#1B2229",
      "--dsw-alias-bg-layer-2": "#202831",
      "--dsw-alias-bg-layer-3": "#262F39",
      "--dsw-alias-bg-overlay": "#242E37",
      "--dsw-specific-input-major": "#1B2229",
      "--dsw-specific-sidebar-fill": "#151B21",
      "--dsw-specific-sidebar-nav-item-active": "#1E2A36",
      "--dsw-specific-sidebar-nav-item-active-accent": "#263644",
      "--dsw-specific-bubble": "#19242E",
      "--dsw-specific-bubble-highlight": "#21303C",
      "--dsw-specific-selector": "#121920",
      "--dsw-specific-tip": "#171F27",
      "--dsw-alias-border-l1": "rgba(200,225,255,.10)",
      "--dsw-alias-border-l2": "rgba(200,225,255,.15)",
      "--dsw-alias-border-l3": "rgba(200,225,255,.19)",
      "--dsw-alias-border-l4": "rgba(200,225,255,.25)",
      "--dsw-alias-label-primary": "#E8F0F7",
      "--dsw-alias-label-secondary": "#B3C0CC",
      "--dsw-alias-label-tertiary": "#93A2B0",
      "--dsw-alias-label-caption": "#7F8D9B",
      "--dsw-alias-markdown-placeholder": "#93A2B0",
      "--dsw-alias-brand-primary": "#EAF2F9",
      "--dsw-alias-brand-text": "#EAF2F9",
      "--dsw-alias-button-primary-fill": "#EAF2F9",
      "--dsw-alias-button-primary-hover": "#FFFFFF",
      "--dsw-alias-button-contrast-fill": "#B3C0CC",
      "--dsw-alias-state-idle-primary": "#3E4A56",
      "--dsw-alias-interactive-bg-hover": "rgba(200,225,255,.07)",
      "--dsw-alias-interactive-bg-active": "rgba(200,225,255,.12)",
      "--dsw-alias-interactive-bg-hover-solid": "#1E2A36",
      "--dsw-alias-markdown-code-block": "#11171D",
      "--dsw-alias-markdown-code-block-banner": "#171F27",
      "--dsw-alias-markdown-inline-code": "#141C23",
      "--dsw-alias-markdown-tag": "#1B2833",
      "--dsw-alias-markdown-citation": "#242E37",
      "--dsw-alias-link": "#8FB8E0",
      "--dsw-alias-state-business-primary": "#8FB8E0",
      "--dsw-alias-state-business-tertiary": "#1B2833",
      "--dsw-alias-scrollbar-bg-l1": "#2A3540",
      "--dsw-alias-scrollbar-hover-l1": "#394654",
      "--dsw-alias-menu-group-header-fill": "rgba(32,40,49,.94)"
    }
  },
  "moss": {
    "name": "苔绿",
    "en": "Moss",
    "light": {
      "base": "#F7F8F2",
      "sidebar": "#EDF0E4",
      "bubble": "#EBF0DF",
      "accent": "#41633A"
    },
    "dark": {
      "base": "#12150F",
      "sidebar": "#181C14",
      "bubble": "#1E2516",
      "accent": "#A6C98F"
    },
    "tokens": {
      "--dsw-alias-bg-base": "#F7F8F2",
      "--dsw-alias-bg-layer-1": "#FDFDF9",
      "--dsw-alias-bg-layer-2": "#FDFDF9",
      "--dsw-alias-bg-layer-3": "#FDFDF9",
      "--dsw-alias-bg-overlay": "#E5E9D9",
      "--dsw-specific-input-major": "#FDFDF9",
      "--dsw-specific-sidebar-fill": "#EDF0E4",
      "--dsw-specific-sidebar-nav-item-active": "#E7EBDA",
      "--dsw-specific-sidebar-nav-item-active-accent": "#D9E2C9",
      "--dsw-specific-bubble": "#EBF0DF",
      "--dsw-specific-bubble-highlight": "#DFE7D1",
      "--dsw-specific-selector": "#EFF2E8",
      "--dsw-specific-tip": "#F3F6EE",
      "--dsw-alias-border-l1": "rgba(40,55,20,.07)",
      "--dsw-alias-border-l2": "rgba(40,55,20,.12)",
      "--dsw-alias-border-l3": "rgba(40,55,20,.16)",
      "--dsw-alias-border-l4": "rgba(40,55,20,.22)",
      "--dsw-alias-label-primary": "#161C12",
      "--dsw-alias-label-secondary": "#4A5542",
      "--dsw-alias-label-tertiary": "#5C6853",
      "--dsw-alias-label-caption": "#66725C",
      "--dsw-alias-markdown-placeholder": "#5C6853",
      "--dsw-alias-brand-primary": "#1B2216",
      "--dsw-alias-brand-text": "#1B2216",
      "--dsw-alias-button-primary-fill": "#1B2216",
      "--dsw-alias-button-primary-hover": "#2C3626",
      "--dsw-alias-button-contrast-fill": "#4A5542",
      "--dsw-alias-state-idle-primary": "#CBD3BE",
      "--dsw-alias-interactive-bg-hover": "rgba(40,55,20,.055)",
      "--dsw-alias-interactive-bg-active": "rgba(40,55,20,.09)",
      "--dsw-alias-interactive-bg-hover-solid": "#E7EBDA",
      "--dsw-alias-markdown-code-block": "#F3F5EB",
      "--dsw-alias-markdown-code-block-banner": "#EDF0E2",
      "--dsw-alias-markdown-inline-code": "#F1F4E7",
      "--dsw-alias-markdown-tag": "#E9EEDD",
      "--dsw-alias-markdown-citation": "#E4EAD7",
      "--dsw-alias-link": "#41633A",
      "--dsw-alias-state-business-primary": "#41633A",
      "--dsw-alias-state-business-tertiary": "#E3EBDD",
      "--dsw-alias-scrollbar-bg-l1": "#D9DECB",
      "--dsw-alias-scrollbar-hover-l1": "#C9D0BA",
      "--dsw-alias-menu-group-header-fill": "rgba(253,253,249,.94)"
    },
    "darkTokens": {
      "--dsw-alias-bg-base": "#12150F",
      "--dsw-alias-bg-layer-1": "#1F2419",
      "--dsw-alias-bg-layer-2": "#242A1D",
      "--dsw-alias-bg-layer-3": "#2B3224",
      "--dsw-alias-bg-overlay": "#2A3021",
      "--dsw-specific-input-major": "#1F2419",
      "--dsw-specific-sidebar-fill": "#181C14",
      "--dsw-specific-sidebar-nav-item-active": "#222B1B",
      "--dsw-specific-sidebar-nav-item-active-accent": "#2B3522",
      "--dsw-specific-bubble": "#1E2516",
      "--dsw-specific-bubble-highlight": "#27301D",
      "--dsw-specific-selector": "#161A11",
      "--dsw-specific-tip": "#1B2015",
      "--dsw-alias-border-l1": "rgba(225,240,205,.10)",
      "--dsw-alias-border-l2": "rgba(225,240,205,.15)",
      "--dsw-alias-border-l3": "rgba(225,240,205,.19)",
      "--dsw-alias-border-l4": "rgba(225,240,205,.25)",
      "--dsw-alias-label-primary": "#EBEFE3",
      "--dsw-alias-label-secondary": "#BCC5AF",
      "--dsw-alias-label-tertiary": "#9BA68D",
      "--dsw-alias-label-caption": "#85907A",
      "--dsw-alias-markdown-placeholder": "#9BA68D",
      "--dsw-alias-brand-primary": "#E7EEDD",
      "--dsw-alias-brand-text": "#E7EEDD",
      "--dsw-alias-button-primary-fill": "#E7EEDD",
      "--dsw-alias-button-primary-hover": "#F7FBEE",
      "--dsw-alias-button-contrast-fill": "#BCC5AF",
      "--dsw-alias-state-idle-primary": "#434C38",
      "--dsw-alias-interactive-bg-hover": "rgba(225,240,205,.07)",
      "--dsw-alias-interactive-bg-active": "rgba(225,240,205,.12)",
      "--dsw-alias-interactive-bg-hover-solid": "#222B1B",
      "--dsw-alias-markdown-code-block": "#141810",
      "--dsw-alias-markdown-code-block-banner": "#1B2015",
      "--dsw-alias-markdown-inline-code": "#171C12",
      "--dsw-alias-markdown-tag": "#1E2719",
      "--dsw-alias-markdown-citation": "#2A3021",
      "--dsw-alias-link": "#A6C98F",
      "--dsw-alias-state-business-primary": "#A6C98F",
      "--dsw-alias-state-business-tertiary": "#1E2719",
      "--dsw-alias-scrollbar-bg-l1": "#333C2B",
      "--dsw-alias-scrollbar-hover-l1": "#414A36",
      "--dsw-alias-menu-group-header-fill": "rgba(36,42,29,.94)"
    }
  },
  "iris": {
    "name": "藕荷",
    "en": "Iris",
    "light": {
      "base": "#FAF8FB",
      "sidebar": "#F2EDF5",
      "bubble": "#F2EAF6",
      "accent": "#654A7A"
    },
    "dark": {
      "base": "#14121A",
      "sidebar": "#1A1721",
      "bubble": "#221C2A",
      "accent": "#C0A6D6"
    },
    "tokens": {
      "--dsw-alias-bg-base": "#FAF8FB",
      "--dsw-alias-bg-layer-1": "#FFFFFF",
      "--dsw-alias-bg-layer-2": "#FFFFFF",
      "--dsw-alias-bg-layer-3": "#FFFFFF",
      "--dsw-alias-bg-overlay": "#E9E2EE",
      "--dsw-specific-input-major": "#FFFFFF",
      "--dsw-specific-sidebar-fill": "#F2EDF5",
      "--dsw-specific-sidebar-nav-item-active": "#EDE5F2",
      "--dsw-specific-sidebar-nav-item-active-accent": "#E2D6EC",
      "--dsw-specific-bubble": "#F2EAF6",
      "--dsw-specific-bubble-highlight": "#E5D8EE",
      "--dsw-specific-selector": "#F5EFF7",
      "--dsw-specific-tip": "#F8F3FA",
      "--dsw-alias-border-l1": "rgba(50,30,60,.07)",
      "--dsw-alias-border-l2": "rgba(50,30,60,.12)",
      "--dsw-alias-border-l3": "rgba(50,30,60,.16)",
      "--dsw-alias-border-l4": "rgba(50,30,60,.22)",
      "--dsw-alias-label-primary": "#1A1620",
      "--dsw-alias-label-secondary": "#514859",
      "--dsw-alias-label-tertiary": "#63596C",
      "--dsw-alias-label-caption": "#736880",
      "--dsw-alias-markdown-placeholder": "#63596C",
      "--dsw-alias-brand-primary": "#211A28",
      "--dsw-alias-brand-text": "#211A28",
      "--dsw-alias-button-primary-fill": "#211A28",
      "--dsw-alias-button-primary-hover": "#352B3D",
      "--dsw-alias-button-contrast-fill": "#514859",
      "--dsw-alias-state-idle-primary": "#D3C6DA",
      "--dsw-alias-interactive-bg-hover": "rgba(50,30,60,.055)",
      "--dsw-alias-interactive-bg-active": "rgba(50,30,60,.09)",
      "--dsw-alias-interactive-bg-hover-solid": "#EDE5F2",
      "--dsw-alias-markdown-code-block": "#F7F3F9",
      "--dsw-alias-markdown-code-block-banner": "#F2ECF5",
      "--dsw-alias-markdown-inline-code": "#F5EFF8",
      "--dsw-alias-markdown-tag": "#EFE7F3",
      "--dsw-alias-markdown-citation": "#EAE1EF",
      "--dsw-alias-link": "#654A7A",
      "--dsw-alias-state-business-primary": "#654A7A",
      "--dsw-alias-state-business-tertiary": "#EAE1F1",
      "--dsw-alias-scrollbar-bg-l1": "#DED4E4",
      "--dsw-alias-scrollbar-hover-l1": "#CFC2D6",
      "--dsw-alias-menu-group-header-fill": "rgba(255,255,255,.94)"
    },
    "darkTokens": {
      "--dsw-alias-bg-base": "#14121A",
      "--dsw-alias-bg-layer-1": "#211D28",
      "--dsw-alias-bg-layer-2": "#272231",
      "--dsw-alias-bg-layer-3": "#2E2838",
      "--dsw-alias-bg-overlay": "#2C2736",
      "--dsw-specific-input-major": "#211D28",
      "--dsw-specific-sidebar-fill": "#1A1721",
      "--dsw-specific-sidebar-nav-item-active": "#252030",
      "--dsw-specific-sidebar-nav-item-active-accent": "#2F283B",
      "--dsw-specific-bubble": "#221C2A",
      "--dsw-specific-bubble-highlight": "#2B2434",
      "--dsw-specific-selector": "#18141F",
      "--dsw-specific-tip": "#1D1825",
      "--dsw-alias-border-l1": "rgba(235,220,250,.10)",
      "--dsw-alias-border-l2": "rgba(235,220,250,.15)",
      "--dsw-alias-border-l3": "rgba(235,220,250,.19)",
      "--dsw-alias-border-l4": "rgba(235,220,250,.25)",
      "--dsw-alias-label-primary": "#EFEAF5",
      "--dsw-alias-label-secondary": "#C3BACC",
      "--dsw-alias-label-tertiary": "#A69BB2",
      "--dsw-alias-label-caption": "#8F849B",
      "--dsw-alias-markdown-placeholder": "#A69BB2",
      "--dsw-alias-brand-primary": "#EEE7F4",
      "--dsw-alias-brand-text": "#EEE7F4",
      "--dsw-alias-button-primary-fill": "#EEE7F4",
      "--dsw-alias-button-primary-hover": "#FBF6FF",
      "--dsw-alias-button-contrast-fill": "#C3BACC",
      "--dsw-alias-state-idle-primary": "#453F4E",
      "--dsw-alias-interactive-bg-hover": "rgba(235,220,250,.07)",
      "--dsw-alias-interactive-bg-active": "rgba(235,220,250,.12)",
      "--dsw-alias-interactive-bg-hover-solid": "#252030",
      "--dsw-alias-markdown-code-block": "#161219",
      "--dsw-alias-markdown-code-block-banner": "#1D1825",
      "--dsw-alias-markdown-inline-code": "#191420",
      "--dsw-alias-markdown-tag": "#292035",
      "--dsw-alias-markdown-citation": "#2C2736",
      "--dsw-alias-link": "#C0A6D6",
      "--dsw-alias-state-business-primary": "#C0A6D6",
      "--dsw-alias-state-business-tertiary": "#292035",
      "--dsw-alias-scrollbar-bg-l1": "#3A3345",
      "--dsw-alias-scrollbar-hover-l1": "#493F55",
      "--dsw-alias-menu-group-header-fill": "rgba(39,34,49,.94)"
    }
  },
  "celadon": {
    "name": "青瓷",
    "en": "Celadon",
    "light": {
      "base": "#F4F8F6",
      "sidebar": "#EAF2EE",
      "bubble": "#E3F0EB",
      "accent": "#14695F"
    },
    "dark": {
      "base": "#0E1513",
      "sidebar": "#131B18",
      "bubble": "#17251F",
      "accent": "#7FD0C0"
    },
    "tokens": {
      "--dsw-alias-bg-base": "#F4F8F6",
      "--dsw-alias-bg-layer-1": "#FFFFFF",
      "--dsw-alias-bg-layer-2": "#FFFFFF",
      "--dsw-alias-bg-layer-3": "#FFFFFF",
      "--dsw-alias-bg-overlay": "#DFEAE5",
      "--dsw-specific-input-major": "#FFFFFF",
      "--dsw-specific-sidebar-fill": "#EAF2EE",
      "--dsw-specific-sidebar-nav-item-active": "#E2EEE9",
      "--dsw-specific-sidebar-nav-item-active-accent": "#D2E7DF",
      "--dsw-specific-bubble": "#E3F0EB",
      "--dsw-specific-bubble-highlight": "#D3E8E1",
      "--dsw-specific-selector": "#ECF3F0",
      "--dsw-specific-tip": "#F0F7F4",
      "--dsw-alias-border-l1": "rgba(15,45,35,.07)",
      "--dsw-alias-border-l2": "rgba(15,45,35,.12)",
      "--dsw-alias-border-l3": "rgba(15,45,35,.16)",
      "--dsw-alias-border-l4": "rgba(15,45,35,.22)",
      "--dsw-alias-label-primary": "#101A16",
      "--dsw-alias-label-secondary": "#46554E",
      "--dsw-alias-label-tertiary": "#586760",
      "--dsw-alias-label-caption": "#61716A",
      "--dsw-alias-markdown-placeholder": "#586760",
      "--dsw-alias-brand-primary": "#14201C",
      "--dsw-alias-brand-text": "#14201C",
      "--dsw-alias-button-primary-fill": "#14201C",
      "--dsw-alias-button-primary-hover": "#263530",
      "--dsw-alias-button-contrast-fill": "#46554E",
      "--dsw-alias-state-idle-primary": "#C3D2CB",
      "--dsw-alias-interactive-bg-hover": "rgba(15,45,35,.055)",
      "--dsw-alias-interactive-bg-active": "rgba(15,45,35,.09)",
      "--dsw-alias-interactive-bg-hover-solid": "#E2EEE9",
      "--dsw-alias-markdown-code-block": "#F1F6F4",
      "--dsw-alias-markdown-code-block-banner": "#EBF2EF",
      "--dsw-alias-markdown-inline-code": "#EFF5F2",
      "--dsw-alias-markdown-tag": "#E7F0EC",
      "--dsw-alias-markdown-citation": "#E0ECE7",
      "--dsw-alias-link": "#14695F",
      "--dsw-alias-state-business-primary": "#14695F",
      "--dsw-alias-state-business-tertiary": "#DDEDE8",
      "--dsw-alias-scrollbar-bg-l1": "#D5E2DC",
      "--dsw-alias-scrollbar-hover-l1": "#C3D5CD",
      "--dsw-alias-menu-group-header-fill": "rgba(255,255,255,.94)"
    },
    "darkTokens": {
      "--dsw-alias-bg-base": "#0E1513",
      "--dsw-alias-bg-layer-1": "#19231F",
      "--dsw-alias-bg-layer-2": "#1F2A25",
      "--dsw-alias-bg-layer-3": "#26332E",
      "--dsw-alias-bg-overlay": "#22302B",
      "--dsw-specific-input-major": "#19231F",
      "--dsw-specific-sidebar-fill": "#131B18",
      "--dsw-specific-sidebar-nav-item-active": "#1C2A26",
      "--dsw-specific-sidebar-nav-item-active-accent": "#243530",
      "--dsw-specific-bubble": "#17251F",
      "--dsw-specific-bubble-highlight": "#1F2F29",
      "--dsw-specific-selector": "#121A17",
      "--dsw-specific-tip": "#16201C",
      "--dsw-alias-border-l1": "rgba(210,245,235,.10)",
      "--dsw-alias-border-l2": "rgba(210,245,235,.15)",
      "--dsw-alias-border-l3": "rgba(210,245,235,.19)",
      "--dsw-alias-border-l4": "rgba(210,245,235,.25)",
      "--dsw-alias-label-primary": "#E5F0EB",
      "--dsw-alias-label-secondary": "#B0C4BC",
      "--dsw-alias-label-tertiary": "#91A79E",
      "--dsw-alias-label-caption": "#7C938A",
      "--dsw-alias-markdown-placeholder": "#91A79E",
      "--dsw-alias-brand-primary": "#E3F1EC",
      "--dsw-alias-brand-text": "#E3F1EC",
      "--dsw-alias-button-primary-fill": "#E3F1EC",
      "--dsw-alias-button-primary-hover": "#F5FFFB",
      "--dsw-alias-button-contrast-fill": "#B0C4BC",
      "--dsw-alias-state-idle-primary": "#3B4B45",
      "--dsw-alias-interactive-bg-hover": "rgba(210,245,235,.07)",
      "--dsw-alias-interactive-bg-active": "rgba(210,245,235,.12)",
      "--dsw-alias-interactive-bg-hover-solid": "#1C2A26",
      "--dsw-alias-markdown-code-block": "#101715",
      "--dsw-alias-markdown-code-block-banner": "#16201C",
      "--dsw-alias-markdown-inline-code": "#131B18",
      "--dsw-alias-markdown-tag": "#16231F",
      "--dsw-alias-markdown-citation": "#22302B",
      "--dsw-alias-link": "#7FD0C0",
      "--dsw-alias-state-business-primary": "#7FD0C0",
      "--dsw-alias-state-business-tertiary": "#16231F",
      "--dsw-alias-scrollbar-bg-l1": "#2B3833",
      "--dsw-alias-scrollbar-hover-l1": "#384741",
      "--dsw-alias-menu-group-header-fill": "rgba(31,42,37,.94)"
    }
  }
}

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
