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
const ROT = [-3, 2, -1.5, 3.5, -2.5];
const snap = { type: 'spring' as const, duration: 0.3, bounce: 0.4 };

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll({ lerp: 0.14 });

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // Posters get slapped onto the wall: a quick overshoot as each one arrives.
    gsap.utils.toArray<HTMLElement>('.paste').forEach((el, i) => {
      gsap.fromTo(el, { scale: 1.08, rotate: ROT[i % ROT.length] * 2 }, { scale: 1, rotate: ROT[i % ROT.length] * 0.4, duration: 0.35, ease: 'back.out(3)', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });
  });

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root} className="wall">
        <SkipLink kit={kit} />
        <Cursor size={16} />
        <header className="head">
          <a href="#contenido" className="head__brand">
            J Jowel
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#cortes">{t.nav.cortes}</a>
            <a href="#muro">{t.nav.muro}</a>
            <a href="#donde">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <div className="hero__text">
              <h1 id="h1">{t.hero.title}</h1>
              <p className="hero__tag">{t.hero.tag}</p>
              <p className="hero__lead">{t.hero.lead}</p>
              <div className="hero__cta">
                <m.a className="btn btn--spray" href="#cita" onClick={go('cita')} whileTap={{ scale: 0.94 }} whileHover={reduced ? undefined : { rotate: -2 }} transition={snap} data-cursor="Fade?">
                  {t.hero.cita}
                </m.a>
                <m.a className="btn btn--cobalt" href="#muro" onClick={go('muro')} whileTap={{ scale: 0.94 }} transition={snap}>
                  {t.hero.ig}
                </m.a>
              </div>
            </div>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
          </section>

          <section className="cuts" id="cortes" aria-labelledby="cuts-title">
            <h2 id="cuts-title" className="spray">
              {t.cortes.title}
            </h2>
            <ul className="stickers">
              {t.cortes.items.map((c, i) => (
                <m.li key={c.n} className={`sticker sticker--${i}`} style={{ rotate: `${ROT[i]}deg` }} whileHover={reduced ? undefined : { rotate: 0, scale: 1.04 }} transition={snap}>
                  <h3>{c.n}</h3>
                  <p>{c.d}</p>
                  <p className="sticker__price">{kit.priceOnRequest}</p>
                </m.li>
              ))}
            </ul>
            <p className="note">{kit.examplesNote}</p>
          </section>

          <section className="board" id="muro" aria-labelledby="board-title">
            <h2 id="board-title" className="spray">
              {t.muro.title}
            </h2>
            <p>{t.muro.text}</p>
            <div className="board__grid">
              {t.muro.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`paste polaroid polaroid--${i}`}>
                  <span className="pol-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="notes" aria-labelledby="notes-title">
            <h2 id="notes-title" className="spray">
              {t.resenas.title}
            </h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="notes__list">
              {t.resenas.items.map((r, i) => (
                <figure key={r.t} className="paste paper" style={{ rotate: `${ROT[i + 1]}deg` }}>
                  <span className="paper__badge">{kit.exampleReview}</span>
                  <blockquote>{r.t}</blockquote>
                  <figcaption>{r.w}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="spot" id="donde" aria-labelledby="spot-title">
            <div className="paste spot__card">
              <h2 id="spot-title">{t.visita.title}</h2>
              <p className="spot__addr">{t.visita.address}</p>
              <p>{t.visita.metro}</p>
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
              <m.button type="button" className="btn btn--spray" onClick={demoAction(kit, 'whatsapp')} whileTap={{ scale: 0.94 }} transition={snap}>
                WhatsApp
              </m.button>
            </div>
            <MapEmbed className="spot__map" query="J Jowel Barber Studio, Carrer de Martí i Blasi 34, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="chair" id="cita" tabIndex={-1} aria-labelledby="chair-title">
            <h2 id="chair-title">{t.cita.title}</h2>
            <p>{t.cita.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'date', 'time']} submitLabel={t.cita.submit} extra={{ label: t.cita.service, options: t.cortes.items.map((c) => c.n) }} />
          </section>
        </main>

        <footer className="foot">
          <p className="foot__name">{t.footer}</p>
          <DemoNote kit={kit} />
          <ModelCredit kit={kit} title="Vintage Straight Razor" author="OVROO" url="https://sketchfab.com/3d-models/6810084303194949baa67eddf4c82301" />
        </footer>
        <DemoTag kit={kit} />
        <Toaster />
      </div>
    </LazyMotion>
  );
}
