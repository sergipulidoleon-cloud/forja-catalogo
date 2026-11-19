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
const FLAGS = ['#d6246e', '#f6a21e', '#0e9aa7', '#fff6e0', '#d6246e', '#0e9aa7', '#f6a21e', '#fff6e0', '#d6246e', '#f6a21e', '#0e9aa7', '#d6246e'];
const TILT = [-2, 1.5, -1, 2.2, -1.6, 1];

function PapelPicado() {
  return (
    <div className="picado" aria-hidden="true">
      <svg className="picado__string" viewBox="0 0 1200 20" preserveAspectRatio="none">
        <path d="M0 6 Q 600 22 1200 6" />
      </svg>
      <div className="picado__flags">
        {FLAGS.map((c, i) => (
          <span key={i} className="picado__flag" style={{ ['--c' as string]: c, ['--d' as string]: `${2.6 + (i % 4) * 0.45}s`, ['--o' as string]: `${(i * 0.37) % 1.5}s` }}>
            <svg viewBox="0 0 60 72">
              <path
                fillRule="evenodd"
                d="M0 0H60V60L54 72 48 60 42 72 36 60 30 72 24 60 18 72 12 60 6 72 0 60Z M30 14a10 10 0 1 0 0.1 0Z M12 40h8v8h-8Z M40 40h8v8h-8Z M26 44l4-6 4 6-4 6Z"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // Cards are dealt onto the table as the section arrives, a little out of order.
    gsap.fromTo(
      '.loteria__card',
      { y: 60, rotate: (i: number) => TILT[i % TILT.length] * 3 },
      {
        y: 0,
        rotate: (i: number) => TILT[i % TILT.length],
        ease: 'none',
        stagger: { each: 0.08, from: 'random' },
        scrollTrigger: { trigger: '.loteria__grid', start: 'top 90%', end: 'top 45%', scrub: true },
      },
    );
  });

  const reservar = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('reservar')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={18} />
        <PapelPicado />
        <header className="head">
          <a href="#contenido" className="head__brand">
            Graciela
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#carta">{t.nav.carta}</a>
            <a href="#fonda">{t.nav.fonda}</a>
            <a href="#visita">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <div className="hero__text">
              <h1 id="h1">{t.hero.title}</h1>
              <p className="hero__lead">{t.hero.lead}</p>
              <div className="hero__cta">
                <m.a className="btn btn--oro" href="#reservar" onClick={reservar} whileTap={{ scale: 0.96 }} whileHover={reduced ? undefined : { rotate: -1.5 }} data-cursor="¡Va!">
                  {t.hero.reservar}
                </m.a>
                <m.button type="button" className="btn btn--masa" onClick={demoAction(kit, 'whatsapp')} whileTap={{ scale: 0.96 }}>
                  {t.hero.whatsapp}
                </m.button>
              </div>
            </div>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
          </section>

          <section className="loteria" id="carta" aria-labelledby="lot-title">
            <div className="loteria__head">
              <h2 id="lot-title">{t.carta.title}</h2>
              <p>{t.carta.intro}</p>
            </div>
            <ul className="loteria__grid">
              {t.carta.cards.map((c, i) => (
                <li key={c.n} className={`loteria__card tone-${c.tone}`} style={{ rotate: `${TILT[i % TILT.length]}deg` }}>
                  <span className="loteria__n" aria-hidden="true">
                    {c.n}
                  </span>
                  <span className={`loteria__art art-${i}`} aria-hidden="true" />
                  <h3>{c.name}</h3>
                  <p>{c.d}</p>
                  <p className="loteria__price">{kit.priceOnRequest}</p>
                </li>
              ))}
            </ul>
            <p className="note">{kit.examplesNote}</p>
          </section>

          <section className="fonda" id="fonda" aria-labelledby="fonda-title">
            <h2 id="fonda-title">{t.fonda.title}</h2>
            <p>{t.fonda.text}</p>
            <div className="fonda__photos">
              {t.fonda.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`fonda__photo fonda__photo--${i}`}>
                  <span className="f-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="mesa" aria-labelledby="mesa-title">
            <h2 id="mesa-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="mesa__list">
              {t.resenas.items.map((r, i) => (
                <figure key={r.t} className={`mesa__item mesa__item--${i}`}>
                  <span className="mesa__badge">{kit.exampleReview}</span>
                  <blockquote>{r.t}</blockquote>
                  <figcaption>{r.w}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="visita" id="visita" aria-labelledby="visita-title">
            <div>
              <h2 id="visita-title">{t.visita.title}</h2>
              <p className="visita__addr">{t.visita.address}</p>
              <dl>
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>
                    <a href="#visita" onClick={demoAction(kit, 'call')}>
                      931 927 361
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
            <MapEmbed className="visita__map" query="La Cocina de Graciela, Passatge del Xiprer 5, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="reservar" id="reservar" tabIndex={-1} aria-labelledby="res-title">
            <h2 id="res-title">{t.reserva.title}</h2>
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
