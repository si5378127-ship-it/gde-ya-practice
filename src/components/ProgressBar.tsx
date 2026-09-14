import { texts } from '../data/texts'

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100)

  return (
    <div className="progress">
      <div
        className="progress__track"
        role="progressbar"
        aria-label={texts.common.progressLabel}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-valuetext={`${current} из ${total}`}
      >
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress__label">
        {current} / {total}
      </span>
    </div>
  )
}
