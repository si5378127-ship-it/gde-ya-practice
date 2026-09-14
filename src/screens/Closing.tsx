import { CtaBlock } from '../components/CtaBlock'
import { ShareCard } from '../components/ShareCard'
import { author } from '../config/links'
import { texts } from '../data/texts'

interface ClosingProps {
  /** Финальный ответ «Я бы…» — единственное, что попадает на карточку */
  choice: string
  onBack: () => void
  onRestart: () => void
}

export function Closing({ choice, onBack, onRestart }: ClosingProps) {
  return (
    <>
      <section className="card card--closing">
        <span className="leaf" aria-hidden="true">
          🌿
        </span>
        <p className="closing__text">{texts.finalChoice.after}</p>

        <div className="signature">
          <p className="signature__name">{author.name}</p>
          <p className="signature__role">{author.role}</p>
          <p className="signature__motto">{author.motto}</p>
        </div>
      </section>

      <ShareCard text={choice} />

      <CtaBlock />

      <div className="nav">
        <button type="button" className="button button--ghost" onClick={onBack}>
          {texts.common.back}
        </button>
        <button type="button" className="button button--link" onClick={onRestart}>
          {texts.common.restart}
        </button>
      </div>
    </>
  )
}
