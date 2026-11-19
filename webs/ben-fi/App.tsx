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
  useSmoothScroll({ lerp: 0.08 });

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // Labels come into focus out of a soft blur, like steam clearing from a mirror.
    gsap.fromTo('.label', { filter: 'blur(6px)', y: 20 }, { filter: 'blur(0px)', y: 0, ease: 'none', stagger: 0.08, scrollTrigger: { trigger: '.labels', start: 'top 90%', end: 'top 50%', scrub: true } });
  });

  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('cita')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={10} />
        <header className="head">
          <a href="#contenido" className="head__brand">
            Ben Fi
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#tratamientos">{t.nav.tratamientos}</a>
            <a href="#claudia">{t.nav.claudia}</a>
            <a href="#donde">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <div className="hero__text">
              <h1 id="h1">{t.hero.title}</h1>
              <p>{t.hero.lead}</p>
              <div className="hero__cta">
                <m.a className="btn btn--euca" href="#cita" onClick={go} whileTap={{ scale: 0.98 }} data-cursor={t.nav.cita}>
                  {t.hero.cita}
                </m.a>
                <m.button type="button" className="btn btn--soft" onClick={demoAction(kit, 'whatsapp')} whileTap={{ scale: 0.98 }}>
                  {t.hero.whatsapp}
                </m.button>
              </div>
            </div>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
          </section>

          <section className="treat" id="tratamientos" aria-labelledby="treat-title">
            <h2 id="treat-title">{t.tratamientos.title}</h2>
            <ul className="labels">
              {t.tratamientos.items.map((it, i) => (
                <li key={it.n} className={`label label--${i}`}>
                  <span className="label__leaf" aria-hidden="true" />
                  <p className="label__for">{it.note}</p>
                  <h3>{it.n}</h3>
                  <p>{it.d}</p>
                  <p className="label__price">{kit.priceOnRequest}</p>
                </li>
              ))}
            </ul>
            <p className="note">{t.tratamientos.source}</p>
          </section>

          <section className="claudia" id="claudia" aria-labelledby="claudia-title">
            <div>
              <h2 id="claudia-title">{t.claudia.title}</h2>
              <p>{t.claudia.text}</p>
              <p className="note">{t.claudia.source}</p>
            </div>
            <div className="claudia__photos">
              {t.claudia.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`claudia__photo claudia__photo--${i}`}>
                  <span className="b-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="clients" aria-labelledby="clients-title">
            <h2 id="clients-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="clients__list">
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

          <section className="where" id="donde" aria-labelledby="where-title">
            <div>
              <h2 id="where-title">{t.visita.title}</h2>
              <p className="where__addr">{t.visita.address}</p>
              <p className="note">{t.visita.addressNote}</p>
              <dl>
                <div>
                  <dt>{t.visita.hours}</dt>
                  <dd>{kit.hoursPending}</dd>
                </div>
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>{t.visita.phonePending}</dd>
                </div>
              </dl>
            </div>
            <MapEmbed className="where__map" query="Ben Fi estética, La Florida, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="book" id="cita" tabIndex={-1} aria-labelledby="book-title">
            <h2 id="book-title">{t.cita.title}</h2>
            <p>{t.cita.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'date', 'time']} submitLabel={t.cita.submit} extra={{ label: t.cita.service, options: t.tratamientos.items.map((i) => i.n) }} />
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
