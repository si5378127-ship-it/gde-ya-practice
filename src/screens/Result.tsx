import { ResultCard } from '../components/ResultCard'
import { texts } from '../data/texts'
import type { ResultContent } from '../types'

interface ResultScreenProps {
  result: ResultContent
  onNext: () => void
  onBack: () => void
}

export function Result({ result, onNext, onBack }: ResultScreenProps) {
  return (
    <>
      <ResultCard result={result} />

      <div className="nav">
        <button type="button" className="button button--ghost" onClick={onBack}>
          {texts.common.back}
        </button>
        <button type="button" className="button button--primary" onClick={onNext}>
          {texts.result.button}
        </button>
      </div>
    </>
  )
}
