import { factsOf, observedSpike } from 'fact-kit'
import { manual } from './probe.ts'

const mf = factsOf({
  tool: 'cloudflare-flagship',
  topics: ['operations'],
  source: observedSpike({ fetched: '2026-11-26' }),
})

export const operationsFacts = [
  mf.statement(
    'changelog-updated-by-unknown',
    'changelog 每次變更都記錄欄位與前後值。用 API token 做的變更，`updated_by` 一律是 `unknown`',
    {
      title: 'changelog 的 updated_by',
      topics: ['changelog'],
      verify: manual(
        '用 API token 改一個 flag，跑 `wrangler flagship flags changelog <key> --json` 看最新一筆。成立的條件是欄位與前後值都有，`updated_by` 為 `unknown`。後台介面修改是否寫出使用者沒測',
      ),
      note: 'wrangler 4.167.0',
    },
  ),
  mf.statement(
    'apps-delete-silent-failure',
    '`wrangler flagship apps delete` 失敗時不印原因，要直接呼叫 API 才看得到錯誤',
    {
      title: 'apps delete 失敗不印原因',
      topics: ['cli'],
      verify: manual(
        '對被 Worker 引用的 app 跑 `wrangler flagship apps delete`。成立的條件是指令失敗且沒有印出原因，直接用 API 刪同一個 app 才看到 409 的內容',
      ),
      note: 'wrangler 4.167.0',
    },
  ),
  mf.statement(
    'local-testing',
    '本機用 `wrangler dev --local` 加 `wrangler flagship flags create` 或 `set` 帶 `--local` 準備本機 flag。`wrangler dev` 執行中不能改本機 flag。單元測試用 OpenFeature 的 `InMemoryProvider`',
    {
      title: '本機測試的做法與限制',
      topics: ['local'],
      verify: manual(
        '啟動 `wrangler dev --local`，另開終端跑 `wrangler flagship flags set <key> --local`。成立的條件是 dev 執行中改不了本機 flag，停掉 dev 後可以改',
      ),
      note: 'wrangler 4.167.0、`@openfeature/server-sdk` 1.23.0',
    },
  ),
]
