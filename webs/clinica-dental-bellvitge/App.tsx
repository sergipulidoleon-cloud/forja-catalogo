import { useRef, useState } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'motion/react';
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

/* Upper arch: 16 teeth laid on an elliptical arc; molars wider than incisors. */
const ARCH = Array.from({ length: 16 }, (_, i) => {
  const t = i / 15;
  const a = Math.PI * (0.06 + 0.88 * t);
  const cx = 200 - Math.cos(a) * 165;
  const cy = 210 - Math.sin(a) * 170;
  const fromCenter = Math.abs(t - 0.5) * 2; // 0 at incisors, 1 at molars
  const w = 16 + fromCenter * 16;
  const h = 26 + fromCenter * 4;
  const rot = (a * 180) / Math.PI - 90;
  return { cx, cy, w, h, rot };
});

function Odontogram({ highlight }: { highlight: number[] }) {
  return (
    <svg className="arch" viewBox="0 0 400 240" aria-hidden="true">
      <path className="arch__gum" d="M30 205 C 40 40, 360 40, 370 205" />
      {ARCH.map((tooth, i) => (
        <rect
          key={i}
          className="arch__tooth"
          data-on={highlight.includes(i) || undefined}
          x={tooth.cx - tooth.w / 2}
          y={tooth.cy - tooth.h / 2}
          width={tooth.w}
          height={tooth.h}
          rx={tooth.w * 0.42}
          transform={`rotate(${tooth.rot} ${tooth.cx} ${tooth.cy})`}
          style={{ transitionDelay: `${Math.abs(i - 7.5) * 18}ms` }}
        />
      ))}
    </svg>
  );
}

export default function App() {
  const { t, kit, lang, setLang } = useI18n();
  const reduced = useReducedMotionPref();
  const [active, setActive] = useState('perio');
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  useScrollScene(root, ({ reduced }) => {
    if (reduced) return;
    // The hero molar recedes as the page moves on; the gum line of the arch draws itself in.
    gsap.to('.hero__scene', {
      yPercent: 12,
      scale: 0.92,
      opacity: 0.55,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.fromTo(
      '.arch__gum',
      { strokeDashoffset: 520 },
      { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.treat', start: 'top 80%', end: 'top 30%', scrub: true } },
    );
  });

  const current = t.treatments.items.find((i) => i.id === active) ?? t.treatments.items[0];
  const wa = demoAction(kit, 'whatsapp');
  const book = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('cita')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root}>
        <SkipLink kit={kit} />
        <Cursor size={12} />
        <header className="top">
          <a className="brand" href="#contenido" aria-label="Clínica Dental Bellvitge">
            <span className="brand__mark" aria-hidden="true" />
            <span>Clínica Dental Bellvitge</span>
          </a>
          <nav className="top__nav" aria-label="Principal">
            <a href="#tratamientos">{t.nav.treatments}</a>
            <a href="#clinica">{t.nav.clinic}</a>
            <a href="#horario">{t.nav.hours}</a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} kit={kit} />
          <a className="btn btn--small" href="#cita" onClick={book}>
            {t.nav.book}
          </a>
        </header>

        <main id="contenido" tabIndex={-1}>
          <section className="hero">
            <div className="hero__text">
              <h1>{t.hero.title}</h1>
              <p className="hero__lead">{t.hero.lead}</p>
              <div className="hero__cta">
                <m.a className="btn" href="#cita" onClick={book} whileTap={{ scale: 0.97 }} data-cursor={t.nav.book}>
                  {t.hero.book}
                </m.a>
                <m.a className="btn btn--ghost" href="#contacto" onClick={wa} whileTap={{ scale: 0.97 }}>
                  {t.hero.whatsapp}
                </m.a>
              </div>
            </div>
            <LazyScene className="hero__scene" load={loadScene} poster={poster} posterAlt={t.hero.sceneAlt} kit={kit} reduced={reduced} />
          </section>

          <section className="treat" id="tratamientos" aria-labelledby="treat-title">
            <div className="treat__head">
              <h2 id="treat-title">{t.treatments.title}</h2>
              <p>{t.treatments.intro}</p>
            </div>
            <div className="treat__body">
              <ul className="treat__list">
                {t.treatments.items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="treat__item"
                      aria-pressed={active === item.id}
                      onMouseEnter={() => setActive(item.id)}
                      onFocus={() => setActive(item.id)}
                      onClick={() => setActive(item.id)}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="treat__visual">
                <Odontogram highlight={current.teeth} />
                <div className="treat__detail" aria-live="polite">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <m.div
                      key={current.id + lang}
                      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, filter: 'blur(3px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6, filter: 'blur(3px)' }}
                      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <h3>{current.name}</h3>
                      <p>{current.text}</p>
                    </m.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <p className="note">{kit.examplesNote}</p>
          </section>

          <section className="clinic" id="clinica" aria-labelledby="clinic-title">
            <div className="clinic__text">
              <h2 id="clinic-title">{t.clinic.title}</h2>
              <p>{t.clinic.text}</p>
            </div>
            <div className="clinic__photos">
              {t.clinic.photos.map((c, i) => (
                <PhotoSlot key={c} kit={kit} caption={c} className={`clinic__photo clinic__photo--${i}`}>
                  <span className="photo-art" />
                </PhotoSlot>
              ))}
            </div>
          </section>

          <section className="reviews" aria-labelledby="rev-title">
            <h2 id="rev-title">{t.reviews.title}</h2>
            <p className="note">{kit.exampleReviewsNote}</p>
            <div className="reviews__list">
              {t.reviews.items.map((r) => (
                <figure key={r.text} className="review">
                  <span className="review__badge">{kit.exampleReview}</span>
                  <blockquote>{r.text}</blockquote>
                  <figcaption>{r.who}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="visit" id="contacto" aria-labelledby="visit-title">
            <div className="visit__info">
              <h2 id="visit-title">{t.contact.title}</h2>
              <p className="visit__address">{t.contact.address}</p>
              <div id="horario" className="hours">
                <h3>{t.hours.title}</h3>
                <dl>
                  {t.hours.rows.map((r) => (
                    <div key={r.day}>
                      <dt>{r.day}</dt>
                      <dd>{r.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="note">{kit.hoursFromSite}</p>
              </div>
              <dl className="contact">
                <div>
                  <dt>{t.contact.phone}</dt>
                  <dd>
                    <a href="#contacto" onClick={demoAction(kit, 'call')}>
                      630 447 825
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.contact.email}</dt>
                  <dd>
                    <a href="#contacto" onClick={demoAction(kit, 'email')}>
                      recepcion@dentalbellvitge.com
                    </a>
                  </dd>
                </div>
              </dl>
              <m.button type="button" className="btn btn--whatsapp" onClick={wa} whileTap={{ scale: 0.97 }}>
                {t.contact.whatsapp}
              </m.button>
            </div>
            <MapEmbed
              className="visit__map"
              query="Clínica Dental Bellvitge, Av. Mare de Déu de Bellvitge 68, L'Hospitalet de Llobregat"
              address={t.contact.address}
              kit={kit}
              title={t.contact.mapTitle}
            />
          </section>

          <section className="book" id="cita" tabIndex={-1} aria-labelledby="book-title">
            <div>
              <h2 id="book-title">{t.book.title}</h2>
              <p>{t.book.text}</p>
            </div>
            <BookingForm kit={kit} fields={['name', 'phone', 'date', 'note']} submitLabel={t.book.submit} extra={{ label: t.book.reason, options: t.book.reasons }} />
          </section>
        </main>

        <footer className="foot">
          <p className="foot__name">{t.footer.rights}</p>
          <DemoNote kit={kit} />
          <ModelCredit kit={kit} title="Mandibular First Molar" author="University of Dundee, School of Dentistry" url="https://sketchfab.com/3d-models/e1c919d6603846eca873154eeededdd6" />
        </footer>
        <DemoTag kit={kit} />
        <Toaster />
      </div>
    </LazyMotion>
  );
}
