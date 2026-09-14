import { ChoiceList } from '../components/ChoiceList'
import { QuestionCard } from '../components/QuestionCard'
import { helpingOptions } from '../data/questions'
import { texts } from '../data/texts'

interface HelpingPatternProps {
  value: string | null
  onChange: (id: string) => void
  onNext: () => void
  onBack: () => void
}

export function HelpingPattern({
  value,
  onChange,
  onNext,
  onBack,
}: HelpingPatternProps) {
  return (
    <QuestionCard
      title={texts.helping.title}
      question={texts.helping.question}
      footer={
        <>
          {!value && <p className="note">{texts.helping.hint}</p>}
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
        name="helping"
        legend={texts.helping.question}
        options={helpingOptions}
        value={value}
        onChange={onChange}
      />
    </QuestionCard>
  )
}
