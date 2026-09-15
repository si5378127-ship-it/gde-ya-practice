import { ChoiceButton } from '../components/ChoiceButton'
import { QuestionCard } from '../components/QuestionCard'
import { lifeAreas, selfAreaIds } from '../data/questions'
import { texts } from '../data/texts'

interface LifeAreasProps {
  selected: string[]
  onToggle: (id: string) => void
  onNext: () => void
  onBack: () => void
}

export function LifeAreas({
  selected,
  onToggle,
  onNext,
  onBack,
}: LifeAreasProps) {
  const canContinue = selected.length > 0

  return (
    <QuestionCard
      title={texts.lifeAreas.title}
      subtitle={texts.lifeAreas.subtitle}
      footer={
        <>
          {!canContinue && <p className="note">{texts.lifeAreas.hint}</p>}
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
              {texts.lifeAreas.button}
            </button>
          </div>
        </>
      }
    >
      <div className="choices choices--grid">
        {lifeAreas.map((area) => (
          <ChoiceButton
            key={area.id}
            type="checkbox"
            name="life-areas"
            value={area.id}
            label={area.text}
            checked={selected.includes(area.id)}
            onChange={onToggle}
          />
        ))}
      </div>
    </QuestionCard>
  )
}

interface BridgeProps {
  selected: string[]
  onNext: () => void
  onBack: () => void
}

/** Промежуточная карточка: показывает выбранные сферы и мягкий вопрос */
export function LifeAreasBridge({ selected, onNext, onBack }: BridgeProps) {
  const hasSelfArea = selfAreaIds.some((id) => selected.includes(id))
  const followUp = hasSelfArea
    ? texts.lifeAreasBridge.withSelf
    : texts.lifeAreasBridge.question

  const selectedLabels = lifeAreas
    .filter((area) => selected.includes(area.id))
    .map((area) => area.text)

  return (
    <section className="card card--bridge">
      <span className="leaf" aria-hidden="true">
        🌿
      </span>

      <p className="bridge__intro">{texts.lifeAreasBridge.intro}</p>

      <ul className="bridge__chips" aria-label={texts.lifeAreasBridge.intro}>
        {selectedLabels.map((label) => (
          <li key={label} className="bridge__chip">
            {label}
          </li>
        ))}
      </ul>

      <p className="bridge__text">{followUp}</p>

      <div className="nav">
        <button type="button" className="button button--ghost" onClick={onBack}>
          {texts.common.back}
        </button>
        <button type="button" className="button button--primary" onClick={onNext}>
          {texts.lifeAreasBridge.button}
        </button>
      </div>
    </section>
  )
}
