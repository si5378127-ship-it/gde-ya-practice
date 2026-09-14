/**
 * ВОПРОСЫ И ВАРИАНТЫ ОТВЕТОВ.
 *
 * Здесь можно свободно менять ТЕКСТ (поле `text`).
 * Поле `id` менять не нужно — на него опирается подсчёт результата
 * (см. src/utils/scoring.ts).
 */

import type { Option, ResponsibilityItem } from '../types'

/* ЭКРАН 2 — что сейчас занимает жизнь */
export const lifeAreas: Option[] = [
  { id: 'children', text: 'Дети' },
  { id: 'relationship', text: 'Отношения' },
  { id: 'work', text: 'Работа' },
  { id: 'study', text: 'Учёба' },
  { id: 'parents', text: 'Родители и родственники' },
  { id: 'home', text: 'Дом и быт' },
  { id: 'requests', text: 'Чужие просьбы' },
  { id: 'health', text: 'Здоровье' },
  { id: 'money', text: 'Деньги' },
  { id: 'myWishes', text: 'Мои желания и интересы' },
  { id: 'rest', text: 'Отдых' },
  { id: 'other', text: 'Другое' },
]

/** Сферы, которые считаются «местом для себя» (влияют только на текст-мостик) */
export const selfAreaIds = ['myWishes', 'rest']

/* ЭКРАН 3 — МОЁ / ОБЩЕЕ / ЧУЖОЕ */
export const ownershipCategories = [
  { id: 'mine', label: 'МОЁ', emoji: '🌿' },
  { id: 'shared', label: 'ОБЩЕЕ', emoji: '🤝' },
  { id: 'theirs', label: 'ЧУЖОЕ', emoji: '👋' },
] as const

export const responsibilityItems: ResponsibilityItem[] = [
  { id: 'myHealth', text: 'Моё здоровье' },
  { id: 'myRest', text: 'Моё время на отдых' },
  { id: 'otherMood', text: 'Настроение другого взрослого человека' },
  { id: 'familyDinner', text: 'Семейный ужин' },
  { id: 'familyBudget', text: 'Семейный бюджет' },
  { id: 'childDoctor', text: 'Запись ребёнка к врачу' },
  { id: 'colleagueProblem', text: 'Проблема коллеги' },
  { id: 'relativeRelations', text: 'Отношения взрослого родственника' },
  { id: 'othersDispleasure', text: 'Чужое недовольство моим решением' },
  { id: 'myGrowth', text: 'Моё обучение и развитие' },
]

/* ЭКРАН 4 — что происходит, когда кому-то что-то нужно */
export const helpingOptions: Option[] = [
  { id: 'a', text: 'Я почти сразу начинаю думать, как это решить.' },
  { id: 'b', text: 'Предлагаю помощь, даже если меня прямо не просили.' },
  { id: 'c', text: 'Сначала спрашиваю, какая именно помощь от меня нужна.' },
  {
    id: 'd',
    text: 'Иногда внезапно обнаруживаю, что чужая проблема уже почему-то стала моей задачей 😅',
  },
  { id: 'e', text: 'Могу выслушать человека и оставить решение ему.' },
]

/* ЭКРАН 5 — а если у меня уже были планы */
export const plansOptions: Option[] = [
  { id: 'a', text: 'Скорее всего, перенесу своё.' },
  { id: 'b', text: 'Сначала выясню, действительно ли это срочно.' },
  { id: 'c', text: 'Попытаюсь успеть и своё, и чужое.' },
  { id: 'd', text: 'Откажу, но потом буду чувствовать вину.' },
  { id: 'e', text: 'Если ситуация не срочная, спокойно оставлю своё время себе.' },
]

/* ЭКРАН 6 — внутреннее «надо» */
export const innerShouldOptions: Option[] = [
  { id: 'collapse', text: 'всё развалится' },
  { id: 'offended', text: 'человек обидится' },
  { id: 'judged', text: 'обо мне плохо подумают' },
  { id: 'guilty', text: 'я буду чувствовать себя виноватой' },
  { id: 'easier', text: 'проще самой сделать, чем объяснять' },
  { id: 'nothing', text: 'ничего страшного не произойдёт' },
  { id: 'custom', text: 'свой вариант' },
]

/** id варианта, который открывает текстовое поле */
export const innerShouldCustomId = 'custom'
