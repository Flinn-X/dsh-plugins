# Fork the awesome-dsh-plugin catalog, copy the two prepared entries, and open one PR.
# Requires gh auth (gh auth login) and a repository created at least 1 day ago.
# Nothing is pushed when -DryRun is passed: the fork is cloned and staged for review.
[CmdletBinding()]
param(
  [string]$CatalogRepo = 'awesome-dsh-plugin/awesome-dsh-plugin',
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$login = (gh api user --jq '.login').Trim()
$fork = "$login/awesome-dsh-plugin"
$branch = 'add-flinn-x-dsh-plugins'
$work = Join-Path ([System.IO.Path]::GetTempPath()) 'awesome-dsh-plugin'

Write-Host "Forking $CatalogRepo as $fork ..."
try { gh repo fork $CatalogRepo --clone=false --remote=false 2>&1 | Out-Null } catch { Write-Host '  (fork likely already exists, continuing)' }

if (Test-Path -LiteralPath $work) {
  $resolved = (Resolve-Path -LiteralPath $work).Path
  if ($resolved -eq $work) { Remove-Item -LiteralPath $resolved -Recurse -Force }
}
gh repo clone $fork $work -- --depth 1
git -C $work checkout -b $branch
Copy-Item (Join-Path $here 'Flinn-X__dsh-plugins--packages-palettes.yml') (Join-Path $work 'data/plugins') -Force
Copy-Item (Join-Path $here 'Flinn-X__dsh-plugins--packages-fold-user-messages.yml') (Join-Path $work 'data/plugins') -Force
git -C $work add data/plugins
git -C $work commit -m 'Add Flinn-X/dsh-plugins: palettes, fold-user-messages'

if ($DryRun) {
  Write-Host "Dry run: review $work and push $branch manually."
  exit 0
}

git -C $work push -u origin $branch
$body = @'
Adds two entries from one monorepo:

- `packages/palettes` — `dsh-palettes`: five palettes, each with a light and a dark version, switchable in Settings → General (category: theme).
- `packages/fold-user-messages` — `dsh-fold-user-messages`: folds user messages taller than 300px in Chat with a Show more / Show less toggle (category: ui).

Both subpackages declare `dsh.bundle.patch` and ship a `cordis.patch.yml`; the client modules are prebuilt and committed, the code is MIT, and the npm packages point their `repository` field back at this repo.
'@
gh pr create --repo $CatalogRepo --head "$($fork.Split('/')[0]):$branch" --title 'Add Flinn-X/dsh-plugins: palettes, fold-user-messages' --body $body
