import { useState } from 'react'

import { ownershipCategories, responsibilityItems } from '../data/questions'
import { texts } from '../data/texts'
import type { Ownership } from '../types'

interface IntroProps {
  onNext: () => void
  onBack: () => void
}

/** Экран-предупреждение: правильных ответов здесь нет */
export function ResponsibilityIntro({ onNext, onBack }: IntroProps) {
  return (
    <section className="card card--bridge">
      <h2 className="card__title">{texts.responsibilityIntro.title}</h2>
      <p className="card__subtitle">{texts.responsibilityIntro.text}</p>

      <p className="quote">{texts.responsibilityIntro.note}</p>

      <div className="nav">
        <button type="button" className="button button--ghost" onClick={onBack}>
          {texts.common.back}
        </button>
        <button type="button" className="button button--primary" onClick={onNext}>
          {texts.responsibilityIntro.button}
        </button>
      </div>
    </section>
  )
}

interface ResponsibilityProps {
  answers: Record<string, Ownership>
  onChoose: (itemId: string, choice: Ownership) => void
  onNext: () => void
  onBack: () => void
}

function firstUnanswered(answers: Record<string, Ownership>): number {
  const index = responsibilityItems.findIndex((item) => !answers[item.id])
  return index === -1 ? responsibilityItems.length - 1 : index
}

/** Ситуации показываются по одной: МОЁ / ОБЩЕЕ / ЧУЖОЕ */
export function Responsibility({
  answers,
  onChoose,
  onNext,
  onBack,
}: ResponsibilityProps) {
  const [index, setIndex] = useState(() => firstUnanswered(answers))

  const item = responsibilityItems[index]
  const isLast = index === responsibilityItems.length - 1
  const current = answers[item.id]

  const handleChoose = (choice: Ownership) => {
    onChoose(item.id, choice)
    if (isLast) {
      onNext()
    } else {
      setIndex((value) => value + 1)
    }
  }

  const handleBack = () => {
    if (index === 0) {
      onBack()
    } else {
      setIndex((value) => value - 1)
    }
  }

  return (
    <section className="card">
      <h2 className="card__title card__title--small">
        {texts.responsibility.title}
      </h2>
      <p className="card__subtitle">{texts.responsibility.subtitle}</p>

      <p className="steps" aria-live="polite">
        {index + 1} / {responsibilityItems.length}
      </p>

      <div className="situation" key={item.id}>
        <p className="situation__text">{item.text}</p>
      </div>

      <div className="categories" role="group" aria-label={texts.responsibility.title}>
        {ownershipCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`category${current === category.id ? ' category--active' : ''}`}
            onClick={() => handleChoose(category.id)}
            aria-pressed={current === category.id}
          >
            <span className="category__emoji" aria-hidden="true">
              {category.emoji}
            </span>
            <span className="category__label">{category.label}</span>
          </button>
        ))}
      </div>

      <div className="nav nav--single">
        <button type="button" className="button button--ghost" onClick={handleBack}>
          {texts.common.back}
        </button>
      </div>
    </section>
  )
}
