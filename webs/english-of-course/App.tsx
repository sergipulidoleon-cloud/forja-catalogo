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

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // The line between the two schools is drawn like a route on a tube map.
    gsap.fromTo('.line__track', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.line', start: 'top 80%', end: 'top 40%', scrub: true } });
    gsap.fromTo('.ladder li', { y: 24 }, { y: 0, ease: 'none', stagger: 0.06, scrollTrigger: { trigger: '.ladder', start: 'top 90%', end: 'top 55%', scrub: true } });
  });

  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('matricula')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={12} />
        <header className="head">
          <a href="#contenido" className="brand">
            <span className="brand__dot" aria-hidden="true" />
            English Of Course!
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#cursos">{t.nav.cursos}</a>
            <a href="#sedes">{t.nav.sedes}</a>
            <a href="#cambridge">{t.nav.cambridge}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <div className="hero__text">
              <h1 id="h1">{t.hero.title}</h1>
              <p>{t.hero.lead}</p>
              <div className="hero__cta">
                <m.a className="btn btn--red" href="#matricula" onClick={go} whileTap={{ scale: 0.97 }} data-cursor="Let's go">
                  {t.hero.cta}
                </m.a>
                <m.button type="button" className="btn btn--line" onClick={demoAction(kit, 'call')} whileTap={{ scale: 0.97 }}>
                  {t.hero.call}
                </m.button>
              </div>
            </div>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
          </section>

          <section className="courses" id="cursos" aria-labelledby="courses-title">
            <h2 id="courses-title">{t.cursos.title}</h2>
            <div className="courses__list">
              {t.cursos.items.map((c, i) => (
                <article key={c.who} className={`course course--${i}`}>
                  <h3>{c.who}</h3>
                  <p className="course__age">{c.age}</p>
                  <p>{c.d}</p>
                </article>
              ))}
            </div>
            <p className="note">{t.cursos.note}</p>
          </section>

          <section className="line" id="sedes" aria-labelledby="line-title">
            <h2 id="line-title">{t.sedes.title}</h2>
            <p className="line__hint">{t.sedes.hint}</p>
            <div className="line__map">
              <span className="line__rail" aria-hidden="true">
                <span className="line__track" />
              </span>
              <ol>
                {t.sedes.stops.map((s) => (
                  <li key={s.name} className="stop">
                    <span className="stop__dot" aria-hidden="true" />
                    <h3>{s.name}</h3>
                    <p>{s.addr}</p>
                    <p>{s.metro}</p>
                    <p>
                      <a href="#sedes" onClick={demoAction(kit, 'call')}>
                        {s.phone}
                      </a>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <dl className="line__contact">
              <div>
                <dt>{t.contacto.email}</dt>
                <dd>
                  <a href="#sedes" onClick={demoAction(kit, 'email')}>
                    englishoc.academia@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt>{t.contacto.hours}</dt>
                <dd>{kit.hoursPending}</dd>
              </div>
            </dl>
            <MapEmbed className="line__mapembed" query="English Of Course, Avinguda del Masnou 76, L'Hospitalet de Llobregat" address={t.sedes.stops[0].addr + ', L’Hospitalet de Llobregat'} kit={kit} title={t.contacto.mapTitle} />
          </section>

          <section className="cambridge" id="cambridge" aria-labelledby="cam-title">
            <div>
              <h2 id="cam-title">{t.cambridge.title}</h2>
              <p>{t.cambridge.text}</p>
            </div>
            <ol className="ladder">
              {t.cambridge.levels.map((l, i) => (
                <li key={l} style={{ ['--step' as string]: i }}>
                  {l}
                </li>
              ))}
            </ol>
          </section>

          <section className="rooms" aria-labelledby="rooms-title">
            <h2 id="rooms-title">{t.galeria.title}</h2>
            <div className="rooms__grid">
              {t.galeria.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`rooms__item rooms__item--${i}`}>
                  <span className="e-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="say" aria-labelledby="say-title">
            <h2 id="say-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="say__list">
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

          <section className="enrol" id="matricula" tabIndex={-1} aria-labelledby="enrol-title">
            <h2 id="enrol-title">{t.matricula.title}</h2>
            <p>{t.matricula.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'note']} submitLabel={t.matricula.submit} extra={{ label: t.matricula.sede, options: t.sedes.stops.map((s) => s.name) }} />
          </section>
        </main>

        <footer className="foot">
          <p className="foot__name">{t.footer}</p>
          <DemoNote kit={kit} />
          <ModelCredit kit={kit} title="Antique Globe" author="Matthew Collings" url="https://sketchfab.com/3d-models/78b47132c6be42bcb664545a69b380d9" />
        </footer>
        <DemoTag kit={kit} />
        <Toaster />
      </div>
    </LazyMotion>
  );
}
