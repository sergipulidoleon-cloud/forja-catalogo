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
const bouncy = { type: 'spring' as const, duration: 0.4, bounce: 0.35 };

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // Group tiles hop up one after another, like hands raised in class.
    gsap.fromTo('.age', { y: 48 }, { y: 0, ease: 'back.out(2)', duration: 0.6, stagger: { each: 0.09 }, scrollTrigger: { trigger: '.ages', start: 'top 80%' } });
  });

  const prueba = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('prueba')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={18} />
        <header className="head">
          <a href="#contenido" className="head__brand" aria-label="Funnyschool">
            {'Funnyschool'.split('').map((ch, i) => (
              <span key={i} aria-hidden="true">
                {ch}
              </span>
            ))}
          </a>
          <nav className="head__nav" aria-label="Principal">
            <a href="#clases">{t.nav.clases}</a>
            <a href="#como">{t.nav.como}</a>
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
                <m.a className="btn btn--red" href="#prueba" onClick={prueba} whileTap={{ scale: 0.94 }} whileHover={reduced ? undefined : { y: -3 }} transition={bouncy} data-cursor="Hello!">
                  {t.hero.cta}
                </m.a>
                <m.button type="button" className="btn btn--white" onClick={demoAction(kit, 'whatsapp')} whileTap={{ scale: 0.94 }} transition={bouncy}>
                  {t.hero.whatsapp}
                </m.button>
              </div>
            </div>
            <div className="hero__play">
              <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
              <p className="hero__hint" aria-hidden="true">
                {t.hero.push}
              </p>
            </div>
            <span className="hero__grass" aria-hidden="true" />
          </section>

          <section className="classes" id="clases" aria-labelledby="cl-title">
            <h2 id="cl-title">{t.clases.title}</h2>
            <ul className="ages">
              {t.clases.groups.map((g) => (
                <li key={g.name} className={`age age--${g.tone}`}>
                  <p className="age__years">
                    {g.age}
                    <span>{lang === 'ca' ? ' anys' : ' años'}</span>
                  </p>
                  <h3>{g.name}</h3>
                  <p>{g.d}</p>
                </li>
              ))}
            </ul>
            <p className="note">{t.clases.note}</p>
          </section>

          <section className="how" id="como" aria-labelledby="how-title">
            <h2 id="how-title">{t.como.title}</h2>
            <dl className="how__list">
              {t.como.points.map((p) => (
                <div key={p.t}>
                  <dt>{p.t}</dt>
                  <dd>{p.d}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="room" aria-labelledby="room-title">
            <h2 id="room-title">{t.galeria.title}</h2>
            <div className="room__grid">
              {t.galeria.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`room__item room__item--${i}`}>
                  <span className="r-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="families" aria-labelledby="fam-title">
            <h2 id="fam-title">{t.resenas.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="families__list">
              {t.resenas.items.map((r) => (
                <figure key={r.t}>
                  <blockquote>{r.t}</blockquote>
                  <figcaption>
                    {r.w} <span className="families__badge">{kit.exampleReview}</span>
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
                      678 71 07 92
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.email}</dt>
                  <dd>
                    <a href="#donde" onClick={demoAction(kit, 'email')}>
                      funnyschool16@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.visita.hours}</dt>
                  <dd>{kit.hoursPending}</dd>
                </div>
              </dl>
            </div>
            <MapEmbed className="where__map" query="Funnyschool, Avinguda Mare de Déu de Bellvitge 40, L'Hospitalet de Llobregat" address={t.visita.address} kit={kit} title={t.visita.mapTitle} />
          </section>

          <section className="trial" id="prueba" tabIndex={-1} aria-labelledby="trial-title">
            <h2 id="trial-title">{t.prueba.title}</h2>
            <p>{t.prueba.text}</p>
            <BookingForm kit={kit} fields={['name', 'phone', 'note']} submitLabel={t.prueba.submit} extra={{ label: t.prueba.age, options: t.prueba.ages }} />
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
