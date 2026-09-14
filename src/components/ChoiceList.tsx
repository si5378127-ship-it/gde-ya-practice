import { ChoiceButton } from './ChoiceButton'
import type { Option } from '../types'

interface ChoiceListProps {
  name: string
  options: Option[]
  value: string | null
  onChange: (id: string) => void
  /** Подпись группы для скринридеров */
  legend: string
}

/** Группа вариантов с одним ответом */
export function ChoiceList({
  name,
  options,
  value,
  onChange,
  legend,
}: ChoiceListProps) {
  return (
    <fieldset className="choices">
      <legend className="visually-hidden">{legend}</legend>
      {options.map((option) => (
        <ChoiceButton
          key={option.id}
          name={name}
          value={option.id}
          label={option.text}
          checked={value === option.id}
          onChange={onChange}
        />
      ))}
    </fieldset>
  )
}
