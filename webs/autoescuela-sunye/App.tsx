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
  useSmoothScroll();

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // The centre line of the page "road" scrolls by like tarmac under the car.
    gsap.to('.lane', { backgroundPositionY: '+=600px', ease: 'none', scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: true } });
    gsap.fromTo('.route__bar', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.route', start: 'top 75%', end: 'bottom 60%', scrub: true } });
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
        <span className="lane" aria-hidden="true" />
        <header className="head">
          <a href="#contenido" className="head__brand">
            <span className="head__l" aria-hidden="true">
              L
            </span>
            Autoescuela Sunyé
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#permisos">{t.nav.permisos}</a>
            <a href="#como">{t.nav.como}</a>
            <a href="#donde">{t.nav.visita}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero" aria-labelledby="h1">
            <div className="hero__text">
              <p className="hero__since">1979</p>
              <h1 id="h1">{t.hero.title}</h1>
              <p className="hero__lead">{t.hero.lead}</p>
              <div className="hero__cta">
                <m.a className="btn btn--yellow" href="#matricula" onClick={go} whileTap={{ scale: 0.97 }} data-cursor="GO">
                  {t.hero.cta}
                </m.a>
                <m.button type="button" className="btn btn--blue" onClick={demoAction(kit, 'call')} whileTap={{ scale: 0.97 }}>
                  {t.hero.call}
                </m.button>
              </div>
            </div>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
          </section>

          <section className="permits" id="permisos" aria-labelledby="permits-title">
            <h2 id="permits-title">{t.permisos.title}</h2>
            <p className="permits__intro">{t.permisos.intro}</p>
            <ul className="signs">
              {t.permisos.items.map((p) => (
                <m.li key={p.code} className="sign" whileHover={reduced ? undefined : { y: -4 }} transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }}>
                  <span className={`sign__plate sign__plate--${p.shape}`} aria-hidden="true">
                    <span>{p.code}</span>
                  </span>
                  <h3>
                    {lang === 'ca' ? 'Permís' : 'Permiso'} {p.code}: {p.n}
                  </h3>
                  <p>{p.d}</p>
                </m.li>
              ))}
            </ul>
            <p className="note">{t.permisos.note}</p>
          </section>

          <section className="route" id="como" aria-labelledby="route-title">
            <h2 id="route-title">{t.como.title}</h2>
            <div className="route__map">
              <span className="route__rail" aria-hidden="true">
                <span className="route__bar" />
              </span>
              <ol>
                {t.como.steps.map((s, i) => (
                  <li key={s.n}>
                    <span className="route__km" aria-hidden="true">
                      {i + 1}
                    </span>
                    <h3>{s.n}</h3>
                    <p>{s.d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="garage" aria-labelledby="garage-title">
            <h2 id="garage-title">{t.galeria.title}</h2>
            <div className="garage__grid">
              {t.galeria.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`garage__item garage__item--${i}`}>
                  <span className="s-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="passed" aria-labelledby="passed-title">
            <h2 id="passed-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="passed__list">
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

          <section className="place" id="donde" aria-labelledby="place-title">
            <div>
              <h2 id="place-title">{t.visita.title}</h2>
              <p className="place__addr">{t.visita.address}</p>
              <dl>
                <div>
                  <dt>{t.visita.phone}</dt>
                  <dd>
                    <a href="#donde" onClick={demoAction(kit, 'call')}>
                      933 334 958
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.email}</dt>
                  <dd>
                    <a href="#donde" onClick={demoAction(kit, 'email')}>
                      info@autoescolasunye.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.hours}</dt>
                  <dd>{kit.hoursPending}</dd>
                </div>
              </dl>
            </div>
            <MapEmbed className="place__map" query="Autoescola Sunyé, Carretera de Collblanc 37, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="signup" id="matricula" tabIndex={-1} aria-labelledby="signup-title">
            <h2 id="signup-title">{t.matricula.title}</h2>
            <p>{t.matricula.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'note']} submitLabel={t.matricula.submit} extra={{ label: t.matricula.permit, options: t.permisos.items.map((p) => `${p.code}: ${p.n}`) }} />
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
