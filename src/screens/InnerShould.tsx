import { ChoiceList } from '../components/ChoiceList'
import { QuestionCard } from '../components/QuestionCard'
import { innerShouldCustomId, innerShouldOptions } from '../data/questions'
import { texts } from '../data/texts'

interface InnerShouldProps {
  value: string | null
  customText: string
  onChange: (id: string) => void
  onCustomChange: (text: string) => void
  onNext: () => void
  onBack: () => void
}

export function InnerShould({
  value,
  customText,
  onChange,
  onCustomChange,
  onNext,
  onBack,
}: InnerShouldProps) {
  const isCustom = value === innerShouldCustomId
  const canContinue = Boolean(value) && (!isCustom || customText.trim().length > 0)

  return (
    <QuestionCard
      title={texts.innerShould.title}
      question={texts.innerShould.question}
      footer={
        <>
          {!canContinue && <p className="note">{texts.innerShould.hint}</p>}
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
              {texts.innerShould.button}
            </button>
          </div>
        </>
      }
    >
      <ChoiceList
        name="inner-should"
        legend={texts.innerShould.question}
        options={innerShouldOptions}
        value={value}
        onChange={onChange}
      />

      {isCustom && (
        <div className="field">
          <label className="field__label" htmlFor="inner-should-custom">
            {texts.innerShould.customLabel}
          </label>
          <textarea
            id="inner-should-custom"
            className="field__input"
            rows={2}
            maxLength={300}
            placeholder={texts.innerShould.customPlaceholder}
            value={customText}
            onChange={(event) => onCustomChange(event.target.value)}
          />
        </div>
      )}
    </QuestionCard>
  )
}
