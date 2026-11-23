# 配色设计源文件（非插件）

`dsh-palettes` 插件的数据来源和设计记录。这个目录不会被 DSH 加载，只用于生成和查看配色。

## 内容

| 文件 | 说明 |
|---|---|
| `palettes.json` | 五套方案 × 浅/深两版：基础色、42 个别名 token 映射、对比度记录。由 `build_preview.py` 生成，同时是插件构建的输入 |
| `build_preview.py` | 配色定义的**唯一手改入口**。改 `PALETTES` → 跑对比度检查 → 写 `palettes.json` 和预览页 |
| `template.html` | 预览页模板（内联 CSS/JS，离线可用，无外部资源） |
| `design-demos/palettes-preview.html` | 成品预览页，可直接用浏览器打开；带浅/深切换、色卡切换、组件示例 |
| `design-demos/*.png` | 预览截图：`overview-light/dark.png`、`preview-light/dark.png`（静态留存，不会随构建自动更新） |
| `direction-approved.md` | 方案确认时的原话与要点 |
| `polish-log.md` | 5 轮打磨记录（含深色适配） |

## 工作流

```powershell
# 1. 改配色：编辑 ..\design\build_preview.py 里的 PALETTES（每套有 light 和 dark 两组）
cd design
python build_preview.py
# 内置 WCAG 检查不通过会以退出码 1 结束，并打印不达标的项

# 2. 同步到插件
cd ..\packages\palettes
python build_client.py

# 3. 重启 DSH（或在页面刷新后重新加载插件）生效
```

`build_preview.py` 会先校验浅色、深色各自的对比度下限，全部达标才写文件；`palettes.json` 里的 `ratios` / `darkRatios` 就是这次校验的记录。

## 数据字段

`palettes.json` 每套方案包含：`order`、`name`、`en`、`idea`，浅色字段（`base`、`sidebar`、`surface`、`bubble`、`accent`、`ink`、`code` 等），`dark` 子对象（同名字段），以及 `tokens` / `darkTokens`（42 个别名 token 的最终取值）和 `ratios` / `darkRatios`。

只改颜色时不要手改 `palettes.json`——它会被 `build_preview.py` 覆盖。
