# 上架 DSH 社区目录（awesome-dsh-plugin）

DSH 的「发现」页和 `dshmarket` 都读同一份社区精选目录：GitHub 仓库 [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)，站点为 <https://awesome-dsh-plugin.com>。上架 = 往那个仓库提一个 YAML 条目的 PR。

本目录里已经写好两份条目，直接复制到目录仓库即可：

| 本仓库文件 | 目标位置（目录仓库） | 分类 |
|---|---|---|
| `Flinn-X__dsh-plugins--packages-palettes.yml` | `data/plugins/Flinn-X__dsh-plugins--packages-palettes.yml` | `theme` |
| `Flinn-X__dsh-plugins--packages-fold-user-messages.yml` | `data/plugins/Flinn-X__dsh-plugins--packages-fold-user-messages.yml` | `ui` |

## 提交步骤

1. Fork `awesome-dsh-plugin/awesome-dsh-plugin`。
2. 把两个文件放进 `data/plugins/`，文件名保持不变（monorepo 子包用 `owner__repo--packages-<name>.yml`，与条目里的 `url` 目录一一对应）。
3. 提 PR，标题例如 `Add Flinn-X/dsh-plugins: palettes, fold-user-messages`。一个 PR 最多 3 条，两份正好可以一起提。
4. CI 会检查：条目数量、目标仓库的 `package.json` 是否声明 `dsh.bundle`（本仓库两个子包都声明了）、仓库创建是否满 1 天、README 能否由数据重新生成。合并后站点与市场通常一天内出现。

也可以用脚本做完 1–3（需要 `gh auth login`）：

```powershell
# 先干跑，检查 clone 下来的目录内容
pwsh -File market/submit.ps1 -DryRun
# 确认无误后真正提 PR
pwsh -File market/submit.ps1
```

## 硬性门槛（已满足 / 需注意）

- [x] 子包 `package.json` 声明 `dsh.bundle.patch`，并带 `cordis.patch.yml`。
- [x] 真实可用的代码（不是占位仓库、不是纯 README）。
- [x] MIT LICENSE。
- [x] README 含安装说明。
- [ ] 仓库创建满 1 天（新建仓库当天不能提，等一天再提即可）。
- [ ] 给仓库加 `dsh-plugin` topic（`gh repo edit Flinn-X/dsh-plugins --add-topic dsh-plugin`）。
- [ ] （可选）`icon:` 需要一张 GitHub 托管的 **位图**（png/jpg/webp，方形，约 96px 显示），SVG 会被拒；不写就用作者头像。
- [ ] （可选）截图：在子包目录放 `screenshots.json`，列 1–8 张仓库内图片的相对路径。

## 与 npm 的关系

目录条目**不依赖** npm 发布：只要仓库里有可安装的 bundle，就能从 GitHub 安装。发布到 npm 只是让安装免构建、并在市场里显示下载量。两个包都没有安装脚本，`npm i` 不会触发构建授权。

## 不要做的事

- 不要往 `dsh-market/dsh-market` 提插件条目——那是市场客户端本身的仓库，不是目录。
- 不要手改目录仓库生成的 README，只改 `data/plugins/*.yml`。
