import type { Language } from './language';

/** Copy shown in the app shell for each supported language. */
export interface AppMessages {
  readonly title: string;
  readonly intro: string;
  readonly checking: string;
  readonly connected: string;
  readonly unavailable: string;
  readonly languageLabel: string;
  readonly languageName: string;
}

export const MESSAGES: Record<Language, AppMessages> = {
  en: {
    title: 'Learning, grounded in your source.',
    intro:
      'Add a source document and explore an experience grounded in its pages.',
    checking: 'Checking API',
    connected: 'API connected',
    unavailable: 'API unavailable',
    languageLabel: 'Language',
    languageName: 'العربية',
  },
  ar: {
    title: 'تعلّمٌ متجذّر في مصدره.',
    intro: 'أضف مستندًا مصدرًا واستكشف تجربة مستندة إلى صفحاته.',
    checking: 'جارٍ التحقق من واجهة البرمجة',
    connected: 'واجهة البرمجة متصلة',
    unavailable: 'واجهة البرمجة غير متاحة',
    languageLabel: 'اللغة',
    languageName: 'English',
  },
};
