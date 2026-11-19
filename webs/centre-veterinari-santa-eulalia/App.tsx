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
const soft = { type: 'spring' as const, duration: 0.4, bounce: 0.2 };

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // The green blob behind the services breathes out as you reach it.
    gsap.fromTo('.services__blob', { scale: 0.9, borderRadius: '140px 220px 160px 240px / 160px 120px 220px 140px' }, { scale: 1, borderRadius: '220px 140px 240px 160px / 120px 200px 140px 220px', ease: 'none', scrollTrigger: { trigger: '.services', start: 'top 90%', end: 'center 50%', scrub: true } });
  });

  const cita = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('cita')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={14} />
        <div className="urgent" role="note">
          <p>{t.bar.urgent}</p>
          <button type="button" onClick={demoAction(kit, 'call')}>
            {t.bar.call}
          </button>
        </div>
        <header className="head">
          <a href="#contenido" className="head__brand">
            <span className="head__paw" aria-hidden="true" />
            Centre Veterinari Santa Eulàlia
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#servicios">{t.nav.servicios}</a>
            <a href="#clinica">{t.nav.equipo}</a>
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
                <m.a className="btn btn--leaf" href="#cita" onClick={cita} whileTap={{ scale: 0.96 }} transition={soft} data-cursor={t.nav.cita}>
                  {t.hero.cita}
                </m.a>
                <m.button type="button" className="btn btn--peach" onClick={demoAction(kit, 'whatsapp')} whileTap={{ scale: 0.96 }} transition={soft}>
                  {t.hero.whatsapp}
                </m.button>
              </div>
            </div>
            <div className="hero__stage">
              <span className="hero__blob" aria-hidden="true" />
              <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
            </div>
          </section>

          <section className="services" id="servicios" aria-labelledby="svc-title">
            <span className="services__blob" aria-hidden="true" />
            <h2 id="svc-title">{t.servicios.title}</h2>
            <ul>
              {t.servicios.items.map((s) => (
                <li key={s.n}>
                  <h3>{s.n}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ul>
            <p className="note">{kit.examplesNote}</p>
          </section>

          <section className="clinic" id="clinica" aria-labelledby="clinic-title">
            <div>
              <h2 id="clinic-title">{t.clinica.title}</h2>
              <p>{t.clinica.text}</p>
            </div>
            <div className="clinic__photos">
              {t.clinica.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`clinic__photo clinic__photo--${i}`}>
                  <span className="v-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="voices" aria-labelledby="voices-title">
            <h2 id="voices-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="voices__list">
              {t.resenas.items.map((r) => (
                <figure key={r.t}>
                  <blockquote>{r.t}</blockquote>
                  <figcaption>
                    {r.w} <span>{kit.exampleReview}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="visit" id="visita" aria-labelledby="visit-title">
            <div className="visit__card">
              <h2 id="visit-title">{t.visita.title}</h2>
              <p className="visit__addr">{t.visita.address}</p>
              <dl>
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>
                    <a href="#visita" onClick={demoAction(kit, 'call')}>
                      934 220 759
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.hours}</dt>
                  <dd>{kit.hoursPending}</dd>
                </div>
              </dl>
              <p className="note">{t.visita.phoneNote}</p>
            </div>
            <MapEmbed className="visit__map" query="Centre Veterinari Santa Eulàlia, Carrer d'Àngel Guimerà 75, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="book" id="cita" tabIndex={-1} aria-labelledby="book-title">
            <h2 id="book-title">{t.cita.title}</h2>
            <p>{t.cita.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'date', 'note']} submitLabel={t.cita.submit} extra={{ label: t.cita.pet, options: t.cita.pets }} />
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
