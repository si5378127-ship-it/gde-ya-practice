import { texts } from '../data/texts'
import type { ResultContent } from '../types'

interface ResultCardProps {
  result: ResultContent
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <section className="card card--result">
      <span className="badge">{texts.result.badge}</span>
      <h2 className="card__title">{result.title}</h2>
      <div className="result__text">
        {result.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <p className="note note--quiet">{texts.result.disclaimer}</p>
    </section>
  )
}
