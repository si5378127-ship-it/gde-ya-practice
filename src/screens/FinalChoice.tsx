import { texts } from '../data/texts'

interface FinalChoiceProps {
  value: string
  onChange: (text: string) => void
  onNext: () => void
  onBack: () => void
}

const MAX_LENGTH = texts.finalChoice.maxLength

export function FinalChoice({
  value,
  onChange,
  onNext,
  onBack,
}: FinalChoiceProps) {
  const trimmed = value.trim()
  const canContinue = trimmed.length > 1
  const length = value.length

  return (
    <section className="card">
      <h2 className="card__title">{texts.finalChoice.title}</h2>
      <p className="card__question">{texts.finalChoice.text}</p>
      <p className="card__subtitle">{texts.finalChoice.guide}</p>

      <div className="field">
        <label className="field__label" htmlFor="final-choice">
          {texts.finalChoice.label}
        </label>
        <textarea
          id="final-choice"
          className="field__input field__input--large"
          rows={5}
          maxLength={MAX_LENGTH}
          placeholder={texts.finalChoice.placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value.slice(0, MAX_LENGTH))}
        />
        <p className="field__counter" aria-live="polite">
          {length} / {MAX_LENGTH}
        </p>
      </div>

      {!canContinue && <p className="note">{texts.finalChoice.hint}</p>}

      <div className="nav">
        <button type="button" className="button button--ghost" onClick={onBack}>
          {texts.common.back}
        </button>
        <button
          type="button"
          className="button button--primary"
          onClick={onNext}
          disabled={!canContinue}
        >
          {texts.finalChoice.button}
        </button>
      </div>
    </section>
  )
}
