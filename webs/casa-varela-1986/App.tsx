import { useRef } from 'react';
import { LazyMotion, domAnimation, m } from 'motion/react';
import {
  BookingForm,
  Cursor,
  DemoNote,
  DemoTag,
  LangToggle,
  LazyScene,
  MapEmbed,
  PhotoSlot,
  SkipLink,
  Toaster,
  demoAction,
  gsap,
  posterFrom,
  useReducedMotionPref,
  useScrollScene,
  useSmoothScroll,
} from '../_kit';
import { useI18n } from './content';

const poster = posterFrom(import.meta.glob('./poster.webp', { eager: true, query: '?url', import: 'default' }));
const loadScene = () => import('./Scene');

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  useScrollScene(root, ({ reduced }) => {
    if (reduced || !window.matchMedia('(min-width: 900px)').matches) return;
    // The ring of rices turns into place around the pan as you scroll to it.
    gsap.fromTo('.ring', { rotate: -24 }, { rotate: 0, ease: 'none', scrollTrigger: { trigger: '.ring', start: 'top 90%', end: 'center 55%', scrub: true } });
    gsap.fromTo('.ring__item', { rotate: 24 }, { rotate: 0, ease: 'none', scrollTrigger: { trigger: '.ring', start: 'top 90%', end: 'center 55%', scrub: true } });
  });

  const reservar = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('reservar')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={14} />
        <header className="head">
          <a href="#contenido" className="head__brand">
            Casa Varela
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#arroces">{t.nav.arroces}</a>
            <a href="#casa">{t.nav.casa}</a>
            <a href="#visita">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <h1 id="h1">
              Casa Varela <span>1986</span>
            </h1>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
            <p className="hero__lead">{t.hero.lead}</p>
            <div className="hero__cta">
              <m.a className="btn btn--sea" href="#reservar" onClick={reservar} whileTap={{ scale: 0.97 }} data-cursor={t.nav.reservar}>
                {t.hero.reservar}
              </m.a>
              <m.button type="button" className="btn btn--saffron" onClick={demoAction(kit, 'call')} whileTap={{ scale: 0.97 }}>
                {t.hero.llamar}
              </m.button>
            </div>
          </section>

          <section className="rices" id="arroces" aria-labelledby="rices-title">
            <div className="rices__head">
              <h2 id="rices-title">{t.arroces.title}</h2>
              <p>{t.arroces.intro}</p>
            </div>
            <div className="ring">
              <span className="ring__pan" aria-hidden="true" />
              <ul>
                {t.arroces.items.map((it, i) => (
                  <li key={it.n} className="ring__item" style={{ ['--i' as string]: i, ['--n' as string]: t.arroces.items.length }}>
                    <h3>{it.n}</h3>
                    <p>{it.d}</p>
                    <p className="ring__price">{kit.priceOnRequest}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="table" id="casa" aria-labelledby="casa-title">
            <div className="table__text">
              <h2 id="casa-title">{t.casa.title}</h2>
              <p>{t.casa.text}</p>
            </div>
            <div className="table__photos">
              {t.casa.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`table__photo table__photo--${i}`}>
                  <span className="t-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="words" aria-labelledby="words-title">
            <h2 id="words-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="words__list">
              {t.resenas.items.map((r) => (
                <figure key={r.t} className="word">
                  <blockquote>{r.t}</blockquote>
                  <figcaption>
                    {r.w}
                    <span className="word__badge">{kit.exampleReview}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="visit" id="visita" aria-labelledby="visit-title">
            <div>
              <h2 id="visit-title">{t.visita.title}</h2>
              <p className="visit__addr">{t.visita.address}</p>
              <dl>
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>{t.visita.phonePending}</dd>
                </div>
                <div>
                  <dt>{t.visita.hours}</dt>
                  <dd>{kit.hoursPending}</dd>
                </div>
              </dl>
              <m.button type="button" className="btn btn--sea" onClick={demoAction(kit, 'whatsapp')} whileTap={{ scale: 0.97 }}>
                WhatsApp
              </m.button>
            </div>
            <MapEmbed className="visit__map" query="Casa Varela, Carrer de Blas Fernández Lirola 82, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="book" id="reservar" tabIndex={-1} aria-labelledby="book-title">
            <h2 id="book-title">{t.reserva.title}</h2>
            <p>{t.reserva.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'date', 'time', 'people']} submitLabel={t.reserva.submit} extra={{ label: t.reserva.rice, options: t.arroces.items.map((i) => i.n) }} />
          </section>
        </main>

        <footer className="foot">
          <p className="foot__name">{t.footer}</p>
          <DemoNote kit={kit} />
        </footer>
        <DemoTag kit={kit} />
        <Toaster />
      </div>
    </LazyMotion>
  );
}
