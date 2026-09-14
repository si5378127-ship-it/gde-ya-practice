import { useEffect, useRef, useState } from 'react'

import { texts } from '../data/texts'
import { cardToDataUrl, drawShareCard } from '../utils/shareCard'

interface ShareCardProps {
  /** Только финальный ответ пользователя — без префиксов «Я бы…» */
  text: string
}

/**
 * Квадратная карточка 1080×1080 на память.
 * Рисуется прямо в браузере, ничего не отправляется наружу.
 * На карточку попадает только финальный ответ пользователя — как есть.
 */
export function ShareCard({ text }: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    drawShareCard(canvas, text)
    setImageUrl(cardToDataUrl(canvas))
  }, [text])

  const handleSave = () => {
    if (!imageUrl) return

    const link = document.createElement('a')
    link.href = imageUrl
    link.download = 'a-gde-seychas-ya.png'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <section className="card card--share">
      <h3 className="card__subtitle card__subtitle--tight">
        {texts.share.title}
      </h3>
      <p className="note">{texts.share.hint}</p>

      <canvas ref={canvasRef} className="visually-hidden" aria-hidden="true" />

      {imageUrl ? (
        <img
          className="share__preview"
          src={imageUrl}
          alt="Карточка с вашим ответом: сегодня я возвращаю себе…"
        />
      ) : (
        <p className="note">{texts.share.saving}</p>
      )}

      <button
        type="button"
        className="button button--primary"
        onClick={handleSave}
        disabled={!imageUrl}
      >
        {texts.share.button}
      </button>
      <p className="note note--quiet">{texts.share.fallback}</p>
    </section>
  )
}
