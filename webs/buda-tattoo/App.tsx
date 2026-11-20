import { useRef, useState } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'motion/react';
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

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const root = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState(0);
  useSmoothScroll({ lerp: 0.1 });

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // An ink drop lands and spreads into the dark band behind the studio section.
    gsap.fromTo('.studio', { clipPath: 'circle(8% at 18% 0%)' }, { clipPath: 'circle(150% at 18% 0%)', ease: 'none', scrollTrigger: { trigger: '.studio', start: 'top 95%', end: 'top 25%', scrub: true } });
  });

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };
  const active = t.trabajos.filters[filter];
  const items = t.trabajos.items.map((it, i) => ({ ...it, i })).filter((it) => filter === 0 || it.c === active);

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={12} />
        <header className="head">
          <a href="#contenido" className="head__brand">
            Buda Tattoo
            <span className="seal" aria-hidden="true" />
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#trabajos">{t.nav.trabajos}</a>
            <a href="#estudio">{t.nav.estudio}</a>
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
                <m.a className="btn btn--ink" href="#cita" onClick={go('cita')} whileTap={{ scale: 0.97 }} data-cursor={t.nav.cita}>
                  {t.hero.cita}
                </m.a>
                <m.a className="btn btn--line" href="#trabajos" onClick={go('trabajos')} whileTap={{ scale: 0.97 }}>
                  {t.hero.trabajos}
                </m.a>
              </div>
            </div>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
          </section>

          <section className="works" id="trabajos" aria-labelledby="works-title">
            <div className="works__head">
              <h2 id="works-title">{t.trabajos.title}</h2>
              <p>{t.trabajos.intro}</p>
              <div className="filters" role="group" aria-label={t.trabajos.title}>
                {t.trabajos.filters.map((f, i) => (
                  <button key={f} type="button" aria-pressed={filter === i} onClick={() => setFilter(i)}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <ul className="mosaic">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.map((it) => (
                  <m.li
                    key={it.i + lang}
                    className={`mosaic__item mosaic__item--${it.i}`}
                    initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <PhotoSlot kit={kit} caption={`${it.t} (${it.c})`} className="mosaic__photo">
                      <span className={`ink-art ink-art--${it.i % 4}`} />
                    </PhotoSlot>
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>
          </section>

          <section className="studio" id="estudio" aria-labelledby="studio-title">
            <div className="studio__inner">
              <h2 id="studio-title">{t.servicios.title}</h2>
              <dl>
                {t.servicios.items.map((s) => (
                  <div key={s.n}>
                    <dt>{s.n}</dt>
                    <dd>{s.d}</dd>
                  </div>
                ))}
              </dl>
              <p className="note">{t.servicios.note}</p>
            </div>
          </section>

          <section className="skin" aria-labelledby="skin-title">
            <h2 id="skin-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            {t.resenas.items.map((r) => (
              <figure key={r.t}>
                <blockquote>{r.t}</blockquote>
                <figcaption>
                  {r.w} <span>{kit.exampleReview}</span>
                </figcaption>
              </figure>
            ))}
          </section>

          <section className="visit" id="visita" aria-labelledby="visit-title">
            <div>
              <h2 id="visit-title">{t.visita.title}</h2>
              <p className="visit__addr">{t.visita.address}</p>
              <dl className="visit__contact">
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>
                    <a href="#visita" onClick={demoAction(kit, 'call')}>
                      933 38 94 49
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.email}</dt>
                  <dd>
                    <a href="#visita" onClick={demoAction(kit, 'email')}>
                      budatattoo@gmail.com
                    </a>
                  </dd>
                </div>
              </dl>
              <h3 className="visit__hours-title">{t.visita.hours}</h3>
              <dl className="visit__hours">
                {t.visita.rows.map((r) => (
                  <div key={r.d}>
                    <dt>{r.d}</dt>
                    <dd>{r.h}</dd>
                  </div>
                ))}
              </dl>
              <p className="note">{kit.hoursFromSite}</p>
            </div>
            <MapEmbed className="visit__map" query="Buda Tattoo, Passatge de Blanchart 7, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="book" id="cita" tabIndex={-1} aria-labelledby="book-title">
            <h2 id="book-title">{t.cita.title}</h2>
            <p>{t.cita.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'note']} submitLabel={t.cita.submit} extra={{ label: t.cita.style, options: t.trabajos.filters.slice(1) }} />
          </section>
        </main>

        <footer className="foot">
          <p className="foot__name">{t.footer}</p>
          <DemoNote kit={kit} />
          <ModelCredit kit={kit} title="Damascus Coil Tattoo Machine" author="BartVanHoye" url="https://sketchfab.com/3d-models/d539b7d41c844554a5e09ea999fc9b0e" />
        </footer>
        <DemoTag kit={kit} />
        <Toaster />
      </div>
    </LazyMotion>
  );
}
