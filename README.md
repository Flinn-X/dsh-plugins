# dsh-plugins

两个 DeepSeek Harness（DSH）Web 客户端插件，纯前端、无 Host 逻辑、无网络请求。各自独立发布到 npm，也可以从这个仓库直接读源码。

| 包 | 作用 | 入口 |
|---|---|---|
| [`dsh-palettes`](packages/palettes) | 五套配色（纸白 / 雾蓝 / 苔绿 / 藕荷 / 青瓷），每套浅色 + 深色两版，跟随外观切换 | 设置 → 通用 → 配色方案 |
| [`dsh-fold-user-messages`](packages/fold-user-messages) | 对话里过长的用户消息自动折叠，点击展开 / 再次收起 | 自动生效，无设置项 |

## 安装

**DSH Desktop**：设置 → 插件 → 搜索包名 → 安装 → 刷新页面。

**CLI**（profile 名按宿主要求替换，桌面版通常是 `desktop`）：

```sh
dsh plugin --profile desktop add dsh-palettes
dsh plugin --profile desktop add dsh-fold-user-messages
```

只装一个也可以；两个插件互不依赖。

## 目录结构

```
dsh-plugins/
├─ packages/
│  ├─ palettes/                dsh-palettes：设置行 + 42 token × 2 模式
│  └─ fold-user-messages/      dsh-fold-user-messages：Chat 行折叠
├─ design/                     dsh-palettes 的配色源文件与预览页（不是插件）
├─ market/                     awesome-dsh-plugin 收录条目（上架 PR 用）
└─ scripts/check-packages.mjs  清单/资源一致性校验
```

两个包都声明了 `dsh.bundle.patch`（bundle 插入条目）和 `dsh.client`（浏览器端模块），因此既能被 `dsh plugin add` 安装，也能被 Plugins 面板识别。

## 开发

```sh
npm run build    # 由 design/palettes.json 生成 packages/palettes/client.js
npm test         # 配色插件的客户端自测（模拟 theme/slots/locale）
npm run check    # 校验两个包的清单、导出、图标、locale 与客户端模块 id
npm run verify   # 以上三步
```

`packages/palettes/client.js` 是构建产物，不要手改；改 `client.template.js` 后重新构建。`packages/fold-user-messages/client.js` 是手写源码。

## 发布

```sh
npm login
npm publish --workspace dsh-palettes
npm publish --workspace dsh-fold-user-messages
```

两个包都没有 `dependencies` / 安装脚本，发布出来的包可离线安装、无需 `allowBuilds` 授权。

## 上架 DSH 社区目录

DSH 的「发现」页与 `dshmarket` 读取社区精选目录 [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)。上架方式是往那个仓库提一个 YAML 条目 PR（一个插件一个文件，monorepo 子包指向子目录）。本仓库已在 [`market/`](market) 备好两份条目，规则与步骤见 [market/README.md](market/README.md)。

收录与 npm 发布相互独立：npm 只让安装免构建，收录只看仓库与代码。

## 兼容性

`engines.dsh` 均为 `>=0.2.2-rc.1 <0.3.0-0`。插件只使用稳定的客户端扩展点：`slots`、`locale`、`theme`。

## License

MIT © 2026 Flinn

---

## English

Two DeepSeek Harness (DSH) web client plugins, each published to npm as its own package:

- **`dsh-palettes`** — five palettes (Paper, Mist, Moss, Iris, Celadon), each with a light and a dark version, switchable in Settings → General.
- **`dsh-fold-user-messages`** — folds user messages taller than 300px with a Show more / Show less toggle.

Both are client-only bundles declaring `dsh.bundle.patch` and `dsh.client`, so `dsh plugin add <name>` and the Plugins panel can install them. No dependencies, no install scripts, no network access.
