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
  useSmoothScroll({ lerp: 0.13 });

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // Callout leaders draw out to their part labels, like annotations on a drawing.
    gsap.utils.toArray<HTMLElement>('.callout__leader').forEach((el) => {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 60%', scrub: true } });
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
        <Cursor size={10} />
        <header className="head">
          <a href="#contenido" className="head__brand">
            Talleres Ronda
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#servicios">{t.nav.servicios}</a>
            <a href="#taller">{t.nav.taller}</a>
            <a href="#donde">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <div className="hero__text">
              <p className="dim" aria-hidden="true">
                <span>Ronda de la Torrassa, 39</span>
              </p>
              <h1 id="h1">{t.hero.title}</h1>
              <p className="hero__lead">{t.hero.lead}</p>
              <div className="hero__cta">
                <m.a className="btn btn--orange" href="#cita" onClick={cita} whileTap={{ scale: 0.97 }} data-cursor="OK">
                  {t.hero.cita}
                </m.a>
                <m.button type="button" className="btn btn--line" onClick={demoAction(kit, 'call')} whileTap={{ scale: 0.97 }}>
                  {t.hero.call}
                </m.button>
              </div>
            </div>
            <div className="hero__drawing">
              <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
              <span className="hero__dim hero__dim--v" aria-hidden="true">
                Ø 96
              </span>
              <span className="hero__dim hero__dim--h" aria-hidden="true">
                170
              </span>
            </div>
          </section>

          <section className="parts" id="servicios" aria-labelledby="parts-title">
            <h2 id="parts-title">{t.servicios.title}</h2>
            <p className="parts__intro">{t.servicios.intro}</p>
            <ol className="callouts">
              {t.servicios.items.map((s, i) => (
                <li key={s.n} className="callout">
                  <span className="callout__n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="callout__leader" aria-hidden="true" />
                  <div>
                    <h3>{s.n}</h3>
                    <p>{s.d}</p>
                    <p className="callout__meta">
                      <span className="mono">{s.dim}</span> {kit.priceOnRequest}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="shop" id="taller" aria-labelledby="shop-title">
            <div>
              <h2 id="shop-title">{t.taller.title}</h2>
              <p>{t.taller.text}</p>
            </div>
            <div className="shop__grid">
              {t.taller.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`shop__item shop__item--${i}`}>
                  <span className="t-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="clients" aria-labelledby="cl-title">
            <h2 id="cl-title">{t.resenas.title}</h2>
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
              <dl>
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>
                    <a href="#donde" onClick={demoAction(kit, 'call')}>
                      934 228 018
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
            <MapEmbed className="where__map" query="Talleres Ronda, Ronda de la Torrassa 39, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="order" id="cita" tabIndex={-1} aria-labelledby="order-title">
            <h2 id="order-title">{t.cita.title}</h2>
            <p>{t.cita.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'date', 'note']} submitLabel={t.cita.submit} extra={{ label: t.cita.service, options: t.servicios.items.map((s) => s.n) }} />
          </section>
        </main>

        <footer className="foot">
          <p className="foot__name">{t.footer}</p>
          <DemoNote kit={kit} />
          <ModelCredit kit={kit} title="Adjustable Wrench" author="Poly Haven" url="https://polyhaven.com/a/adjustable_wrench" license="CC0" />
        </footer>
        <DemoTag kit={kit} />
        <Toaster />
      </div>
    </LazyMotion>
  );
}
