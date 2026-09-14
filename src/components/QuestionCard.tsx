import type { ReactNode } from 'react'

interface QuestionCardProps {
  title?: string
  subtitle?: string
  question?: string
  children: ReactNode
  /** Нижняя часть карточки: кнопки навигации и подсказки */
  footer?: ReactNode
}

/** Общая «бумажная» карточка экрана с вопросом */
export function QuestionCard({
  title,
  subtitle,
  question,
  children,
  footer,
}: QuestionCardProps) {
  return (
    <section className="card">
      {title && <h2 className="card__title">{title}</h2>}
      {subtitle && <p className="card__subtitle">{subtitle}</p>}
      {question && <p className="card__question">{question}</p>}
      <div className="card__body">{children}</div>
      {footer && <div className="card__footer">{footer}</div>}
    </section>
  )
}
