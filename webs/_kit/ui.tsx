import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react';
import type { Lang } from './i18n';
import type { KitStrings } from './strings';

/* ---------------------------------------------------------------- toasts */

type Toast = { id: number; text: string };
let toasts: Toast[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function demoToast(text: string) {
  const id = nextId++;
  // Keep at most three; the newest replaces the oldest.
  toasts = [...toasts.slice(-2), { id, text }];
  emit();
  window.setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, 4200);
}

export function Toaster({ className }: { className?: string }) {
  const list = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => toasts,
    () => toasts,
  );
  return (
    <div className={`kit-toaster ${className ?? ''}`} role="status" aria-live="polite">
      {list.map((t) => (
        <p key={t.id} className="kit-toast">
          {t.text}
        </p>
      ))}
    </div>
  );
}

/** Click handler for any contact CTA in a demo: never contacts the real business. */
export function demoAction(kit: KitStrings, kind: 'whatsapp' | 'call' | 'booking' | 'email') {
  const map = { whatsapp: kit.toastWhatsapp, call: kit.toastCall, booking: kit.toastBooking, email: kit.toastEmail };
  return (e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.();
    demoToast(map[kind]);
  };
}

/* ---------------------------------------------------------------- cursor */

export function Cursor({ className, size = 14 }: { className?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('kit-has-cursor');
    let x = -100,
      y = -100,
      tx = -100,
      ty = -100,
      raf = 0,
      visible = false;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        x = tx;
        y = ty;
        el.dataset.visible = 'true';
      }
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button, summary, label, input, select, textarea');
      if (target?.matches('input, select, textarea')) {
        el.dataset.state = 'text';
        setLabel('');
      } else if (target?.dataset.cursor) {
        el.dataset.state = 'label';
        setLabel(target.dataset.cursor);
      } else if (target) {
        el.dataset.state = 'hover';
        setLabel('');
      } else {
        el.dataset.state = '';
        setLabel('');
      }
    };
    const leave = () => {
      visible = false;
      el.dataset.visible = 'false';
    };
    const down = () => (el.dataset.down = 'true');
    const up = () => (el.dataset.down = 'false');
    const loop = () => {
      const k = reduced ? 1 : 0.22;
      x += (tx - x) * k;
      y += (ty - y) * k;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.classList.remove('kit-has-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ref} className={`kit-cursor ${className ?? ''}`} style={{ ['--kit-cursor-size' as string]: `${size}px` }} aria-hidden="true">
      <span className="kit-cursor__dot" />
      <span className="kit-cursor__label">{label}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- language */

export function LangToggle({ lang, setLang, kit, className }: { lang: Lang; setLang: (l: Lang) => void; kit: KitStrings; className?: string }) {
  return (
    <div className={`kit-lang ${className ?? ''}`} role="group" aria-label={kit.langLabel} data-lang={lang}>
      <span className="kit-lang__thumb" aria-hidden="true" />
      <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')} lang="es">
        <span aria-hidden="true">ES</span>
        <span className="kit-sr">Castellano</span>
      </button>
      <button type="button" aria-pressed={lang === 'ca'} onClick={() => setLang('ca')} lang="ca">
        <span aria-hidden="true">CA</span>
        <span className="kit-sr">Català</span>
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------- map */

export function MapEmbed({ query, address, kit, className, title }: { query: string; address: string; kit: KitStrings; className?: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const q = encodeURIComponent(query);
  return (
    <div className={`kit-map ${className ?? ''}`} data-loaded={loaded || undefined}>
      {loaded ? (
        <iframe title={title} src={`https://www.google.com/maps?q=${q}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="kit-map__idle">
          <svg className="kit-map__art" viewBox="0 0 400 240" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
            <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.35">
              <path d="M-10 60 L410 20 M-10 130 L410 110 M-10 200 L410 210 M60 -10 L90 250 M170 -10 L160 250 M260 -10 L300 250 M350 -10 L330 250" />
              <path d="M-10 170 C 120 120, 240 230, 410 150" strokeWidth="5" opacity="0.6" />
            </g>
            <circle cx="205" cy="128" r="9" fill="currentColor" />
            <circle cx="205" cy="128" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          </svg>
          <p className="kit-map__address">{address}</p>
          <div className="kit-map__actions">
            <button type="button" className="kit-map__btn" onClick={() => setLoaded(true)}>
              {kit.mapLoad}
            </button>
            <a className="kit-map__link" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer">
              {kit.mapOpen}
            </a>
          </div>
          <p className="kit-map__consent">{kit.mapConsent}</p>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- demo notes */

export function DemoNote({ kit, className }: { kit: KitStrings; className?: string }) {
  return (
    <p className={`kit-demo-note ${className ?? ''}`}>
      <strong>{kit.demoNotice}.</strong> {kit.demoNoticeLong}
    </p>
  );
}

/** CC-BY attribution for the hero model, required by its licence; sits under the demo notice. */
export function ModelCredit({ kit, title, author, url, className }: { kit: KitStrings; title: string; author: string; url: string; className?: string }) {
  return (
    <p className={`kit-credit ${className ?? ''}`}>
      {kit.credit3dModel}{' '}
      <a href={url} target="_blank" rel="noopener noreferrer">
        «{title}»
      </a>{' '}
      {kit.credit3dBy} {author}, <a href="https://creativecommons.org/licenses/by/4.0/deed.es" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. {kit.credit3dLight}
    </p>
  );
}

export function DemoTag({ kit, className }: { kit: KitStrings; className?: string }) {
  return (
    <p className={`kit-demo-tag ${className ?? ''}`} aria-hidden="true">
      {kit.demoTag}
    </p>
  );
}

export function SkipLink({ kit }: { kit: KitStrings }) {
  return (
    <a className="kit-skip" href="#contenido">
      {kit.skip}
    </a>
  );
}

/* ---------------------------------------------------------------- photo slot */

export function PhotoSlot({ kit, caption, className, children, style }: { kit: KitStrings; caption: string; className?: string; children?: ReactNode; style?: React.CSSProperties }) {
  return (
    <figure className={`kit-photo ${className ?? ''}`} style={style}>
      <div className="kit-photo__art" aria-hidden="true">
        {children}
      </div>
      <figcaption>
        <span className="kit-photo__slot">{kit.photoSlot}</span>
        <span className="kit-photo__caption">{caption}</span>
      </figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------- booking form */

type Field = 'name' | 'phone' | 'date' | 'time' | 'people' | 'note';

export function BookingForm({
  kit,
  fields,
  submitLabel,
  className,
  extra,
  idPrefix = 'bk',
}: {
  kit: KitStrings;
  fields: Field[];
  submitLabel: string;
  className?: string;
  extra?: { label: string; options: string[] };
  idPrefix?: string;
}) {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const next: Record<string, boolean> = {};
    for (const f of ['name', 'phone'] as const) {
      if (!fields.includes(f)) continue;
      const input = form.elements.namedItem(f) as HTMLInputElement | null;
      if (input && !input.value.trim()) next[f] = true;
    }
    setErrors(next);
    if (Object.keys(next).length) {
      (form.elements.namedItem(Object.keys(next)[0]) as HTMLInputElement | null)?.focus();
      return;
    }
    form.reset();
    demoToast(kit.bookingSent);
  };
  const label: Record<Field, string> = { name: kit.formName, phone: kit.formPhone, date: kit.formDate, time: kit.formTime, people: kit.formPeople, note: kit.formNote };
  const type: Record<Field, string> = { name: 'text', phone: 'tel', date: 'date', time: 'time', people: 'number', note: 'text' };
  const auto: Partial<Record<Field, string>> = { name: 'name', phone: 'tel' };
  return (
    <form className={`kit-form ${className ?? ''}`} onSubmit={onSubmit} noValidate>
      {extra && (
        <div className="kit-form__field kit-form__field--wide">
          <label htmlFor={`${idPrefix}-extra`}>{extra.label}</label>
          <select id={`${idPrefix}-extra`} name="extra">
            {extra.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      )}
      {fields.map((f) => (
        <div key={f} className={`kit-form__field ${f === 'note' ? 'kit-form__field--wide' : ''}`} data-invalid={errors[f] || undefined}>
          <label htmlFor={`${idPrefix}-${f}`}>{label[f]}</label>
          {f === 'note' ? (
            <textarea id={`${idPrefix}-${f}`} name={f} rows={3} />
          ) : (
            <input
              id={`${idPrefix}-${f}`}
              name={f}
              type={type[f]}
              autoComplete={auto[f]}
              inputMode={f === 'phone' ? 'tel' : f === 'people' ? 'numeric' : undefined}
              min={f === 'people' ? 1 : undefined}
              max={f === 'people' ? 20 : undefined}
              aria-invalid={errors[f] || undefined}
              aria-describedby={errors[f] ? `${idPrefix}-${f}-err` : undefined}
            />
          )}
          {errors[f] && (
            <p className="kit-form__error" id={`${idPrefix}-${f}-err`}>
              {kit.formRequired}
            </p>
          )}
        </div>
      ))}
      <button type="submit" className="kit-form__submit">
        {submitLabel}
      </button>
    </form>
  );
}
