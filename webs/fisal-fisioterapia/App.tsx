import { useRef, useState } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'motion/react';
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
const stretch = { type: 'spring' as const, duration: 0.5, bounce: 0.15 };

function Body({ active, zones }: { active: string; zones: { id: string; y: number }[] }) {
  return (
    <svg className="body" viewBox="0 0 120 240" aria-hidden="true">
      <g className="body__shape">
        <circle cx="60" cy="22" r="15" />
        <path d="M44 40 h32 q14 4 18 22 l8 46 q1 6-5 7 l-6 0-8-42 v68 l6 86 q0 8-8 8 h-4 q-6 0-7-7 l-8-78 l-8 78 q-1 7-7 7 h-4 q-8 0-8-8 l6-86 v-68 l-8 42 -6 0 q-6-1-5-7 l8-46 q4-18 18-22z" />
      </g>
      <line x1="60" y1="36" x2="60" y2="118" className="body__spine" />
      {zones.map((z) => (
        <circle key={z.id} className="body__dot" data-on={active === z.id || undefined} cx={z.id === 'hombro' ? 82 : z.id === 'rodilla' || z.id === 'tobillo' ? 70 : 60} cy={(z.y / 100) * 240} r="6" />
      ))}
    </svg>
  );
}

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const root = useRef<HTMLDivElement>(null);
  const [zone, setZone] = useState('lumbar');
  useSmoothScroll();

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    gsap.fromTo('.areas li', { x: -30 }, { x: 0, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: '.areas', start: 'top 90%', end: 'top 55%', scrub: true } });
  });

  const cita = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('cita')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };
  const current = t.zonas.items.find((z) => z.id === zone) ?? t.zonas.items[0];

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={12} />
        <header className="head">
          <a href="#contenido" className="head__brand">
            FISAL
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#zonas">{t.nav.zonas}</a>
            <a href="#equipo">{t.nav.equipo}</a>
            <a href="#centro">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <div className="hero__text">
              <h1 id="h1">{t.hero.title}</h1>
              <p>{t.hero.lead}</p>
              <div className="hero__cta">
                <m.a className="btn btn--blue" href="#cita" onClick={cita} whileTap={{ scale: 0.97 }} transition={stretch} data-cursor={t.nav.cita}>
                  {t.hero.cita}
                </m.a>
                <m.button type="button" className="btn btn--coral" onClick={demoAction(kit, 'email')} whileTap={{ scale: 0.97 }} transition={stretch}>
                  {t.hero.escribir}
                </m.button>
              </div>
            </div>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
          </section>

          <section className="zones" id="zonas" aria-labelledby="zones-title">
            <div className="zones__head">
              <h2 id="zones-title">{t.zonas.title}</h2>
              <p>{t.zonas.intro}</p>
            </div>
            <div className="zones__body">
              <Body active={zone} zones={t.zonas.items} />
              <div>
                <div className="zones__pick" role="group" aria-label={t.zonas.title}>
                  {t.zonas.items.map((z) => (
                    <button key={z.id} type="button" aria-pressed={zone === z.id} onClick={() => setZone(z.id)} onMouseEnter={() => setZone(z.id)}>
                      {z.n}
                    </button>
                  ))}
                </div>
                <div className="zones__detail" aria-live="polite">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <m.div key={current.id + lang} initial={{ opacity: 0, x: reduced ? 0 : 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : -8 }} transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
                      <h3>{current.n}</h3>
                      <p>{current.d}</p>
                    </m.div>
                  </AnimatePresence>
                </div>
                <p className="note">{t.zonas.note}</p>
              </div>
            </div>
          </section>

          <section className="team" id="equipo" aria-labelledby="team-title">
            <div className="team__text">
              <h2 id="team-title">{t.equipo.title}</h2>
              <p>{t.equipo.text}</p>
              <ul className="areas">
                {t.equipo.areas.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <p className="note">{t.equipo.source}</p>
            </div>
            <div className="team__photos">
              {t.equipo.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`team__photo team__photo--${i}`}>
                  <span className="f-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="patients" aria-labelledby="pat-title">
            <h2 id="pat-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="patients__list">
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

          <section className="center" id="centro" aria-labelledby="center-title">
            <div>
              <h2 id="center-title">{t.visita.title}</h2>
              <p className="center__addr">{t.visita.address}</p>
              <dl>
                <div>
                  <dt>{t.visita.email}</dt>
                  <dd>
                    <a href="#centro" onClick={demoAction(kit, 'email')}>
                      info@fisioterapiafisal.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>{t.visita.phonePending}</dd>
                </div>
                <div>
                  <dt>{t.visita.hours}</dt>
                  <dd>{kit.hoursPending}</dd>
                </div>
              </dl>
            </div>
            <MapEmbed className="center__map" query="FISAL Fisioterapia, Rambla de la Marina 187, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="book" id="cita" tabIndex={-1} aria-labelledby="book-title">
            <h2 id="book-title">{t.cita.title}</h2>
            <p>{t.cita.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'date', 'note']} submitLabel={t.cita.submit} extra={{ label: t.cita.area, options: t.equipo.areas }} />
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
