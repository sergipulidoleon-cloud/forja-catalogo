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

function Wave({ from, to, flip }: { from: string; to: string; flip?: boolean }) {
  return (
    <div className="wave" style={{ background: from }} aria-hidden="true">
      <svg viewBox="0 0 2400 80" preserveAspectRatio="none" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
        <path className="wave__path" d="M0 40 C 150 0, 300 80, 450 40 S 750 0, 900 40 S 1200 80, 1350 40 S 1650 0, 1800 40 S 2100 80, 2250 40 L 2400 40 L 2400 80 L 0 80 Z" fill={to} />
      </svg>
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
    // Every wave drifts sideways with the scroll, like the tide under the page.
    gsap.utils.toArray<SVGElement>('.wave svg').forEach((el, i) => {
      gsap.fromTo(el, { xPercent: 0 }, { xPercent: i % 2 ? 25 : -25, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });

  const reservar = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('reservar')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={14} />
        <header className="head">
          <a href="#contenido" className="head__brand">
            Mar Azul
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#carta">{t.nav.carta}</a>
            <a href="#local">{t.nav.local}</a>
            <a href="#visita">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <div className="hero__text">
              <p className="hero__sub">{t.hero.sub}</p>
              <h1 id="h1">{t.hero.title}</h1>
              <p className="hero__lead">{t.hero.lead}</p>
              <div className="hero__cta">
                <m.a className="btn btn--aji" href="#reservar" onClick={reservar} whileTap={{ scale: 0.97 }} data-cursor={t.nav.reservar}>
                  {t.hero.reservar}
                </m.a>
                <m.button type="button" className="btn btn--leche" onClick={demoAction(kit, 'whatsapp')} whileTap={{ scale: 0.97 }}>
                  {t.hero.pedir}
                </m.button>
              </div>
            </div>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
          </section>
          <Wave from="var(--pacifico)" to="var(--leche)" />

          <section className="carta" id="carta" aria-labelledby="carta-title">
            <h2 id="carta-title">{t.carta.title}</h2>
            <p className="carta__intro">{t.carta.intro}</p>
            <div className="carta__groups">
              {t.carta.groups.map((g, i) => (
                <div key={g.name} className={`carta__group carta__group--${i}`}>
                  <h3>{g.name}</h3>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it}>
                        <span>{it}</span>
                        <span className="carta__price">{kit.priceOnRequest}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          <Wave from="var(--leche)" to="var(--cebolla)" flip />

          <section className="local" id="local" aria-labelledby="local-title">
            <h2 id="local-title">{t.local.title}</h2>
            <p>{t.local.text}</p>
            <div className="local__photos">
              {t.local.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`local__photo local__photo--${i}`}>
                  <span className="lp-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>
          <Wave from="var(--cebolla)" to="var(--leche)" />

          <section className="dicen" aria-labelledby="dicen-title">
            <h2 id="dicen-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="dicen__list">
              {t.resenas.items.map((r) => (
                <figure key={r.t}>
                  <span className="dicen__badge">{kit.exampleReview}</span>
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
              <p>{t.visita.metro}</p>
              <dl>
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
            <MapEmbed className="visita__map" query="Restaurante Peruano Mar Azul, Carretera de Collblanc 50, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>
          <Wave from="var(--leche)" to="var(--pacifico)" flip />

          <section className="reserva" id="reservar" tabIndex={-1} aria-labelledby="res-title">
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
