import { useRef } from 'react';
import { LazyMotion, domAnimation, m } from 'motion/react';
import {
  BookingForm,
  Cursor,
  DemoNote,
  ModelCredit,
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

const poster = posterFrom(import.meta.glob('./poster.{avif,webp}', { eager: true, query: '?url', import: 'default' }));
const loadScene = () => import('./Scene');
const spring = { type: 'spring' as const, duration: 0.45, bounce: 0.25 };

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // The first-visit path fills like a progress line, one step at a time.
    gsap.fromTo('.steps__line', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 60%', scrub: true } });
  });

  const cita = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('cita')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={16} />
        <header className="head">
          <a href="#contenido" className="head__brand">
            <span className="head__logo" aria-hidden="true" />
            Dental P&amp;P
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#tratamientos">{t.nav.tratamientos}</a>
            <a href="#peques">{t.nav.peques}</a>
            <a href="#visita">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <div className="hero__text">
              <h1 id="h1">{t.hero.title}</h1>
              <p>{t.hero.lead}</p>
              <div className="hero__cta">
                <m.a className="btn btn--berry" href="#cita" onClick={cita} whileTap={{ scale: 0.95 }} whileHover={reduced ? undefined : { y: -2 }} transition={spring} data-cursor={t.nav.cita}>
                  {t.hero.cita}
                </m.a>
                <m.button type="button" className="btn btn--butter" onClick={demoAction(kit, 'call')} whileTap={{ scale: 0.95 }} transition={spring}>
                  {t.hero.llamar}
                </m.button>
              </div>
            </div>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
          </section>

          <section className="treat" id="tratamientos" aria-labelledby="treat-title">
            <h2 id="treat-title">{t.tratamientos.title}</h2>
            <ul className="treat__grid">
              {t.tratamientos.items.map((it, i) => (
                <m.li key={it.n} className={`blob blob--${i}`} whileHover={reduced ? undefined : { y: -4, rotate: i % 2 ? 1 : -1 }} transition={spring}>
                  <h3>{it.n}</h3>
                  <p>{it.d}</p>
                </m.li>
              ))}
            </ul>
            <p className="note">{t.tratamientos.source}</p>
          </section>

          <section className="kids" id="peques" aria-labelledby="kids-title">
            <h2 id="kids-title">{t.peques.title}</h2>
            <div className="steps">
              <span className="steps__track" aria-hidden="true">
                <span className="steps__line" />
              </span>
              <ol>
                {t.peques.steps.map((s, i) => (
                  <li key={s.n}>
                    <span className="steps__dot" aria-hidden="true">
                      {i + 1}
                    </span>
                    <h3>{s.n}</h3>
                    <p>{s.d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="photos" aria-labelledby="ph-title">
            <h2 id="ph-title">{t.galeria.title}</h2>
            <div className="photos__grid">
              {t.galeria.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`photos__item photos__item--${i}`}>
                  <span className="p-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="fam" aria-labelledby="fam-title">
            <h2 id="fam-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="fam__list">
              {t.resenas.items.map((r, i) => (
                <figure key={r.t} className={`bubble bubble--${i}`}>
                  <span className="bubble__badge">{kit.exampleReview}</span>
                  <blockquote>{r.t}</blockquote>
                  <figcaption>{r.w}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="visit" id="visita" aria-labelledby="visit-title">
            <div className="visit__info">
              <h2 id="visit-title">{t.visita.title}</h2>
              <p className="visit__addr">{t.visita.address}</p>
              <dl>
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>
                    <a href="#visita" onClick={demoAction(kit, 'call')}>
                      933 319 479
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.hours}</dt>
                  <dd>{kit.hoursPending}</dd>
                </div>
              </dl>
              <p className="note">{t.visita.phoneNote}</p>
              <m.button type="button" className="btn btn--berry" onClick={demoAction(kit, 'whatsapp')} whileTap={{ scale: 0.95 }} transition={spring}>
                WhatsApp
              </m.button>
            </div>
            <MapEmbed className="visit__map" query="Clínica Dental P&P, Carrer d'Enric Morera 47, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="book" id="cita" tabIndex={-1} aria-labelledby="book-title">
            <h2 id="book-title">{t.cita.title}</h2>
            <p>{t.cita.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'date', 'note']} submitLabel={t.cita.submit} extra={{ label: t.cita.who, options: t.cita.whoOptions }} />
          </section>
        </main>

        <footer className="foot">
          <p className="foot__name">{t.footer}</p>
          <DemoNote kit={kit} />
          <ModelCredit kit={kit} title="Permanent Dentition" author="University of Dundee, School of Dentistry" url="https://sketchfab.com/3d-models/2f69d7b59c3e4a6a8bcae041bd8e591b" />
        </footer>
        <DemoTag kit={kit} />
        <Toaster />
      </div>
    </LazyMotion>
  );
}
