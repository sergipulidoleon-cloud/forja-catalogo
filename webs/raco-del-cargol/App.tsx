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
    // The menu card unfolds onto the table as it comes into view.
    gsap.fromTo('.menu-card', { rotateX: 14, y: 40 }, { rotateX: 0, y: 0, ease: 'none', scrollTrigger: { trigger: '.menu', start: 'top 85%', end: 'top 35%', scrub: true } });
    gsap.fromTo('.trail path', { strokeDashoffset: 1200 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  });

  const reservar = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('reservar')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={10} />
        <header className="head">
          <a href="#contenido" className="head__brand">
            Racó del Cargol
          </a>
          <nav aria-label="Principal" className="head__nav">
            <a href="#carta">{t.nav.carta}</a>
            <a href="#casa">{t.nav.casa}</a>
            <a href="#visita">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <h1 id="h1">{t.hero.title}</h1>
            <p className="hero__lead">{t.hero.lead}</p>
            <div className="hero__stage">
              <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
              <svg className="trail" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 26 C 200 18, 380 32, 600 24 S 1000 18, 1200 26" />
              </svg>
            </div>
            <div className="hero__cta">
              <m.a href="#reservar" className="btn btn--saffron" onClick={reservar} whileTap={{ scale: 0.97 }} data-cursor={t.nav.reservar}>
                {t.hero.reservar}
              </m.a>
              <m.button type="button" className="btn btn--bone" onClick={demoAction(kit, 'call')} whileTap={{ scale: 0.97 }}>
                {t.hero.llamar}
              </m.button>
            </div>
          </section>

          <section className="menu" id="carta" aria-labelledby="menu-title">
            <div className="menu-card">
              <h2 id="menu-title">{t.carta.title}</h2>
              <div className="menu-card__cols">
                {t.carta.cols.map((col) => (
                  <div key={col.name}>
                    <h3>{col.name}</h3>
                    <ul>
                      {col.items.map((it) => (
                        <li key={it.n}>
                          <p className="menu-card__dish">{it.n}</p>
                          <p className="menu-card__desc">{it.d}</p>
                          <p className="menu-card__price">{kit.priceOnRequest}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="menu-card__note">{t.carta.note}</p>
            </div>
          </section>

          <section className="casa" id="casa" aria-labelledby="casa-title">
            <div className="casa__text">
              <h2 id="casa-title">{t.casa.title}</h2>
              <p>{t.casa.text}</p>
            </div>
            <div className="casa__photos">
              {t.casa.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`casa__photo casa__photo--${i}`}>
                  <span className="c-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="talk" aria-labelledby="talk-title">
            <h2 id="talk-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            {t.resenas.items.map((r) => (
              <figure key={r.t} className="talk__item">
                <blockquote>{r.t}</blockquote>
                <figcaption>
                  {r.w}, <span className="talk__badge">{kit.exampleReview.toLowerCase()}</span>
                </figcaption>
              </figure>
            ))}
          </section>

          <section className="visit" id="visita" aria-labelledby="visit-title">
            <div className="visit__card">
              <h2 id="visit-title">{t.visita.title}</h2>
              <p className="visit__address">{t.visita.address}</p>
              <p>{t.visita.metro}</p>
              <dl>
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>
                    <a href="#visita" onClick={demoAction(kit, 'call')}>
                      93 449 77 18
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.hours}</dt>
                  <dd>{kit.hoursPending}</dd>
                </div>
              </dl>
              <p className="note">{t.visita.phoneSource}</p>
              <m.button type="button" className="btn btn--saffron" onClick={demoAction(kit, 'whatsapp')} whileTap={{ scale: 0.97 }}>
                WhatsApp
              </m.button>
            </div>
            <MapEmbed className="visit__map" query="El Racó del Cargol, Carrer del Doctor Martí i Julià 54, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="book" id="reservar" tabIndex={-1} aria-labelledby="book-title">
            <h2 id="book-title">{t.reserva.title}</h2>
            <p>{t.reserva.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'date', 'time', 'people']} submitLabel={t.reserva.submit} />
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
