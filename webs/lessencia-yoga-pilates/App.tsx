import { useEffect, useRef, useState } from 'react';
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

/** Breathing guide in step with the sphere: same wall clock, 4 s in and 6 s out. */
function BreathGuide({ inhale, exhale, reduced }: { inhale: string; exhale: string; reduced: boolean }) {
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const ring = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const loop = () => {
      const t = (performance.now() / 1000) % 10;
      const p = t < 4 ? 0.5 - 0.5 * Math.cos((t / 4) * Math.PI) : 0.5 + 0.5 * Math.cos(((t - 4) / 6) * Math.PI);
      if (ring.current) ring.current.style.transform = `scale(${0.6 + p * 0.4})`;
      setPhase((prev) => (t < 4 ? (prev === 'in' ? prev : 'in') : prev === 'out' ? prev : 'out'));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);
  if (reduced) return null;
  return (
    <p className="guide" aria-hidden="true">
      <span className="guide__ring" ref={ring} />
      <span className="guide__word" key={phase}>
        {phase === 'in' ? inhale : exhale}
      </span>
    </p>
  );
}

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll({ lerp: 0.06 });

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // The page dims toward dusk as you reach the timetable, like the room before savasana.
    gsap.fromTo('.dusk', { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: '.timetable', start: 'top 90%', end: 'top 30%', scrub: true } });
  });

  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('prueba')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={10} />
        <header className="head">
          <a href="#contenido" className="head__brand">
            l’Essència
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#clases">{t.nav.clases}</a>
            <a href="#horario">{t.nav.horario}</a>
            <a href="#donde">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <div className="hero__stage">
              <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
              <BreathGuide inhale={t.hero.inhale} exhale={t.hero.exhale} reduced={reduced} />
            </div>
            <h1 id="h1">{t.hero.title}</h1>
            <p className="hero__lead">{t.hero.lead}</p>
            <div className="hero__cta">
              <m.a className="btn btn--moss" href="#prueba" onClick={go} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} data-cursor="Om">
                {t.hero.cta}
              </m.a>
              <m.button type="button" className="btn btn--quiet" onClick={demoAction(kit, 'call')} whileTap={{ scale: 0.98 }}>
                {t.hero.call}
              </m.button>
            </div>
          </section>

          <section className="classes" id="clases" aria-labelledby="classes-title">
            <h2 id="classes-title">{t.clases.title}</h2>
            <dl>
              {t.clases.items.map((c) => (
                <div key={c.n}>
                  <dt>{c.n}</dt>
                  <dd>{c.d}</dd>
                </div>
              ))}
            </dl>
            <p className="note">{t.clases.note}</p>
          </section>

          <section className="timetable" id="horario" aria-labelledby="tt-title">
            <span className="dusk" aria-hidden="true" />
            <h2 id="tt-title">{t.horario.title}</h2>
            <div className="timetable__scroll">
              <table>
                <caption>{t.horario.caption}</caption>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="kit-sr">{lang === 'ca' ? 'Hora' : 'Hora'}</span>
                    </th>
                    {t.horario.days.map((d) => (
                      <th key={d} scope="col">
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.horario.rows.map((r) => (
                    <tr key={r.h}>
                      <th scope="row">{r.h}</th>
                      {r.c.map((c, i) => (
                        <td key={i} data-empty={!c || undefined}>
                          {c || <span aria-label={lang === 'ca' ? 'Sense classe' : 'Sin clase'}>–</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space" aria-labelledby="space-title">
            <h2 id="space-title">{t.espacio.title}</h2>
            <p>{t.espacio.text}</p>
            <div className="space__photos">
              {t.espacio.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`space__photo space__photo--${i}`}>
                  <span className="y-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="after" aria-labelledby="after-title">
            <h2 id="after-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            {t.resenas.items.map((r) => (
              <figure key={r.t}>
                <blockquote>{r.t}</blockquote>
                <figcaption>
                  {r.w}, <span>{kit.exampleReview.toLowerCase()}</span>
                </figcaption>
              </figure>
            ))}
          </section>

          <section className="where" id="donde" aria-labelledby="where-title">
            <h2 id="where-title">{t.visita.title}</h2>
            <p className="where__addr">{t.visita.address}</p>
            <p>
              {t.visita.phone}:{' '}
              <a href="#donde" onClick={demoAction(kit, 'call')}>
                933 38 49 32
              </a>
            </p>
            <p className="note">{t.visita.phoneNote}</p>
            <MapEmbed className="where__map" query="l'Essència Yoga Pilates, Carrer de Rodés 12, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="trial" id="prueba" tabIndex={-1} aria-labelledby="trial-title">
            <h2 id="trial-title">{t.prueba.title}</h2>
            <p>{t.prueba.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'date']} submitLabel={t.prueba.submit} extra={{ label: t.prueba.clase, options: t.clases.items.map((c) => c.n) }} />
          </section>
        </main>

        <footer className="foot">
          <p className="foot__name">{t.footer}</p>
          <DemoNote kit={kit} />
          <ModelCredit kit={kit} title="Tibetan Singing Bowl" author="JFN" url="https://sketchfab.com/3d-models/52228c0d0cb44e6cacdeb3851e0743fc" />
        </footer>
        <DemoTag kit={kit} />
        <Toaster />
      </div>
    </LazyMotion>
  );
}
