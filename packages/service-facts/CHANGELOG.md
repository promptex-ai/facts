# Changelog

## [0.5.0](https://github.com/promptex-ai/facts/compare/service-facts/v0.4.0...service-facts/v0.5.0) (2026-11-13)


### Added

* **github-actions:** 補 pnpm/action-setup v6.1.0 的 commit 與 bootstrap 版本 ([#87](https://github.com/promptex-ai/facts/issues/87)) ([7b27385](https://github.com/promptex-ai/facts/commit/7b2738572a5bb3b99cb63dfd8092dd90c0a638d4))
* **github:** App 讀 PR 檢查狀態需要 Checks 與 Commit statuses 唯讀 ([#84](https://github.com/promptex-ai/facts/issues/84)) ([db9bbfc](https://github.com/promptex-ai/facts/commit/db9bbfc95c77b7ebf3bee18aa3375099f25b668f))
* **github:** 補 Actions job 與 run 狀態值與排隊量測的 fact ([#86](https://github.com/promptex-ai/facts/issues/86)) ([6be4088](https://github.com/promptex-ai/facts/commit/6be408895568ef4cca82c6945c77e8c22c6642b8))
* **service-facts:** 補 gh pr checks 的結束碼與沒有檢查時輸出的 github fact ([#83](https://github.com/promptex-ai/facts/issues/83)) ([d74e6ad](https://github.com/promptex-ai/facts/commit/d74e6ada5713e85d4eb9b8367bedce867c8262ba))
* **service-facts:** 補 GitHub App installation token 的 github fact，devtool-facts 新增 octokit-auth-app component ([#80](https://github.com/promptex-ai/facts/issues/80)) ([59537a7](https://github.com/promptex-ai/facts/commit/59537a71d6b75e081f3bc67d81f44cab6031f635))


### Fixed

* **facts:** GitHub App 讀檢查狀態的錯誤訊息改為逐字原文並補實測前提與文件出處 ([#85](https://github.com/promptex-ai/facts/issues/85)) ([bf89bce](https://github.com/promptex-ai/facts/commit/bf89bceaa0edb4ea2e1ab5cb1c3f5cdc442c4032))
* 倉庫位置改到 promptex-ai，著作權人改成 Promptex-AI ([#88](https://github.com/promptex-ai/facts/issues/88)) ([bab0960](https://github.com/promptex-ai/facts/commit/bab096026ff0fa95cb276c659dcb233e5be510d8))

## [0.4.0](https://github.com/carlos-space/facts/compare/service-facts/v0.3.0...service-facts/v0.4.0) (2026-10-30)


### Added

* **service-facts:** 補 GitHub Packages npm registry 的安裝設定、PAT 認證與 scope 的 github fact ([#77](https://github.com/carlos-space/facts/issues/77)) ([09f5c8c](https://github.com/carlos-space/facts/commit/09f5c8c7d4633b9835990413042f46019ed616cf))

## [0.3.0](https://github.com/carlos-space/facts/compare/service-facts/v0.2.0...service-facts/v0.3.0) (2026-10-29)


### Added

* **service-facts:** 補 public 倉庫託管 runner、runner group 與 artifact 保留天數的 github-actions fact ([#74](https://github.com/carlos-space/facts/issues/74)) ([93dcf3b](https://github.com/carlos-space/facts/commit/93dcf3bbc520ffd4f17be2beb924b57a7d43de3c))

## [0.2.0](https://github.com/carlos-space/facts/compare/service-facts/v0.1.0...service-facts/v0.2.0) (2026-10-28)


### Added

* **service-facts:** 補 GitHub Packages npm 的套件名、可見度、發布權限與跨倉庫授權 ([#60](https://github.com/carlos-space/facts/issues/60)) ([9b27f0c](https://github.com/carlos-space/facts/commit/9b27f0c5bdb2579cde9c6fdb91b8933a3d57854b))

## 0.1.0 (2026-10-28)


### Added

* **facts:** 將 platform-facts 拆成 21 個 component 套件與 5 個匯總套件 ([#52](https://github.com/carlos-space/facts/issues/52)) ([ff59e0a](https://github.com/carlos-space/facts/commit/ff59e0a2f5847a33548eca26e910849df4515517))
