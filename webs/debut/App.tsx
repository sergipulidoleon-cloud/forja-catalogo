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
  useSmoothScroll({ lerp: 0.09 });

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    gsap.fromTo('.course__line', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.courses', start: 'top 75%', end: 'bottom 55%', scrub: true } });
  });

  const reservar = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('reservar')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={10} />
        <header className="head">
          <a href="#contenido" className="head__brand">
            Debut
          </a>
          <nav aria-label="Principal" className="head__nav">
            <a href="#menu">{t.nav.menu}</a>
            <a href="#casa">{t.nav.casa}</a>
            <a href="#visita">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <div className="hero__text">
              <h1 id="h1">{t.hero.title}</h1>
              <p className="hero__claim">{t.hero.claim}</p>
              <p className="hero__lead">{t.hero.lead}</p>
              <div className="hero__cta">
                <m.a className="btn btn--chalk" href="#reservar" onClick={reservar} whileTap={{ scale: 0.97 }} data-cursor={t.nav.reservar}>
                  {t.hero.reservar}
                </m.a>
                <m.button type="button" className="btn btn--ghost" onClick={demoAction(kit, 'call')} whileTap={{ scale: 0.97 }}>
                  {t.hero.llamar}
                </m.button>
              </div>
            </div>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
          </section>

          <section className="menu" id="menu" aria-labelledby="menu-title">
            <div className="menu__head">
              <h2 id="menu-title">{t.menu.title}</h2>
              <p>{t.menu.intro}</p>
            </div>
            <div className="courses">
              <span className="course__track" aria-hidden="true">
                <span className="course__line" />
              </span>
              <ol>
                {t.menu.steps.map((s) => (
                  <li key={s.n} className="course">
                    <h3>{s.n}</h3>
                    <p>{s.d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="menu__weekday">
              {t.menu.weekday} <span>{kit.priceOnRequest}</span>
            </p>
          </section>

          <section className="house" id="casa" aria-labelledby="house-title">
            <div className="house__text">
              <h2 id="house-title">{t.casa.title}</h2>
              <p>{t.casa.text}</p>
              <p className="note">{t.casa.source}</p>
            </div>
            <div className="house__photos">
              {t.casa.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`house__photo house__photo--${i}`}>
                  <span className="h-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="guests" aria-labelledby="guests-title">
            <h2 id="guests-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="guests__list">
              {t.resenas.items.map((r) => (
                <figure key={r.t}>
                  <blockquote>{r.t}</blockquote>
                  <figcaption>
                    {r.w}, <em>{kit.exampleReview.toLowerCase()}</em>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="visit" id="visita" aria-labelledby="visit-title">
            <div>
              <h2 id="visit-title">{t.visita.title}</h2>
              <p className="visit__addr">{t.visita.address}</p>
              <p className="visit__metro">{t.visita.metro}</p>
              <dl>
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>
                    <a href="#visita" onClick={demoAction(kit, 'call')}>
                      936 399 088
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.hours}</dt>
                  <dd>{t.visita.hoursText}</dd>
                </div>
              </dl>
              <p className="note">{t.visita.hoursSource}</p>
            </div>
            <MapEmbed className="visit__map" query="Debut restaurant, Carrer de Lleida 32, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="book" id="reservar" tabIndex={-1} aria-labelledby="book-title">
            <h2 id="book-title">{t.reserva.title}</h2>
            <p>{t.reserva.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'date', 'time', 'people']} submitLabel={t.reserva.submit} />
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
