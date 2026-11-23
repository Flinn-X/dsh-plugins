# dsh-fold-user-messages

English | 中文

对话里过长的用户消息自动折叠，点击展开、再次收起。短消息不会出现按钮。

- 只作用于用户消息行：`conversation.chat.node` 的 `user` 与 `steering` 两种 key。
- 渲染后按实际高度判断：内容高度超过 **300px** 才折叠；短消息不出现按钮。
- 折叠态高度 **220px**，底部 56px 渐隐遮罩；可用 CSS 变量 `--dsh-umf-collapsed-height` 覆盖高度。
- 按钮文案「展开全文 / 收起」，随 DSH 语言切换；带 `aria-expanded` / `aria-controls`，支持键盘焦点。
- 不替换官方消息行：只包裹官方渲染器给 `conversation.chat.user.content` 的输出，因此复制/时间等行内操作仍在；官方渲染器不可用时退回内置简易行，折叠照常工作。
- 展开状态是组件本地状态，不持久化；刷新页面后恢复折叠。

## 安装

**DSH Desktop**：设置 → 插件 → 搜索 `dsh-fold-user-messages` → 安装 → 刷新页面。

**CLI**：

```sh
dsh plugin --profile desktop add dsh-fold-user-messages
```

装完自动生效，没有设置项。

## 可调参数

在 `client.js` 顶部：

- `FOLD_THRESHOLD`（默认 `300`，单位 px）：超过该高度才折叠。
- CSS 变量 `--dsh-umf-collapsed-height`（默认 `220px`）：折叠态高度。
- 渐隐高度写在样式里（`56px`），需要时改 `.dsh-umf-clip[data-collapsed]` 的 mask。

## 兼容性

`engines.dsh`: `>=0.2.2-rc.1 <0.3.0-0`。只使用客户端扩展点 `slots`（`conversation.chat.node`）与 `locale`，无 Host 逻辑、无网络请求、不读写文件。

## 已知限制

- 插件把该行的 `renderSlotChain` 注入为空函数，因此官方行的消息来源链（`conversation.chat.user.before`）不会渲染。
- 若官方用户行渲染器无法解析（例如别的插件用不同优先级占用了同一个 key），会退回插件自带的简易行：有折叠，但没有气泡底色与复制按钮。

## 开发

`client.js` 是手写源码，无需构建。改完刷新页面即可（或重启 DSH）。`npm run check` 会校验清单与资源一致性。

## 版本说明

1.2.0 由私有包 `@local/long-user-message` 1.1.0 改名而来：包名、客户端模块 id、locale 命名空间与 patch id 都改为 `dsh-fold-user-messages` 体系；行为不变。

## License

MIT

---

## English

Folds user messages taller than 300px into a 220px preview with a **Show more / Show less** toggle, in both the user and steering Chat rows. It wraps the shipped row's content output instead of replacing the row, so inline actions keep working, and falls back to a built-in simple row when the shipped renderer cannot be resolved.
