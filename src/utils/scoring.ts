/**
 * ВЕСА ОТВЕТОВ — «настройки» алгоритма.
 *
 * Здесь нет «правильных» ответов: веса описывают только два наблюдения.
 *
 *  other — сколько чужой ответственности человек привычно берёт на себя;
 *  self  — насколько легко своё откладывается на потом.
 *
 * Все значения — небольшие целые числа. Чем больше, тем заметнее паттерн.
 */

import type { Ownership } from '../types'

export interface Weight {
  other: number
  self: number
}

const zero: Weight = { other: 0, self: 0 }

/* ---------- Экран 3: МОЁ / ОБЩЕЕ / ЧУЖОЕ ---------- */

/**
 * Роли ситуаций:
 *  self   — территория самого человека (отдать её = отложить себя);
 *  others — зона ответственности другого взрослого (забрать себе = взять чужое);
 *  shared — общая зона (взять целиком на себя = чуть больше нагрузки);
 *  neutral — зависит от жизненной ситуации, в счёт не идёт.
 */
const itemRole: Record<string, 'self' | 'others' | 'shared' | 'neutral'> = {
  myHealth: 'self',
  myRest: 'self',
  myGrowth: 'self',
  otherMood: 'others',
  colleagueProblem: 'others',
  relativeRelations: 'others',
  othersDispleasure: 'others',
  familyDinner: 'shared',
  familyBudget: 'shared',
  // Запись ребёнка к врачу — родительская задача по факту, не признак «лишнего».
  childDoctor: 'neutral',
}

export function responsibilityWeight(itemId: string, choice: Ownership): Weight {
  switch (itemRole[itemId]) {
    case 'self':
      // «Моё здоровье» как общее или чужое — своё легко уходит из фокуса
      return choice === 'mine' ? zero : { other: 0, self: 2 }
    case 'others':
      if (choice === 'mine') return { other: 2, self: 0 }
      if (choice === 'shared') return { other: 1, self: 0 }
      return zero
    case 'shared':
      return choice === 'mine' ? { other: 1, self: 0 } : zero
    default:
      return zero
  }
}

/** Максимум по экрану 3 — нужен для нормализации */
export const responsibilityMax: Weight = { other: 4 * 2 + 2 * 1, self: 3 * 2 }

/* ---------- Экран 4: реакция на чужое «мне надо» ---------- */

export const helpingWeights: Record<string, Weight> = {
  a: { other: 3, self: 1 }, // сразу начинаю решать
  b: { other: 2, self: 0 }, // предлагаю помощь без просьбы
  c: { other: 0, self: 0 }, // уточняю, какая помощь нужна
  d: { other: 3, self: 1 }, // чужая задача незаметно стала моей
  e: { other: 0, self: 0 }, // выслушать и оставить решение человеку
}

export const helpingMax: Weight = { other: 3, self: 1 }

/* ---------- Экран 5: своё время против чужой срочности ---------- */

export const plansWeights: Record<string, Weight> = {
  a: { other: 1, self: 3 }, // перенесу своё
  b: { other: 0, self: 1 }, // выясню, срочно ли
  c: { other: 1, self: 2 }, // успеть и своё, и чужое
  d: { other: 0, self: 2 }, // откажу, но с виной
  e: { other: 0, self: 0 }, // оставлю своё время себе
}

export const plansMax: Weight = { other: 1, self: 3 }

/* ---------- Экран 6: внутреннее «надо» ---------- */

export const innerShouldWeights: Record<string, Weight> = {
  collapse: { other: 2, self: 1 }, // всё развалится
  offended: { other: 1, self: 1 }, // человек обидится
  judged: { other: 1, self: 1 }, // обо мне плохо подумают
  guilty: { other: 0, self: 2 }, // буду чувствовать вину
  easier: { other: 2, self: 1 }, // проще самой сделать
  nothing: { other: 0, self: 0 }, // ничего страшного
  custom: { other: 1, self: 1 }, // свой вариант — нейтральная середина
}

export const innerShouldMax: Weight = { other: 2, self: 2 }

/* ---------- Экран 2: сферы жизни (небольшой вклад) ---------- */

/** «Чужие просьбы» как отдельная сфера жизни */
export const requestsAreaId = 'requests'
export const requestsAreaWeight: Weight = { other: 1, self: 0 }

/**
 * Если среди выбранного нет ни «Мои желания и интересы», ни «Отдых» —
 * это небольшой штрих к тому, что своё пока не в списке.
 * Выбор этих пунктов сам по себе ничего не «доказывает», поэтому вес мал.
 */
export const selfAreasMissingWeight: Weight = { other: 0, self: 2 }

export const lifeAreasMax: Weight = { other: 1, self: 2 }

/* ---------- Пороги принятия решения ---------- */

export const thresholds = {
  /** доля «чужой ответственности», после которой это результат 1 */
  dispatcher: 0.5,
  /** доля «своё откладывается», после которой это результат 2 */
  ownPostponed: 0.3,
  /** если чужого всё-таки заметно много — тоже результат 2, а не 3 */
  ownPostponedByOther: 0.32,
}
