import { factsOf, observedSpike } from 'fact-kit'
import { manual } from './probe.ts'

const mf = factsOf({
  tool: 'cloudflare-flagship',
  topics: ['opentofu'],
  source: observedSpike({ fetched: '2026-11-26' }),
})

export const iacFacts = [
  mf.value(
    'tofu-resources',
    [
      { resource: 'cloudflare_flagship_app', fields: ['account_id', 'name'] },
      {
        resource: 'cloudflare_flagship_flag',
        fields: ['account_id', 'app_id', 'key', 'enabled', 'default_variation', 'variations', 'rules'],
      },
    ],
    {
      title: 'OpenTofu 的 Flagship 資源與欄位',
      verify: manual(
        '用 cloudflare provider 5.29.0 寫這兩個資源，跑 `tofu plan` 與 `tofu apply`。成立的條件是兩個資源都能建立，欄位名稱不報錯',
      ),
      note: 'OpenTofu 1.13.9 加 cloudflare provider 5.29.0 可 plan、apply、import，實跑 1 次。OpenTofu 1.10.0 沒測',
    },
  ),
  mf.value(
    'tofu-import-id',
    [
      { resource: 'cloudflare_flagship_app', id: '<account_id>/<app_id>' },
      { resource: 'cloudflare_flagship_flag', id: '<account_id>/<app_id>/<key>' },
    ],
    {
      title: 'OpenTofu 資源的 import id',
      verify: manual(
        '對已存在的 app 與 flag 各跑一次 `tofu import`，id 照這個格式。成立的條件是 import 成功，接著 `tofu plan` 沒有差異',
      ),
      note: 'OpenTofu 1.13.9、cloudflare provider 5.29.0',
    },
  ),
  mf.statement(
    'tofu-ignore-changes',
    '`cloudflare_flagship_flag` 沒加 `ignore_changes` 時，在介面改過 `enabled` 或放量後再 `tofu apply`，會被改回宣告的值。加 `lifecycle { ignore_changes = [enabled, rules] }` 後，這兩個欄位的差異不出現在 plan，介面上改的值保留',
    {
      title: 'ignore_changes 對介面改值的效果',
      verify: manual(
        '對已 import 的 flag 在介面或用 `wrangler flagship flags set` 改 `enabled` 與放量，跑 `tofu plan`。不加 `ignore_changes` 時 plan 要把值改回，加 `ignore_changes = [enabled, rules]` 後 plan 不出現這兩個欄位',
      ),
      note: 'OpenTofu 1.13.9、cloudflare provider 5.29.0，實跑 1 次',
    },
  ),
]
