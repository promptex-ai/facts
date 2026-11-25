import type { FactsModule } from 'fact-kit'
import { bindingFacts } from './binding.ts'
import { iacFacts } from './iac.ts'
import { evaluationFacts } from './evaluation.ts'
import { operationsFacts } from './operations.ts'

// `layer: 'tool'` is not written: fact-kit 0.10.0, the version this repository pins, does not accept the field.
const entry: FactsModule = {
  describes: {},
  facts: [...bindingFacts, ...iacFacts, ...evaluationFacts, ...operationsFacts],
}

export default entry
