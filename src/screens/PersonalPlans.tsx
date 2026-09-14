import { ChoiceList } from '../components/ChoiceList'
import { QuestionCard } from '../components/QuestionCard'
import { plansOptions } from '../data/questions'
import { texts } from '../data/texts'

interface PersonalPlansProps {
  value: string | null
  onChange: (id: string) => void
  onNext: () => void
  onBack: () => void
}

export function PersonalPlans({
  value,
  onChange,
  onNext,
  onBack,
}: PersonalPlansProps) {
  return (
    <QuestionCard
      title={texts.plans.title}
      question={texts.plans.question}
      footer={
        <>
          {!value && <p className="note">{texts.plans.hint}</p>}
          <div className="nav">
            <button type="button" className="button button--ghost" onClick={onBack}>
              {texts.common.back}
            </button>
            <button
              type="button"
              className="button button--primary"
              onClick={onNext}
              disabled={!value}
            >
              {texts.common.next}
            </button>
          </div>
        </>
      }
    >
      <ChoiceList
        name="plans"
        legend={texts.plans.question}
        options={plansOptions}
        value={value}
        onChange={onChange}
      />
    </QuestionCard>
  )
}
