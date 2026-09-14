import { texts } from '../data/texts'

interface WelcomeProps {
  onStart: () => void
  onRestart: () => void
  /** Есть ли сохранённые ответы с прошлого раза */
  hasProgress: boolean
}

export function Welcome({ onStart, onRestart, hasProgress }: WelcomeProps) {
  return (
    <section className="card card--welcome">
      <p className="welcome__gift">{texts.welcome.gift}</p>

      <h1 className="welcome__title">{texts.welcome.title}</h1>
      <p className="welcome__author">{texts.welcome.author}</p>

      <span className="leaf" aria-hidden="true">
        🌿
      </span>

      <p className="welcome__lead">{texts.welcome.lead}</p>

      <ul className="welcome__facts">
        {texts.welcome.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>

      <button type="button" className="button button--primary" onClick={onStart}>
        {hasProgress ? texts.welcome.resume : texts.welcome.button}
      </button>

      {hasProgress && (
        <button type="button" className="button button--link" onClick={onRestart}>
          {texts.welcome.restart}
        </button>
      )}

      <p className="note note--quiet">{texts.welcome.privacy}</p>
    </section>
  )
}
