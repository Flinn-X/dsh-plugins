# dsh-palettes

English | 中文

五套配色，每套都有浅色与深色两版，装在 DSH Web 客户端里，从 **设置 → 通用 → 配色方案** 切换。

| id | 中文 | English | 主色调 |
|---|---|---|---|
| `paper` | 纸白 | Paper | 暖白纸感 |
| `mist` | 雾蓝 | Mist | 冷灰蓝 |
| `moss` | 苔绿 | Moss | 低饱和橄榄绿 |
| `iris` | 藕荷 | Iris | 紫灰 |
| `celadon` | 青瓷 | Celadon | 青绿 |
| `default` | 默认 | Default | DSH 原生外观 |

每套方案提供 42 个别名 token（`--dsw-alias-*` / `--dsw-specific-*`），每个 token 都带 `{ light, dark }` 一对取值。插件只注册**一层** `theme.overrideTokens('dsh-palettes', …)`；切换浅色/深色时由主题服务在层内取值，不重新注册、不额外叠加。跟随 DSH 内置「外观」自动切换，不锁定外观。

## 安装

**DSH Desktop**：设置 → 插件 → 搜索 `dsh-palettes` → 安装 → 刷新页面。

**CLI**（profile 名按你的宿主要求替换，桌面版通常是 `desktop`）：

```sh
dsh plugin --profile desktop add dsh-palettes
```

安装后刷新一次页面，设置 → 通用里会出现「配色方案」一行，紧接在内置「外观」之后。

## 使用

- 点色卡立即生效；点「默认」移除覆盖层，回到 DSH 原生配色。
- 首次启用（浏览器里没有存储值）默认套用「纸白」。
- 偏好只存在本机浏览器：`localStorage` 的 `dsh-palettes/scheme`。旧版私有包 `@local/dsh-light-palettes` 的选择会被读取一次并迁移过来。
- 降级：若主题服务拒绝该层，插件改写成一张作用域样式表，同时覆盖 `html body:not([data-ds-dark-theme])` 与 `html body[data-ds-dark-theme]` 两种外观。

## 已知限制

- 只影响 Web 客户端界面；DSH 窗口装饰等不在主题 token 覆盖范围内的区域保持原样。
- 与其它覆盖同名 token 的主题插件同时使用时，按层注册顺序叠加；可在设置里选「默认」排除本插件影响。
- 色卡高亮依赖 `body[data-ds-dark-theme]` 的属性变更；宿主若改名需要同步调整。

## 兼容性

`engines.dsh`: `>=0.2.2-rc.1 <0.3.0-0`。只使用稳定的客户端扩展点：`slots`（`settings.general.item`）、`locale`、`theme`。

## 开发

配色定义的唯一手改入口在仓库的 `design/build_preview.py`；它写出的 `design/palettes.json` 是本插件的构建输入。

```sh
python packages/palettes/build_client.py   # 生成 client.js
node packages/palettes/test_client.cjs     # 自测（模拟 theme/slots/locale）
npm run check                              # 校验清单、资源与文件一致性
```

`client.js` 是构建产物，不要手改；改 `client.template.js` 后重新构建。

## 版本说明

1.2.0 由私有包 `@local/dsh-light-palettes` 1.1.0 改名而来：包名、客户端模块 id、locale 命名空间、设置行 id 与存储键都改为 `dsh-palettes` 体系；配色数据与行为不变。

## License

MIT

---

## English

Five palettes for the DSH web client — Paper, Mist, Moss, Iris, and Celadon — each with a light and a dark version, switchable in **Settings → General → Palette**. It layers 42 alias tokens per palette through `theme.overrideTokens`, follows the built-in appearance setting, and falls back to a scoped stylesheet when the theme service refuses the layer. Install with `dsh plugin --profile <profile> add dsh-palettes` and reload the page.
