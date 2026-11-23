# -*- coding: utf-8 -*-
"""DSH 浅色/深色配色 —— 单一数据源，产出 palettes.json 与预览 HTML。"""
import json, os, sys

ROOT = os.path.dirname(os.path.abspath(__file__))

# --------------------------------------------------------------------------
# 每套方案两种模式。浅色、深色共用同一组语义槽位，只换值。
# --------------------------------------------------------------------------
PALETTES = {
    "paper": {
        "order": 1,
        "name": "纸白",
        "en": "Paper",
        "idea": "暖纸色的底，配墨蓝的强调色。把长时间阅读的白底冷光收一点，气泡用米色，不抢正文。",
        "light": {
            "base": "#FCFAF6", "sidebar": "#F3EEE3", "surface": "#FFFDF9",
            "surface2": "#FFFDF9", "surface3": "#FFFDF9", "overlay": "#EDE6D8",
            "ink": "#1B1813", "sec": "#57503F", "ter": "#6D6656", "cap": "#756D5A",
            "accent": "#3B4A66", "tint": "#E7EAF1",
            "brand": "#23211B", "brandHover": "#3A362C",
            "bubble": "#F4EEE1", "bubbleHi": "#E9DFC9",
            "sel": "#EDE6D8", "selAccent": "#DFD5C0",
            "selector": "#F1EBDF", "tip": "#F6F1E7", "idle": "#CFC7B5",
            "code": "#F7F2E7", "banner": "#F2EBDE", "inline": "#F4EEE3",
            "tag": "#EFE8D9", "cite": "#ECE4D6",
            "border": "60,48,20", "scroll": "#DDD5C5", "scrollHover": "#CEC5B2",
        },
        "dark": {
            "base": "#17140F", "sidebar": "#1E1913", "surface": "#241F18",
            "surface2": "#2A241B", "surface3": "#332C21", "overlay": "#302A21",
            "ink": "#F2ECE1", "sec": "#C9C0AF", "ter": "#A79D8B", "cap": "#8D8474",
            "accent": "#AFC0DE", "tint": "#222733",
            "brand": "#EDE6D8", "brandHover": "#FFFDF7",
            "bubble": "#262017", "bubbleHi": "#2F2820",
            "sel": "#2B241A", "selAccent": "#382F22",
            "selector": "#1D1812", "tip": "#241F18", "idle": "#4A4438",
            "code": "#1B1710", "banner": "#241E16", "inline": "#201B14",
            "tag": "#2A241B", "cite": "#302A21",
            "border": "255,244,225", "scroll": "#3B352A", "scrollHover": "#4A4335",
        },
    },
    "mist": {
        "order": 2,
        "name": "雾蓝",
        "en": "Mist",
        "idea": "冷灰蓝的底，强调色压成石板蓝。最接近 DSH 原本的冷调，但把纯白换成有空气感的雾面。",
        "light": {
            "base": "#F5F8FB", "sidebar": "#EBF1F7", "surface": "#FFFFFF",
            "surface2": "#FFFFFF", "surface3": "#FFFFFF", "overlay": "#E3EBF3",
            "ink": "#121820", "sec": "#4C5866", "ter": "#5F6C7B", "cap": "#626F7D",
            "accent": "#2D5F8F", "tint": "#E1EBF5",
            "brand": "#17202B", "brandHover": "#2A3947",
            "bubble": "#E6EFF7", "bubbleHi": "#D6E5F4",
            "sel": "#E4EDF6", "selAccent": "#D5E5F4",
            "selector": "#EDF3F9", "tip": "#F1F6FB", "idle": "#C7D3DF",
            "code": "#F2F6FA", "banner": "#EDF3F8", "inline": "#EFF4F9",
            "tag": "#E8EFF6", "cite": "#E3ECF5",
            "border": "20,40,70", "scroll": "#D8E2EC", "scrollHover": "#C7D5E3",
        },
        "dark": {
            "base": "#0F1419", "sidebar": "#151B21", "surface": "#1B2229",
            "surface2": "#202831", "surface3": "#262F39", "overlay": "#242E37",
            "ink": "#E8F0F7", "sec": "#B3C0CC", "ter": "#93A2B0", "cap": "#7F8D9B",
            "accent": "#8FB8E0", "tint": "#1B2833",
            "brand": "#EAF2F9", "brandHover": "#FFFFFF",
            "bubble": "#19242E", "bubbleHi": "#21303C",
            "sel": "#1E2A36", "selAccent": "#263644",
            "selector": "#121920", "tip": "#171F27", "idle": "#3E4A56",
            "code": "#11171D", "banner": "#171F27", "inline": "#141C23",
            "tag": "#1B2833", "cite": "#242E37",
            "border": "200,225,255", "scroll": "#2A3540", "scrollHover": "#394654",
        },
    },
    "moss": {
        "order": 3,
        "name": "苔绿",
        "en": "Moss",
        "idea": "鼠尾草绿的底，苔绿做强调。整个界面像一张护眼的稿纸，代码块和标签都带一点草本的灰。",
        "light": {
            "base": "#F7F8F2", "sidebar": "#EDF0E4", "surface": "#FDFDF9",
            "surface2": "#FDFDF9", "surface3": "#FDFDF9", "overlay": "#E5E9D9",
            "ink": "#161C12", "sec": "#4A5542", "ter": "#5C6853", "cap": "#66725C",
            "accent": "#41633A", "tint": "#E3EBDD",
            "brand": "#1B2216", "brandHover": "#2C3626",
            "bubble": "#EBF0DF", "bubbleHi": "#DFE7D1",
            "sel": "#E7EBDA", "selAccent": "#D9E2C9",
            "selector": "#EFF2E8", "tip": "#F3F6EE", "idle": "#CBD3BE",
            "code": "#F3F5EB", "banner": "#EDF0E2", "inline": "#F1F4E7",
            "tag": "#E9EEDD", "cite": "#E4EAD7",
            "border": "40,55,20", "scroll": "#D9DECB", "scrollHover": "#C9D0BA",
        },
        "dark": {
            "base": "#12150F", "sidebar": "#181C14", "surface": "#1F2419",
            "surface2": "#242A1D", "surface3": "#2B3224", "overlay": "#2A3021",
            "ink": "#EBEFE3", "sec": "#BCC5AF", "ter": "#9BA68D", "cap": "#85907A",
            "accent": "#A6C98F", "tint": "#1E2719",
            "brand": "#E7EEDD", "brandHover": "#F7FBEE",
            "bubble": "#1E2516", "bubbleHi": "#27301D",
            "sel": "#222B1B", "selAccent": "#2B3522",
            "selector": "#161A11", "tip": "#1B2015", "idle": "#434C38",
            "code": "#141810", "banner": "#1B2015", "inline": "#171C12",
            "tag": "#1E2719", "cite": "#2A3021",
            "border": "225,240,205", "scroll": "#333C2B", "scrollHover": "#414A36",
        },
    },
    "iris": {
        "order": 4,
        "name": "藕荷",
        "en": "Iris",
        "idea": "灰紫的底，强调色是干枯的梅子紫。温柔但不甜，气泡和选中行都落在同一支紫调上。",
        "light": {
            "base": "#FAF8FB", "sidebar": "#F2EDF5", "surface": "#FFFFFF",
            "surface2": "#FFFFFF", "surface3": "#FFFFFF", "overlay": "#E9E2EE",
            "ink": "#1A1620", "sec": "#514859", "ter": "#63596C", "cap": "#736880",
            "accent": "#654A7A", "tint": "#EAE1F1",
            "brand": "#211A28", "brandHover": "#352B3D",
            "bubble": "#F2EAF6", "bubbleHi": "#E5D8EE",
            "sel": "#EDE5F2", "selAccent": "#E2D6EC",
            "selector": "#F5EFF7", "tip": "#F8F3FA", "idle": "#D3C6DA",
            "code": "#F7F3F9", "banner": "#F2ECF5", "inline": "#F5EFF8",
            "tag": "#EFE7F3", "cite": "#EAE1EF",
            "border": "50,30,60", "scroll": "#DED4E4", "scrollHover": "#CFC2D6",
        },
        "dark": {
            "base": "#14121A", "sidebar": "#1A1721", "surface": "#211D28",
            "surface2": "#272231", "surface3": "#2E2838", "overlay": "#2C2736",
            "ink": "#EFEAF5", "sec": "#C3BACC", "ter": "#A69BB2", "cap": "#8F849B",
            "accent": "#C0A6D6", "tint": "#292035",
            "brand": "#EEE7F4", "brandHover": "#FBF6FF",
            "bubble": "#221C2A", "bubbleHi": "#2B2434",
            "sel": "#252030", "selAccent": "#2F283B",
            "selector": "#18141F", "tip": "#1D1825", "idle": "#453F4E",
            "code": "#161219", "banner": "#1D1825", "inline": "#191420",
            "tag": "#292035", "cite": "#2C2736",
            "border": "235,220,250", "scroll": "#3A3345", "scrollHover": "#493F55",
        },
    },
    "celadon": {
        "order": 5,
        "name": "青瓷",
        "en": "Celadon",
        "idea": "极淡的青瓷底，深青做强调。比苔绿冷、比雾蓝绿，是五套里最安静的一套。",
        "light": {
            "base": "#F4F8F6", "sidebar": "#EAF2EE", "surface": "#FFFFFF",
            "surface2": "#FFFFFF", "surface3": "#FFFFFF", "overlay": "#DFEAE5",
            "ink": "#101A16", "sec": "#46554E", "ter": "#586760", "cap": "#61716A",
            "accent": "#14695F", "tint": "#DDEDE8",
            "brand": "#14201C", "brandHover": "#263530",
            "bubble": "#E3F0EB", "bubbleHi": "#D3E8E1",
            "sel": "#E2EEE9", "selAccent": "#D2E7DF",
            "selector": "#ECF3F0", "tip": "#F0F7F4", "idle": "#C3D2CB",
            "code": "#F1F6F4", "banner": "#EBF2EF", "inline": "#EFF5F2",
            "tag": "#E7F0EC", "cite": "#E0ECE7",
            "border": "15,45,35", "scroll": "#D5E2DC", "scrollHover": "#C3D5CD",
        },
        "dark": {
            "base": "#0E1513", "sidebar": "#131B18", "surface": "#19231F",
            "surface2": "#1F2A25", "surface3": "#26332E", "overlay": "#22302B",
            "ink": "#E5F0EB", "sec": "#B0C4BC", "ter": "#91A79E", "cap": "#7C938A",
            "accent": "#7FD0C0", "tint": "#16231F",
            "brand": "#E3F1EC", "brandHover": "#F5FFFB",
            "bubble": "#17251F", "bubbleHi": "#1F2F29",
            "sel": "#1C2A26", "selAccent": "#243530",
            "selector": "#121A17", "tip": "#16201C", "idle": "#3B4B45",
            "code": "#101715", "banner": "#16201C", "inline": "#131B18",
            "tag": "#16231F", "cite": "#22302B",
            "border": "210,245,235", "scroll": "#2B3833", "scrollHover": "#384741",
        },
    },
}


def rgba(rgb_text, alpha):
    return "rgba(%s,%s)" % (rgb_text, alpha)


def token_map(c, mode):
    dark = mode == "dark"
    b = [".10", ".15", ".19", ".25"] if dark else [".07", ".12", ".16", ".22"]
    hover_alpha, active_alpha = (".07", ".12") if dark else (".055", ".09")
    return {
        "--dsw-alias-bg-base": c["base"],
        "--dsw-alias-bg-layer-1": c["surface"],
        "--dsw-alias-bg-layer-2": c["surface2"],
        "--dsw-alias-bg-layer-3": c["surface3"],
        "--dsw-alias-bg-overlay": c["overlay"],
        "--dsw-specific-input-major": c["surface"],
        "--dsw-specific-sidebar-fill": c["sidebar"],
        "--dsw-specific-sidebar-nav-item-active": c["sel"],
        "--dsw-specific-sidebar-nav-item-active-accent": c["selAccent"],
        "--dsw-specific-bubble": c["bubble"],
        "--dsw-specific-bubble-highlight": c["bubbleHi"],
        "--dsw-specific-selector": c["selector"],
        "--dsw-specific-tip": c["tip"],
        "--dsw-alias-border-l1": rgba(c["border"], b[0]),
        "--dsw-alias-border-l2": rgba(c["border"], b[1]),
        "--dsw-alias-border-l3": rgba(c["border"], b[2]),
        "--dsw-alias-border-l4": rgba(c["border"], b[3]),
        "--dsw-alias-label-primary": c["ink"],
        "--dsw-alias-label-secondary": c["sec"],
        "--dsw-alias-label-tertiary": c["ter"],
        "--dsw-alias-label-caption": c["cap"],
        "--dsw-alias-markdown-placeholder": c["ter"],
        "--dsw-alias-brand-primary": c["brand"],
        "--dsw-alias-brand-text": c["brand"],
        "--dsw-alias-button-primary-fill": c["brand"],
        "--dsw-alias-button-primary-hover": c["brandHover"],
        "--dsw-alias-button-contrast-fill": c["sec"],
        "--dsw-alias-state-idle-primary": c["idle"],
        "--dsw-alias-interactive-bg-hover": rgba(c["border"], hover_alpha),
        "--dsw-alias-interactive-bg-active": rgba(c["border"], active_alpha),
        "--dsw-alias-interactive-bg-hover-solid": c["sel"],
        "--dsw-alias-markdown-code-block": c["code"],
        "--dsw-alias-markdown-code-block-banner": c["banner"],
        "--dsw-alias-markdown-inline-code": c["inline"],
        "--dsw-alias-markdown-tag": c["tag"],
        "--dsw-alias-markdown-citation": c["cite"],
        "--dsw-alias-link": c["accent"],
        "--dsw-alias-state-business-primary": c["accent"],
        "--dsw-alias-state-business-tertiary": c["tint"],
        "--dsw-alias-scrollbar-bg-l1": c["scroll"],
        "--dsw-alias-scrollbar-hover-l1": c["scrollHover"],
        "--dsw-alias-menu-group-header-fill": rgba(rgb_text(c["surface2"]), ".94"),
    }


def rgb_text(hex_value):
    h = hex_value.lstrip("#")
    return ",".join(str(int(h[i:i + 2], 16)) for i in (0, 2, 4))


def hex_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def lum(h):
    def f(c):
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = [v / 255 for v in hex_rgb(h)]
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def contrast(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def ratios(c, mode):
    fg = "#0f1115" if mode == "dark" else "#ffffff"
    return {
        "ink": round(contrast(c["ink"], c["base"]), 1),
        "sec": round(contrast(c["sec"], c["base"]), 1),
        "ter": round(contrast(c["ter"], c["base"]), 1),
        "cap": round(contrast(c["cap"], c["base"]), 1),
        "accent": round(contrast(c["accent"], c["base"]), 1),
        "brand": round(contrast(fg, c["brand"]), 1),
    }


def check():
    problems = []
    for key, entry in PALETTES.items():
        for mode in ("light", "dark"):
            c = entry[mode]
            dark = mode == "dark"
            floors = [
                ("正文/画布", c["ink"], c["base"], 12 if dark else 14),
                ("正文/侧栏", c["ink"], c["sidebar"], 9 if dark else 12),
                ("正文/卡片", c["ink"], c["surface"], 6 if dark else 12),
                ("正文/气泡", c["ink"], c["bubble"], 6 if dark else 12),
                ("次要/画布", c["sec"], c["base"], 8 if dark else 6),
                ("次要/气泡", c["sec"], c["bubble"], 4.5),
                ("三级/画布", c["ter"], c["base"], 4.5),
                ("说明/画布", c["cap"], c["base"], 4.5),
                ("强调/画布", c["accent"], c["base"], 4.5),
                ("强调/浅底", c["accent"], c["tint"], 4.5),
                ("正文/代码", c["ink"], c["code"], 10 if dark else 12),
            ]
            fg = "#0f1115" if dark else "#ffffff"
            floors.append(("按钮文字/主按钮", fg, c["brand"], 4.5))
            for label, fg_color, bg_color, floor in floors:
                r = contrast(fg_color, bg_color)
                if r < floor:
                    problems.append("%s %s %s %.2f < %.1f" % (key, mode, label, r, floor))
    return problems


def render_page(data):
    def decls(t):
        return "\n".join("  %s:%s;" % (k, v) for k, v in t.items())

    css = []
    for key in sorted(data, key=lambda k: data[k]["order"]):
        p = data[key]
        css.append('[data-scheme="%s"]{\n%s\n}' % (key, decls(p["tokens"])))
        css.append('[data-scheme="%s"][data-mode="dark"]{\n%s\n}' % (key, decls(p["darkTokens"])))
        sw = ["--sw-base:%s" % p["base"], "--sw-side:%s" % p["sidebar"],
              "--sw-bubble:%s" % p["bubble"], "--sw-accent:%s" % p["accent"]]
        css.append('[data-pick="%s"]{%s}' % (key, ";".join(sw)))
        dsw = ["--sw-base:%s" % p["dark"]["base"], "--sw-side:%s" % p["dark"]["sidebar"],
               "--sw-bubble:%s" % p["dark"]["bubble"], "--sw-accent:%s" % p["dark"]["accent"]]
        css.append('[data-mode="dark"] [data-pick="%s"]{%s}' % (key, ";".join(dsw)))

    template = open(os.path.join(ROOT, "template.html"), encoding="utf-8").read()
    page = template.replace("/*__PALETTE_CSS__*/", "\n".join(css))
    page = page.replace("__PALETTES_JSON__", json.dumps(data, ensure_ascii=False))

    out_dir = os.path.join(ROOT, "design-demos")
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "palettes-preview.html")
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(page)
    print("写入", out_file, len(page), "bytes")


if __name__ == "__main__":
    bad = check()
    if bad:
        print("对比度不达标：")
        for b in bad:
            print("  ", b)
        sys.exit(1)
    print("对比度全部达标（浅色 + 深色）")
    out = {}
    for key, entry in PALETTES.items():
        light, dark = entry["light"], entry["dark"]
        out[key] = {
            "order": entry["order"], "name": entry["name"], "en": entry["en"], "idea": entry["idea"],
            "base": light["base"], "sidebar": light["sidebar"], "surface": light["surface"],
            "bubble": light["bubble"], "accent": light["accent"], "ink": light["ink"], "code": light["code"],
            "dark": {
                "base": dark["base"], "sidebar": dark["sidebar"], "surface": dark["surface"],
                "bubble": dark["bubble"], "accent": dark["accent"], "ink": dark["ink"], "code": dark["code"],
            },
            "tokens": token_map(light, "light"),
            "darkTokens": token_map(dark, "dark"),
            "ratios": ratios(light, "light"),
            "darkRatios": ratios(dark, "dark"),
        }
    with open(os.path.join(ROOT, "palettes.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("写入 palettes.json")
    render_page(out)
