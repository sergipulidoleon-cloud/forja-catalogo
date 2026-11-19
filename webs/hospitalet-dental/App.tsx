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
const slow = { duration: 0.3, ease: [0.77, 0, 0.175, 1] as const };

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll({ lerp: 0.085 });

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // Each step brightens as the matching piece separates in the pinned implant.
    gsap.utils.toArray<HTMLElement>('.piece').forEach((el) => {
      gsap.fromTo(el, { color: 'rgb(143 155 166)' }, { color: 'rgb(232 238 242)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 70%', end: 'top 40%', scrub: true } });
    });
  });

  const cita = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('cita')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={8} />
        <header className="head">
          <a href="#contenido" className="head__brand">
            Hospitalet Dental
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#implantes">{t.nav.implantes}</a>
            <a href="#tratamientos">{t.nav.tratamientos}</a>
            <a href="#clinica">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <div className="pinned">
            <div className="pinned__flow">
              <section className="hero" aria-labelledby="h1">
                <h1 id="h1">{t.hero.title}</h1>
                <p>{t.hero.lead}</p>
                <div className="hero__cta">
                  <m.a className="btn btn--champagne" href="#cita" onClick={cita} whileTap={{ scale: 0.98 }} transition={slow} data-cursor={t.nav.cita}>
                    {t.hero.cita}
                  </m.a>
                  <m.button type="button" className="btn btn--line" onClick={demoAction(kit, 'whatsapp')} whileTap={{ scale: 0.98 }} transition={slow}>
                    {t.hero.whatsapp}
                  </m.button>
                </div>
              </section>
              <section className="pieces" id="implantes" aria-labelledby="pieces-title">
                <h2 id="pieces-title">{t.implante.title}</h2>
                <p className="pieces__intro">{t.implante.intro}</p>
                <ol>
                  {t.implante.steps.map((s, i) => (
                    <li key={s.n} className="piece">
                      <span className="piece__n" aria-hidden="true">
                        {['I', 'II', 'III'][i]}
                      </span>
                      <h3>{s.n}</h3>
                      <p>{s.d}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
            <div className="pinned__stage">
              <LazyScene className="pinned__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
            </div>
          </div>

          <section className="treat" id="tratamientos" aria-labelledby="treat-title">
            <h2 id="treat-title">{t.tratamientos.title}</h2>
            <ul>
              {t.tratamientos.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <p className="note">{t.tratamientos.note}</p>
          </section>

          <section className="gallery" aria-label={t.galeria.title}>
            {t.galeria.photos.map((c, i) => (
              <PhotoSlot key={c} kit={kit} caption={c} className={`gallery__item gallery__item--${i}`}>
                <span className="g-art" />
              </PhotoSlot>
            ))}
          </section>

          <section className="patients" aria-labelledby="pat-title">
            <h2 id="pat-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            {t.resenas.items.map((r) => (
              <figure key={r.t} className="patient">
                <blockquote>{r.t}</blockquote>
                <figcaption>
                  {r.w}
                  <span>{kit.exampleReview}</span>
                </figcaption>
              </figure>
            ))}
          </section>

          <section className="clinic" id="clinica" aria-labelledby="clinic-title">
            <div>
              <h2 id="clinic-title">{t.visita.title}</h2>
              <p className="clinic__addr">{t.visita.address}</p>
              <dl>
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>
                    <a href="#clinica" onClick={demoAction(kit, 'call')}>
                      93 338 81 63
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.mobile}</dt>
                  <dd>
                    <a href="#clinica" onClick={demoAction(kit, 'whatsapp')}>
                      606 289 922
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.email}</dt>
                  <dd>
                    <a href="#clinica" onClick={demoAction(kit, 'email')}>
                      Hola@HospitaletDental.es
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.hours}</dt>
                  <dd>{kit.hoursPending}</dd>
                </div>
              </dl>
            </div>
            <MapEmbed className="clinic__map" query="Hospitalet Dental, Carrer dels Castillejos 10, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="book" id="cita" tabIndex={-1} aria-labelledby="book-title">
            <div>
              <h2 id="book-title">{t.cita.title}</h2>
              <p>{t.cita.text}</p>
            </div>
            <BookingForm kit={kit} fields={['name', 'phone', 'date', 'note']} submitLabel={t.cita.submit} />
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
