/**
 * Рисование квадратной карточки 1080×1080 на canvas.
 * Без внешних библиотек: обычный 2D-контекст.
 *
 * На карточку попадает ТОЛЬКО финальный ответ пользователя —
 * как он его написал, без добавления «Я бы…».
 */

import { links } from '../config/links'
import { texts } from '../data/texts'

export const CARD_SIZE = 1080

/** Совпадает с лимитом поля на финальном экране */
const MAX_TEXT_LENGTH = 180

const palette = {
  background: '#FBF6EE',
  paper: '#FFFDF8',
  border: '#D8CDB8',
  sage: '#8AA07F',
  deep: '#2E4436',
  muted: '#6E7F69',
}

const serif =
  'Georgia, "Times New Roman", "PT Serif", "Segoe UI Emoji", "Apple Color Emoji", serif'
const sans =
  '"Segoe UI", Roboto, "Helvetica Neue", Arial, "Segoe UI Emoji", "Apple Color Emoji", sans-serif'

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + width, y, x + width, y + height, radius)
  ctx.arcTo(x + width, y + height, x, y + height, radius)
  ctx.arcTo(x, y + height, x, y, radius)
  ctx.arcTo(x, y, x + width, y, radius)
  ctx.closePath()
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const lines: string[] = []

  for (const paragraph of text.split('\n')) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean)
    if (words.length === 0) continue

    let current = words[0]
    for (let i = 1; i < words.length; i += 1) {
      const candidate = `${current} ${words[i]}`
      if (ctx.measureText(candidate).width <= maxWidth) {
        current = candidate
      } else {
        lines.push(current)
        current = words[i]
      }
    }
    lines.push(current)
  }

  return lines
}

/** Подбираем размер шрифта так, чтобы текст уместился в отведённый блок */
function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxHeight: number,
): { lines: string[]; fontSize: number; lineHeight: number } {
  for (let fontSize = 64; fontSize >= 28; fontSize -= 2) {
    ctx.font = `italic ${fontSize}px ${serif}`
    const lineHeight = Math.round(fontSize * 1.32)
    const lines = wrapText(ctx, text, maxWidth)
    if (lines.length * lineHeight <= maxHeight) {
      return { lines, fontSize, lineHeight }
    }
  }

  ctx.font = `italic 28px ${serif}`
  return { lines: wrapText(ctx, text, maxWidth), fontSize: 28, lineHeight: 36 }
}

function drawLeaf(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  color: string,
  withStem = false,
): void {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.fillStyle = color
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(0, -size)
  ctx.bezierCurveTo(size * 0.72, -size * 0.42, size * 0.72, size * 0.42, 0, size)
  ctx.bezierCurveTo(
    -size * 0.72,
    size * 0.42,
    -size * 0.72,
    -size * 0.42,
    0,
    -size,
  )
  ctx.fill()

  if (withStem) {
    ctx.lineWidth = Math.max(2, size * 0.09)
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(0, size * 0.75)
    ctx.lineTo(0, size * 1.75)
    ctx.stroke()
  }

  ctx.restore()
}

/** Пользовательский текст как есть — без авто-правок «Я бы…» */
export function prepareCardText(text: string): string {
  return text.trim().replace(/\s+\n/g, '\n').slice(0, MAX_TEXT_LENGTH)
}

export function drawShareCard(
  canvas: HTMLCanvasElement,
  userText: string,
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = CARD_SIZE
  canvas.height = CARD_SIZE

  const practiceUrl = links.practiceUrl.trim()
  const showUrl = practiceUrl.length > 0

  // фон
  ctx.fillStyle = palette.background
  ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE)

  // мягкое тёплое свечение сверху
  const glow = ctx.createRadialGradient(
    CARD_SIZE / 2,
    CARD_SIZE * 0.18,
    40,
    CARD_SIZE / 2,
    CARD_SIZE * 0.18,
    CARD_SIZE * 0.85,
  )
  glow.addColorStop(0, 'rgba(255, 253, 248, 0.95)')
  glow.addColorStop(1, 'rgba(255, 253, 248, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE)

  // бумажная карточка внутри
  const margin = 72
  ctx.save()
  ctx.shadowColor = 'rgba(46, 68, 54, 0.10)'
  ctx.shadowBlur = 48
  ctx.shadowOffsetY = 18
  ctx.fillStyle = palette.paper
  roundedRect(ctx, margin, margin, CARD_SIZE - margin * 2, CARD_SIZE - margin * 2, 56)
  ctx.fill()
  ctx.restore()

  ctx.strokeStyle = palette.border
  ctx.lineWidth = 2
  roundedRect(
    ctx,
    margin + 22,
    margin + 22,
    CARD_SIZE - (margin + 22) * 2,
    CARD_SIZE - (margin + 22) * 2,
    38,
  )
  ctx.stroke()

  // еле заметные листья в углах
  drawLeaf(ctx, 168, 186, 44, -0.5, 'rgba(138, 160, 127, 0.16)')
  drawLeaf(ctx, 222, 232, 26, 0.35, 'rgba(138, 160, 127, 0.11)')
  drawLeaf(ctx, CARD_SIZE - 172, CARD_SIZE - 196, 46, 0.6, 'rgba(138, 160, 127, 0.14)')
  drawLeaf(ctx, CARD_SIZE - 232, CARD_SIZE - 244, 24, -0.3, 'rgba(138, 160, 127, 0.1)')

  const centerX = CARD_SIZE / 2
  const contentWidth = CARD_SIZE - margin * 2 - 140

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // фирменный листик сверху
  drawLeaf(ctx, centerX, 224, 30, 0, palette.sage, true)

  // вступительная строка
  ctx.fillStyle = palette.sage
  ctx.font = `600 34px ${sans}`
  ctx.fillText(texts.share.cardLead, centerX, 318)

  // тонкая линия
  ctx.strokeStyle = 'rgba(138, 160, 127, 0.45)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(centerX - 70, 366)
  ctx.lineTo(centerX + 70, 366)
  ctx.stroke()

  // нижний блок: вопрос → подпись → опциональный URL
  const questionY = showUrl ? 820 : 848
  const footerY = showUrl ? 892 : 930
  const urlY = 968
  const textTop = 400
  const textBottom = questionY - 48
  const textMaxHeight = textBottom - textTop
  const textCenterY = textTop + textMaxHeight / 2

  // текст пользователя — как есть, без «Я бы…»
  const text = prepareCardText(userText) || '…'
  const { lines, lineHeight } = fitText(ctx, text, contentWidth, textMaxHeight)
  ctx.fillStyle = palette.deep
  const blockHeight = lines.length * lineHeight
  const startY = textCenterY - blockHeight / 2 + lineHeight / 2
  lines.forEach((line, index) => {
    ctx.fillText(line, centerX, startY + index * lineHeight)
  })

  // вопрос внизу
  ctx.fillStyle = palette.deep
  ctx.font = `italic 36px ${serif}`
  ctx.fillText(texts.share.cardQuestion, centerX, questionY)

  // подпись автора
  ctx.fillStyle = palette.muted
  ctx.font = `26px ${sans}`
  ctx.fillText(texts.share.cardFooter, centerX, footerY)

  // адрес интерактива — только если заполнен в config
  if (showUrl) {
    ctx.fillStyle = palette.muted
    ctx.font = `22px ${sans}`
    ctx.globalAlpha = 0.85
    ctx.fillText(practiceUrl, centerX, urlY)
    ctx.globalAlpha = 1
  }
}

/** Возвращает data URL PNG для показа и сохранения */
export function cardToDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png')
}
