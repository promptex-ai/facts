import { factsOf, observedSpike } from 'fact-kit'
import { manual } from './probe.ts'

const mf = factsOf({
  tool: 'cloudflare-flagship',
  topics: ['worker-binding'],
  source: observedSpike({ fetched: '2026-11-26' }),
})

export const bindingFacts = [
  mf.statement(
    'binding-config',
    '在 wrangler.toml 為環境設 Flagship 的 Worker binding 時寫成 `[[env.<env>.flagship]]`，欄位是 `binding` 與 `app_id`。各環境的 Worker 讀到各自 `app_id` 指向的 app。binding 在 TypeScript 的型別是 `Flagship`',
    {
      title: 'Worker binding 的 wrangler.toml 寫法',
      verify: manual(
        '用有兩個環境的 wrangler.toml，各環境寫 `[[env.<env>.flagship]]` 並綁不同 app，`wrangler deploy --env <env>` 後從 Worker 求值同一個 flag key，確認各環境讀到各自 app 的值。型別 `Flagship` 用 `wrangler types` 在本機看',
      ),
      note: 'wrangler 4.167.0。型別部分是本機實跑，環境部分是真實部署',
    },
  ),
  mf.statement(
    'nodejs-compat-required',
    'Worker 用 `@openfeature/server-sdk` 時，每個環境都要設 `compatibility_flags = ["nodejs_compat"]`，沒設時打包失敗',
    {
      title: '用 OpenFeature server SDK 的 Worker 需要 nodejs_compat',
      verify: manual(
        '建一個 import `@openfeature/server-sdk` 的 Worker，wrangler.toml 不設 `nodejs_compat`，跑 `wrangler deploy --dry-run`。成立的條件是打包失敗，加上 `compatibility_flags = ["nodejs_compat"]` 後通過',
      ),
      note: 'wrangler 4.167.0、`@openfeature/server-sdk` 1.23.0',
    },
  ),
  mf.statement(
    'app-id-must-exist-at-deploy',
    '`app_id` 是 app 建立後才有的 id。部署時 binding 指向的 app 必須已存在，綁不存在的 app 時部署被拒，錯誤碼 10364',
    {
      title: 'app_id 與部署時 app 必須已存在',
      verify: manual(
        '在 wrangler.toml 的 `[[env.<env>.flagship]]` 寫一個不存在的 `app_id`，跑 `wrangler deploy --env <env>`。成立的條件是部署被拒，錯誤碼 10364',
      ),
      note: 'wrangler 4.167.0',
    },
  ),
  mf.statement(
    'delete-order',
    '要刪被 Worker 引用的 app，必須先刪 Worker 或拿掉 binding，再刪 app，反過來 API 回 409。app 裡還有 flag 時可以直接刪 app',
    {
      title: '刪除 app 的順序',
      topics: ['lifecycle'],
      verify: manual(
        '建 app 與一個綁它的 Worker，先刪 app 看 API 是否回 409，再刪 Worker 後刪 app。另建一個有 flag、沒被引用的 app，直接刪',
      ),
      note: 'wrangler 4.167.0、cloudflare provider 5.29.0',
    },
  ),
]
