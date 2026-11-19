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

function Pole({ className }: { className?: string }) {
  return <div className={`pole ${className ?? ''}`} aria-hidden="true" />;
}

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // The mirror slides into place like a chair turning toward it.
    gsap.fromTo('.mirror', { y: 70, rotateY: -10, transformPerspective: 1200 }, { y: 0, rotateY: 0, ease: 'none', scrollTrigger: { trigger: '.mirror', start: 'top 90%', end: 'top 40%', scrub: true } });
  });

  const cita = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('cita')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };
  const serviceOptions = t.servicios.groups.flatMap((g) => g.items);

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={14} />
        <header className="top">
          <a className="top__brand" href="#contenido">
            Barber Shop
          </a>
          <nav aria-label="Principal" className="top__nav">
            <a href="#servicios">{t.nav.servicios}</a>
            <a href="#local">{t.nav.local}</a>
            <a href="#donde">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <Pole className="pole--side" />
            <div className="hero__text">
              <h1 id="h1">
                <span>Barber</span> <span>Shop</span> <span className="hero__city">Hospitalet</span>
              </h1>
              <p className="hero__sub">{t.hero.sub}</p>
              <p className="hero__lead">{t.hero.lead}</p>
              <div className="hero__cta">
                <m.a className="btn btn--brass" href="#cita" onClick={cita} whileTap={{ scale: 0.97 }} data-cursor={t.nav.cita}>
                  {t.hero.cita}
                </m.a>
                <m.button type="button" className="btn btn--bone" onClick={demoAction(kit, 'whatsapp')} whileTap={{ scale: 0.97 }}>
                  {t.hero.whatsapp}
                </m.button>
              </div>
            </div>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
          </section>

          <Pole />

          <section className="services" id="servicios" aria-labelledby="svc-title">
            <div className="mirror">
              <h2 id="svc-title">{t.servicios.title}</h2>
              <div className="mirror__cols">
                {t.servicios.groups.map((g) => (
                  <div key={g.name} className="mirror__col">
                    <h3>{g.name}</h3>
                    <ul>
                      {g.items.map((it) => (
                        <li key={it}>
                          <span>{it}</span>
                          <span className="mirror__price">{kit.priceOnRequest}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <p className="note">{kit.examplesNote}</p>
          </section>

          <section className="local" id="local" aria-labelledby="local-title">
            <div className="local__text">
              <h2 id="local-title">{t.local.title}</h2>
              <p>{t.local.text}</p>
            </div>
            <div className="local__photos">
              {t.local.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`local__photo local__photo--${i}`}>
                  <span className="l-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="clients" aria-labelledby="cl-title">
            <h2 id="cl-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <ol className="clients__list">
              {t.resenas.items.map((r) => (
                <li key={r.t}>
                  <figure>
                    <blockquote>{r.t}</blockquote>
                    <figcaption>
                      <span>{r.w}</span>
                      <span className="clients__badge">{kit.exampleReview}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ol>
          </section>

          <section className="where" id="donde" aria-labelledby="where-title">
            <div>
              <h2 id="where-title">{t.visita.title}</h2>
              <p className="where__addr">{t.visita.address}</p>
              <p className="where__metro">{t.visita.metro}</p>
              <dl>
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>
                    <a href="#donde" onClick={demoAction(kit, 'call')}>
                      617 98 59 05
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.hours}</dt>
                  <dd>{kit.hoursPending}</dd>
                </div>
              </dl>
            </div>
            <MapEmbed className="where__map" query="Barber Shop Hospitalet, Carrer de Santa Eulàlia 158, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="cita" id="cita" tabIndex={-1} aria-labelledby="cita-title">
            <div>
              <h2 id="cita-title">{t.cita.title}</h2>
              <p>{t.cita.text}</p>
            </div>
            <BookingForm kit={kit} fields={['name', 'phone', 'date', 'time']} submitLabel={t.cita.submit} extra={{ label: t.cita.service, options: serviceOptions }} />
          </section>
        </main>

        <Pole />
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
