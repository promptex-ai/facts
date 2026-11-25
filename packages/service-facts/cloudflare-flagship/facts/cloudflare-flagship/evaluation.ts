import { factsOf, observedSpike } from 'fact-kit'
import type { FactSource } from 'fact-kit'
import { manual } from './probe.ts'

const mf = factsOf({
  tool: 'cloudflare-flagship',
  topics: ['evaluation'],
  source: observedSpike({ fetched: '2026-11-26' }),
})

// Read from the source of the package, not from a documentation page, so there is no url.
const docSource: FactSource = { kind: 'observed', basis: 'doc', fetched: '2026-11-26' }

export const evaluationFacts = [
  mf.statement(
    'propagation-delay',
    '改 flag 的值之後，最長約 1 分鐘生效。Worker binding 量 10 次，中位數 50 秒（21 到 50 秒）。HTTP 量 6 次，0.03 到 50 秒',
    {
      title: '改值後的傳播延遲',
      topics: ['propagation'],
      verify: manual(
        '改一個 flag 的 `enabled`，每秒從 Worker binding 與 HTTP 求值，記下新值第一次出現的秒數，各重複數次。成立的條件是最長約 1 分鐘內都生效',
      ),
      note: '單一地點量測，其他地區沒測',
    },
  ),
  mf.statement(
    'disabled-flag-value',
    'flag 停用時，Worker binding、HTTP 與 `wrangler flagship flags evaluate` 回該 flag 的預設變體（default variation）。OpenFeature provider（Worker 內與 local evaluation）回呼叫時給的預設值',
    {
      title: '停用 flag 的回傳值',
      verify: manual(
        '把 flag 設為停用，且預設變體與呼叫時給的預設值不同，分別用 Worker binding、HTTP、`wrangler flagship flags evaluate` 與 OpenFeature provider 求值，比對各路徑回的值',
      ),
      note: 'wrangler 4.167.0、`@cloudflare/flagship` 0.7.0、`@openfeature/server-sdk` 1.23.0',
    },
  ),
  mf.statement(
    'missing-flag-value',
    'flag 不存在時，Worker binding 與 OpenFeature provider 都回呼叫時給的預設值，reason 是 `ERROR`，errorCode 是 `FLAG_NOT_FOUND`',
    {
      title: '不存在 flag 的回傳值',
      verify: manual(
        '對同一個 app 求值一個沒建立的 flag key，用 Worker binding 與 OpenFeature provider 各一次。成立的條件是回呼叫時給的預設值，reason 為 `ERROR`，errorCode 為 `FLAG_NOT_FOUND`',
      ),
      note: '`@cloudflare/flagship` 0.7.0、`@openfeature/server-sdk` 1.23.0',
    },
  ),
  mf.value('reason-values', ['DEFAULT', 'STATIC', 'SPLIT', 'DISABLED', 'ERROR'], {
    title: '求值回傳過的 reason 值',
    verify: manual(
      '對不同狀態的 flag（無規則、固定值、放量、停用、不存在）求值，收集 reason。成立的條件是出現的值都在這張表內',
    ),
    note: '看到過的值，不保證是完整列表',
  }),
  mf.statement(
    'http-evaluate-endpoint',
    '非 Worker 的環境用 HTTP 求值：`GET` 或 `POST https://api.cloudflare.com/client/v4/accounts/<account_id>/flagship/apps/<app_id>/evaluate`，用 Bearer token 認證。這個端點取自套件原始碼，官方文件沒寫',
    {
      title: '非 Worker 的 HTTP 求值端點',
      source: docSource,
      verify: manual(
        '讀 `@cloudflare/flagship` 0.7.0 套件原始碼裡的 evaluate 請求路徑與方法，再用 API token 對這個端點發一次請求。HTTP 與 local evaluation 求值在實跑中都通',
      ),
      note: '依據是套件原始碼，不是文件頁',
    },
  ),
]
