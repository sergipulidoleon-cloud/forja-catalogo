import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { kitStrings, type KitStrings } from './strings';

export type Lang = 'es' | 'ca';

type Ctx<T> = { lang: Lang; setLang: (l: Lang) => void; t: T; kit: KitStrings };

const STORAGE_KEY = 'demo-lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'ca') return saved;
  } catch {
    /* storage unavailable: fall back to the browser language */
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'es';
  return nav.startsWith('ca') ? 'ca' : 'es';
}

/**
 * Creates a typed language context for one demo. Each site passes its own
 * dictionary; the kit strings (demo notices, map, toasts) come along for free.
 */
export function createI18n<T>(dict: Record<Lang, T>) {
  const LangContext = createContext<Ctx<T> | null>(null);

  function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(initialLang);

    const setLang = useCallback((l: Lang) => {
      setLangState(l);
      try {
        localStorage.setItem(STORAGE_KEY, l);
      } catch {
        /* ignore */
      }
    }, []);

    useEffect(() => {
      document.documentElement.lang = lang;
    }, [lang]);

    const value = useMemo(() => ({ lang, setLang, t: dict[lang], kit: kitStrings[lang] }), [lang, setLang]);
    return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
  }

  function useI18n() {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error('useI18n must be used inside LangProvider');
    return ctx;
  }

  return { LangProvider, useI18n };
}
