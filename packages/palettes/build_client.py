# -*- coding: utf-8 -*-
"""Generate the Client half from the palette source of truth used by the preview."""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
SOURCE = os.path.join(HERE, "..", "..", "design", "palettes.json")

def main():
    with open(SOURCE, encoding="utf-8") as f:
        data = json.load(f)
    slim = {
        key: {
            "name": value["name"],
            "en": value["en"],
            "light": {
                "base": value["base"], "sidebar": value["sidebar"],
                "bubble": value["bubble"], "accent": value["accent"],
            },
            "dark": {
                "base": value["dark"]["base"], "sidebar": value["dark"]["sidebar"],
                "bubble": value["dark"]["bubble"], "accent": value["dark"]["accent"],
            },
            "tokens": value["tokens"],
            "darkTokens": value["darkTokens"],
        }
        for key, value in data.items()
    }
    template = open(os.path.join(HERE, "client.template.js"), encoding="utf-8").read()
    if "__PALETTES__" not in template:
        raise SystemExit("client.template.js is missing the __PALETTES__ marker")
    client = template.replace("__PALETTES__", json.dumps(slim, ensure_ascii=False, indent=2))
    with open(os.path.join(HERE, "client.js"), "w", encoding="utf-8") as f:
        f.write(client)
    tokens = sum(len(item["tokens"]) for item in slim.values())
    print("client.js written: %d palettes, %d token values" % (len(slim), tokens))

if __name__ == "__main__":
    main()
