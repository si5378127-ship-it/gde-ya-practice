/**
 * Общие типы приложения.
 * Тексты здесь не хранятся — только форма данных.
 */

/** Три категории ответственности на экране «А чья это вообще задача?» */
export type Ownership = 'mine' | 'shared' | 'theirs'

/** Простой вариант ответа: идентификатор + текст */
export interface Option {
  id: string
  text: string
}

/** Ситуация для распределения по категориям */
export interface ResponsibilityItem {
  id: string
  text: string
}

/** Ключ одного из трёх результатов практики */
export type ResultKey = 'dispatcher' | 'ownPostponed' | 'spaceForSelf'

/** Описание результата (весь текст — в data/results.ts) */
export interface ResultContent {
  key: ResultKey
  title: string
  paragraphs: string[]
}

/** Все ответы пользователя. Живут только в этом браузере. */
export interface Answers {
  /** id выбранных сфер жизни (экран 2) */
  lifeAreas: string[]
  /** id ситуации -> выбранная категория (экран 3) */
  responsibility: Record<string, Ownership>
  /** id варианта (экран 4) */
  helping: string | null
  /** id варианта (экран 5) */
  plans: string | null
  /** id варианта (экран 6) */
  innerShould: string | null
  /** текст, если выбран «свой вариант» */
  innerShouldCustom: string
  /** финальный ответ «Я бы…» */
  finalChoice: string
}

/** Сохраняемое состояние прохождения */
export interface SavedState {
  version: number
  stepId: string
  answers: Answers
}
