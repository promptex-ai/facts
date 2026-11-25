import type { Fact } from 'fact-kit'

// All facts of this entry were read on the same day, so the probe and the dates are written once.
export const VERIFIED_ON = '2026-11-26'

export const manual = (reason: string): NonNullable<Fact['verify']> => ({
  probe: { kind: 'manual', reason },
  verifiedOn: VERIFIED_ON,
  screenedThrough: VERIFIED_ON,
})
