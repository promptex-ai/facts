import { factsOf, observedSpike } from 'fact-kit'

const mf = factsOf({
  tool: 'wrangler',
  topics: ['flagship'],
  source: observedSpike({ fetched: '2026-11-26' }),
})

const verified = (reason: string) => ({
  probe: { kind: 'manual' as const, reason },
  verifiedOn: '2026-11-26',
  screenedThrough: '2026-11-26',
})

export const flagshipFacts = [
  mf.value('flagship-flags-commands', ['create', 'set', 'enable', 'disable', 'rollout', 'changelog', 'evaluate'], {
    title: 'wrangler flagship flags 的子指令',
    topics: ['flagship', 'cli'],
    verify: verified(
      '跑 `wrangler flagship flags --help`，確認這些子指令都在。`create`、`set`、`rollout`、`changelog`、`evaluate` 另在實跑中各用過一次',
    ),
    note: 'wrangler 4.167.0。表內是實跑用過的子指令，不保證是完整列表',
  }),
  mf.value('flagship-rollout-options', ['--to', '--percentage', '--force'], {
    title: 'wrangler flagship flags rollout 的旗標',
    topics: ['flagship', 'cli'],
    verify: verified('跑 `wrangler flagship flags rollout --help`，確認這三個旗標都在'),
    note: 'wrangler 4.167.0',
  }),
  mf.value('flagship-common-options', ['--json', '--remote', '--local'], {
    title: 'wrangler flagship 改值指令可帶的旗標',
    topics: ['flagship', 'cli'],
    verify: verified(
      '對 `wrangler flagship flags set`、`changelog` 等指令各帶一次 `--json`、`--remote`、`--local`，確認不報未知旗標',
    ),
    note: 'wrangler 4.167.0。`flags create` 與 `flags set` 帶 `--local` 已實跑',
  }),
  mf.statement(
    'delete-kv-permission-exit-code',
    '`wrangler delete` 會先列出 KV namespace。API token 沒有 KV 權限時，指令結束碼是 1，但 Worker 已經刪除',
    {
      title: 'wrangler delete 缺 KV 權限時的結束碼',
      topics: ['cli'],
      verify: verified(
        '用沒有 KV 權限的 API token 對一個測試 Worker 跑 `wrangler delete`。成立的條件是結束碼為 1，且 Worker 已不在帳號內',
      ),
      note: 'wrangler 4.167.0',
    },
  ),
]
