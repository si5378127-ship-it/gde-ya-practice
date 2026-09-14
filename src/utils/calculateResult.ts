/**
 * АЛГОРИТМ РЕЗУЛЬТАТА.
 *
 * Считаем две мягкие шкалы (0…1):
 *   other — сколько чужой ответственности человек берёт на себя;
 *   self  — насколько легко собственное переносится на потом.
 *
 * Дальше выбираем один из трёх текстов в src/data/results.ts.
 * Никаких диагнозов и «правильных» ответов — только описание паттерна.
 *
 * Сами веса и пороги вынесены в src/utils/scoring.ts
 */

import { responsibilityItems, selfAreaIds } from '../data/questions'
import type { Answers, ResultKey } from '../types'
import {
  helpingMax,
  helpingWeights,
  innerShouldMax,
  innerShouldWeights,
  lifeAreasMax,
  plansMax,
  plansWeights,
  requestsAreaId,
  requestsAreaWeight,
  responsibilityMax,
  responsibilityWeight,
  selfAreasMissingWeight,
  thresholds,
  type Weight,
} from './scoring'

export interface ResultScore {
  /** 0…1 — чужая ответственность на своих плечах */
  other: number
  /** 0…1 — своё откладывается */
  self: number
  key: ResultKey
}

function add(target: Weight, value: Weight): void {
  target.other += value.other
  target.self += value.self
}

function ratio(value: number, max: number): number {
  if (max <= 0) return 0
  return Math.min(1, Math.max(0, value / max))
}

export function calculateResult(answers: Answers): ResultScore {
  const score: Weight = { other: 0, self: 0 }
  const max: Weight = { other: 0, self: 0 }

  // Экран 2 — сферы жизни
  add(max, lifeAreasMax)
  if (answers.lifeAreas.includes(requestsAreaId)) add(score, requestsAreaWeight)
  const hasSelfArea = selfAreaIds.some((id) => answers.lifeAreas.includes(id))
  if (!hasSelfArea) add(score, selfAreasMissingWeight)

  // Экран 3 — МОЁ / ОБЩЕЕ / ЧУЖОЕ
  add(max, responsibilityMax)
  for (const item of responsibilityItems) {
    const choice = answers.responsibility[item.id]
    if (choice) add(score, responsibilityWeight(item.id, choice))
  }

  // Экран 4 — реакция на чужое «мне надо»
  if (answers.helping) {
    add(max, helpingMax)
    add(score, helpingWeights[answers.helping] ?? { other: 0, self: 0 })
  }

  // Экран 5 — свои планы
  if (answers.plans) {
    add(max, plansMax)
    add(score, plansWeights[answers.plans] ?? { other: 0, self: 0 })
  }

  // Экран 6 — внутреннее «надо»
  if (answers.innerShould) {
    add(max, innerShouldMax)
    add(score, innerShouldWeights[answers.innerShould] ?? { other: 0, self: 0 })
  }

  const other = ratio(score.other, max.other)
  const self = ratio(score.self, max.self)

  let key: ResultKey
  if (other >= thresholds.dispatcher) {
    key = 'dispatcher'
  } else if (
    self >= thresholds.ownPostponed ||
    other >= thresholds.ownPostponedByOther
  ) {
    key = 'ownPostponed'
  } else {
    key = 'spaceForSelf'
  }

  return { other, self, key }
}
