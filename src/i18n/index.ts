import en from './en.json';
import es from './es.json';

export type Locale = 'en' | 'es';

const dictionaries: Record<Locale, typeof en> = { en, es };

export function getLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith('/es') ? 'es' : 'en';
}

export function getLocalePrefix(locale: Locale): string {
  return locale === 'es' ? '/es' : '';
}

export function t(locale: Locale): typeof en {
  return dictionaries[locale] || dictionaries.en;
}

export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const currentLocale = getLocaleFromPath(pathname);
  if (currentLocale === targetLocale) return pathname;

  let path = pathname;
  // Strip current locale prefix
  if (currentLocale === 'es') {
    path = path.replace(/^\/es/, '') || '/';
  }
  // Add target locale prefix
  if (targetLocale === 'es') {
    path = '/es' + (path === '/' ? '' : path);
  }
  return path;
}
