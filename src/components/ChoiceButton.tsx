interface ChoiceProps {
  /** Имя группы для radio-вариантов */
  name: string
  value: string
  label: string
  checked: boolean
  onChange: (value: string) => void
  /** 'radio' — один ответ, 'checkbox' — несколько */
  type?: 'radio' | 'checkbox'
}

/**
 * Крупная карточка-вариант ответа.
 * Внутри — настоящий input, поэтому работают клавиатура и скринридеры.
 */
export function ChoiceButton({
  name,
  value,
  label,
  checked,
  onChange,
  type = 'radio',
}: ChoiceProps) {
  return (
    <label
      className={`choice choice--${type}${checked ? ' choice--checked' : ''}`}
    >
      <input
        className="choice__input"
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span className="choice__marker" aria-hidden="true" />
      <span className="choice__label">{label}</span>
    </label>
  )
}
