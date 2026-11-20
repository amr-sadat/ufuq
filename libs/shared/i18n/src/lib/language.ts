/** Languages the product ships with in the MVP. */
export const LANGUAGES = ['en', 'ar'] as const;

export type Language = (typeof LANGUAGES)[number];

export type TextDirection = 'ltr' | 'rtl';

export const DEFAULT_LANGUAGE: Language = 'en';

const DIRECTION_BY_LANGUAGE: Record<Language, TextDirection> = {
  en: 'ltr',
  ar: 'rtl',
};

/** Narrow an arbitrary string to a supported language. */
export function isLanguage(value: string): value is Language {
  return (LANGUAGES as readonly string[]).includes(value);
}

/** The writing direction that belongs to a language. */
export function directionFor(language: Language): TextDirection {
  return DIRECTION_BY_LANGUAGE[language];
}
