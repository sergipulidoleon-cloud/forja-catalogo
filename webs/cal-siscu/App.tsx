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
const SIGN = ['C', 'A', 'L', ' ', 'S', 'Í', 'S', 'C', 'U'];
// Non-uniform delays: the brush slows down as it reaches the end of the board.
const DELAYS = [0, 60, 110, 0, 190, 240, 300, 350, 420];

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    gsap.fromTo('.story__rail-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.story__list', start: 'top 70%', end: 'bottom 60%', scrub: true } });
    gsap.utils.toArray<HTMLElement>('.story__step').forEach((el) => {
      gsap.fromTo(el, { x: 28 }, { x: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 55%', scrub: true } });
    });
  });

  const reservar = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('reserva')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root} className="page">
        <SkipLink kit={kit} />
        <Cursor size={16} />
        <header className="bar">
          <a className="bar__brand" href="#contenido">
            Cal Síscu
          </a>
          <nav className="bar__nav" aria-label="Principal">
            <a href="#carta">{t.nav.carta}</a>
            <a href="#historia">{t.nav.historia}</a>
            <a href="#visita">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
          <a className="bar__cta" href="#reserva" onClick={reservar}>
            {t.nav.reservar}
          </a>
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="hero-title">
            <div className="sign">
              <h1 id="hero-title" className="sign__name" aria-label="Cal Síscu">
                {SIGN.map((ch, i) =>
                  ch === ' ' ? (
                    <span key={i} className="sign__gap" aria-hidden="true" />
                  ) : (
                    <span key={i} className="sign__ch" aria-hidden="true" style={{ animationDelay: `${DELAYS[i] + 150}ms` }}>
                      {ch}
                    </span>
                  ),
                )}
              </h1>
              <p className="sign__since">{t.hero.since}</p>
            </div>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
            <div className="hero__foot">
              <p className="hero__lead">{t.hero.lead}</p>
              <div className="hero__cta">
                <m.a className="btn btn--brass" href="#reserva" onClick={reservar} whileTap={{ scale: 0.97 }} data-cursor={t.nav.reservar}>
                  {t.hero.reservar}
                </m.a>
                <m.button type="button" className="btn btn--line" onClick={demoAction(kit, 'call')} whileTap={{ scale: 0.97 }}>
                  {t.hero.llamar}
                </m.button>
              </div>
            </div>
          </section>

          <section className="board" id="carta" aria-labelledby="carta-title">
            <div className="board__head">
              <h2 id="carta-title">{t.carta.title}</h2>
              <p>{t.carta.intro}</p>
            </div>
            <div className="board__cols">
              {t.carta.groups.map((g) => (
                <div key={g.name} className="board__group">
                  <h3>{g.name}</h3>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it}>
                        <span>{it}</span>
                        <span className="board__dots" aria-hidden="true" />
                        <span className="board__price">{t.carta.market}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="note">{kit.examplesNote}</p>
          </section>

          <section className="story" id="historia" aria-labelledby="story-title">
            <h2 id="story-title">{t.historia.title}</h2>
            <div className="story__list">
              <span className="story__rail" aria-hidden="true">
                <span className="story__rail-fill" />
              </span>
              <ol>
                {t.historia.steps.map((s) => (
                  <li key={s.year} className="story__step">
                    <p className="story__year">{s.year}</p>
                    <p>{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="note">{t.historia.source}</p>
          </section>

          <section className="gallery" aria-labelledby="gal-title">
            <h2 id="gal-title" className="kit-sr">
              {t.galeria.title}
            </h2>
            {t.galeria.photos.map((c, i) => (
              <PhotoSlot key={c} kit={kit} caption={c} className={`gallery__item gallery__item--${i}`}>
                <span className="g-art" />
              </PhotoSlot>
            ))}
          </section>

          <section className="voices" aria-labelledby="voices-title">
            <h2 id="voices-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="voices__list">
              {t.resenas.items.map((r) => (
                <figure key={r.text} className="voice">
                  <blockquote>“{r.text}”</blockquote>
                  <figcaption>
                    {r.who} <span className="voice__badge">{kit.exampleReview}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="visit" id="visita" aria-labelledby="visit-title">
            <div className="visit__info">
              <h2 id="visit-title">{t.visita.title}</h2>
              <p className="visit__address">{t.visita.address}</p>
              <p className="note">{t.visita.addressNote}</p>
              <p className="visit__metro">{t.visita.metro}</p>
              <dl className="visit__dl">
                <div>
                  <dt>{t.visita.hours}</dt>
                  <dd>{kit.hoursPending}</dd>
                </div>
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>{t.visita.phonePending}</dd>
                </div>
              </dl>
              <m.button type="button" className="btn btn--brass" onClick={demoAction(kit, 'whatsapp')} whileTap={{ scale: 0.97 }}>
                WhatsApp
              </m.button>
            </div>
            <MapEmbed className="visit__map" query="Cal Siscu, Carrer del Doctor Martí i Julià, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="reserve" id="reserva" tabIndex={-1} aria-labelledby="res-title">
            <div>
              <h2 id="res-title">{t.reserva.title}</h2>
              <p>{t.reserva.text}</p>
            </div>
            <BookingForm kit={kit} fields={['name', 'phone', 'date', 'time', 'people']} submitLabel={t.reserva.submit} />
          </section>
        </main>

        <footer className="foot">
          <p className="foot__name">{t.footer}</p>
          <DemoNote kit={kit} />
          <ModelCredit kit={kit} title="Lobster" author="Ant Gregory" url="https://sketchfab.com/3d-models/3ab14e5ce84141cda62c3405d8086157" />
        </footer>
        <DemoTag kit={kit} />
        <Toaster />
      </div>
    </LazyMotion>
  );
}
