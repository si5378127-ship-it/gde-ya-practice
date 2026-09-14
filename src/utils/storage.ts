/**
 * Сохранение прогресса в localStorage этого браузера.
 * Ничего никуда не отправляется, персональные данные не собираются.
 */

import type { Answers, SavedState } from '../types'

const STORAGE_KEY = 'agde-ya-progress-v1'
const VERSION = 1

export const emptyAnswers: Answers = {
  lifeAreas: [],
  responsibility: {},
  helping: null,
  plans: null,
  innerShould: null,
  innerShouldCustom: '',
  finalChoice: '',
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/** Аккуратно приводим что угодно из localStorage к валидным ответам */
function normalizeAnswers(raw: unknown): Answers {
  if (!isRecord(raw)) return { ...emptyAnswers }

  const responsibility: Answers['responsibility'] = {}
  if (isRecord(raw.responsibility)) {
    for (const [id, value] of Object.entries(raw.responsibility)) {
      if (value === 'mine' || value === 'shared' || value === 'theirs') {
        responsibility[id] = value
      }
    }
  }

  return {
    lifeAreas: Array.isArray(raw.lifeAreas)
      ? raw.lifeAreas.filter((id): id is string => typeof id === 'string')
      : [],
    responsibility,
    helping: typeof raw.helping === 'string' ? raw.helping : null,
    plans: typeof raw.plans === 'string' ? raw.plans : null,
    innerShould: typeof raw.innerShould === 'string' ? raw.innerShould : null,
    innerShouldCustom:
      typeof raw.innerShouldCustom === 'string' ? raw.innerShouldCustom : '',
    finalChoice: typeof raw.finalChoice === 'string' ? raw.finalChoice : '',
  }
}

export function loadState(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (!isRecord(parsed) || parsed.version !== VERSION) return null
    if (typeof parsed.stepId !== 'string') return null

    return {
      version: VERSION,
      stepId: parsed.stepId,
      answers: normalizeAnswers(parsed.answers),
    }
  } catch {
    // приватный режим или повреждённые данные — просто начинаем заново
    return null
  }
}

export function saveState(stepId: string, answers: Answers): void {
  try {
    const state: SavedState = { version: VERSION, stepId, answers }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // если хранилище недоступно, практика всё равно работает в этой сессии
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
