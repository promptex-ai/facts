import type { FactsModule } from 'fact-kit'
import { flagshipFacts } from './flagship.ts'
import { wranglerFacts } from './wrangler.ts'

const entry: FactsModule = {
  describes: {},
  facts: [...wranglerFacts, ...flagshipFacts],
}

export default entry
