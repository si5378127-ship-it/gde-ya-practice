import { useEffect, useMemo, useState } from 'react'

import { ProgressBar } from './components/ProgressBar'
import { results } from './data/results'
import { texts } from './data/texts'
import { Closing } from './screens/Closing'
import { FinalChoice } from './screens/FinalChoice'
import { HelpingPattern } from './screens/HelpingPattern'
import { InnerShould } from './screens/InnerShould'
import { LifeAreas, LifeAreasBridge } from './screens/LifeAreas'
import { PersonalPlans } from './screens/PersonalPlans'
import { Responsibility, ResponsibilityIntro } from './screens/Responsibility'
import { Result } from './screens/Result'
import { Welcome } from './screens/Welcome'
import type { Answers, Ownership } from './types'
import { calculateResult } from './utils/calculateResult'
import { clearState, emptyAnswers, loadState, saveState } from './utils/storage'

/** Порядок экранов практики */
const STEPS = [
  'welcome',
  'lifeAreas',
  'bridge',
  'responsibilityIntro',
  'responsibility',
  'helping',
  'plans',
  'innerShould',
  'result',
  'finalChoice',
  'closing',
] as const

type StepId = (typeof STEPS)[number]

/** Сколько «шагов» показывать в прогрессе (welcome не считается) */
const TOTAL_STEPS = 7

const progressByStep: Partial<Record<StepId, number>> = {
  lifeAreas: 1,
  bridge: 1,
  responsibilityIntro: 2,
  responsibility: 2,
  helping: 3,
  plans: 4,
  innerShould: 5,
  result: 6,
  finalChoice: 7,
  closing: 7,
}

function isStepId(value: string): value is StepId {
  return (STEPS as readonly string[]).includes(value)
}

export default function App() {
  const saved = useMemo(() => loadState(), [])

  const [answers, setAnswers] = useState<Answers>(
    () => saved?.answers ?? emptyAnswers,
  )
  const [step, setStep] = useState<StepId>(() =>
    saved && isStepId(saved.stepId) ? saved.stepId : 'welcome',
  )

  // прогресс живёт только в этом браузере
  useEffect(() => {
    saveState(step, answers)
  }, [step, answers])

  // при смене экрана возвращаем человека к началу карточки
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const goTo = (next: StepId) => setStep(next)

  const goNext = () => {
    const index = STEPS.indexOf(step)
    const next = STEPS[Math.min(index + 1, STEPS.length - 1)]
    goTo(next)
  }

  const goBack = () => {
    const index = STEPS.indexOf(step)
    const previous = STEPS[Math.max(index - 1, 0)]
    goTo(previous)
  }

  const update = (patch: Partial<Answers>) =>
    setAnswers((current) => ({ ...current, ...patch }))

  const restart = () => {
    clearState()
    setAnswers(emptyAnswers)
    setStep('welcome')
  }

  const askRestart = () => {
    if (window.confirm(texts.common.restartConfirm)) restart()
  }

  const toggleArea = (id: string) =>
    setAnswers((current) => ({
      ...current,
      lifeAreas: current.lifeAreas.includes(id)
        ? current.lifeAreas.filter((value) => value !== id)
        : [...current.lifeAreas, id],
    }))

  const chooseOwnership = (itemId: string, choice: Ownership) =>
    setAnswers((current) => ({
      ...current,
      responsibility: { ...current.responsibility, [itemId]: choice },
    }))

  const score = useMemo(() => calculateResult(answers), [answers])
  const progress = progressByStep[step]

  /** Есть ли уже начатая практика — от этого зависит подпись кнопки на старте */
  const hasProgress =
    answers.lifeAreas.length > 0 ||
    Object.keys(answers.responsibility).length > 0

  const renderStep = () => {
    switch (step) {
      case 'welcome':
        return (
          <Welcome
            hasProgress={hasProgress}
            onStart={goNext}
            onRestart={restart}
          />
        )

      case 'lifeAreas':
        return (
          <LifeAreas
            selected={answers.lifeAreas}
            onToggle={toggleArea}
            onNext={goNext}
            onBack={goBack}
          />
        )

      case 'bridge':
        return (
          <LifeAreasBridge
            selected={answers.lifeAreas}
            onNext={goNext}
            onBack={goBack}
          />
        )

      case 'responsibilityIntro':
        return <ResponsibilityIntro onNext={goNext} onBack={goBack} />

      case 'responsibility':
        return (
          <Responsibility
            answers={answers.responsibility}
            onChoose={chooseOwnership}
            onNext={goNext}
            onBack={goBack}
          />
        )

      case 'helping':
        return (
          <HelpingPattern
            value={answers.helping}
            onChange={(id) => update({ helping: id })}
            onNext={goNext}
            onBack={goBack}
          />
        )

      case 'plans':
        return (
          <PersonalPlans
            value={answers.plans}
            onChange={(id) => update({ plans: id })}
            onNext={goNext}
            onBack={goBack}
          />
        )

      case 'innerShould':
        return (
          <InnerShould
            value={answers.innerShould}
            customText={answers.innerShouldCustom}
            onChange={(id) => update({ innerShould: id })}
            onCustomChange={(text) => update({ innerShouldCustom: text })}
            onNext={goNext}
            onBack={goBack}
          />
        )

      case 'result':
        return (
          <Result result={results[score.key]} onNext={goNext} onBack={goBack} />
        )

      case 'finalChoice':
        return (
          <FinalChoice
            value={answers.finalChoice}
            onChange={(text) => update({ finalChoice: text })}
            onNext={goNext}
            onBack={goBack}
          />
        )

      case 'closing':
        return (
          <Closing
            choice={answers.finalChoice}
            onBack={goBack}
            onRestart={askRestart}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        {progress ? (
          <>
            <ProgressBar current={progress} total={TOTAL_STEPS} />
            <button
              type="button"
              className="button button--tiny"
              onClick={askRestart}
            >
              {texts.common.restart}
            </button>
          </>
        ) : (
          <span className="leaf leaf--header" aria-hidden="true">
            🌿
          </span>
        )}
      </header>

      <main className="app__main">
        <div className="screen" key={step}>
          {renderStep()}
        </div>
      </main>
    </div>
  )
}
