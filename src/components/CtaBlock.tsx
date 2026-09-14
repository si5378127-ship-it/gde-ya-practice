import { links } from '../config/links'
import { texts } from '../data/texts'

/** Спокойный блок «если хочется продолжить» — главный шаг: Telegram */
export function CtaBlock() {
  return (
    <section className="card card--cta">
      <h3 className="card__subtitle card__subtitle--tight">{texts.cta.title}</h3>

      <a
        className="button button--primary"
        href={links.telegram}
        target="_blank"
        rel="noopener noreferrer"
      >
        {texts.cta.telegram}
      </a>

      <a
        className="button button--outline"
        href={links.consultation}
        target="_blank"
        rel="noopener noreferrer"
      >
        {texts.cta.consultation}
      </a>

      <p className="note note--quiet">{texts.cta.note}</p>
    </section>
  )
}
