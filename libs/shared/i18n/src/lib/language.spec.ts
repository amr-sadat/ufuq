import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  directionFor,
  isLanguage,
} from './language';

describe('language', () => {
  it('ships English and Arabic', () => {
    expect(LANGUAGES).toEqual(['en', 'ar']);
  });

  it('defaults to English', () => {
    expect(DEFAULT_LANGUAGE).toBe('en');
  });

  it('maps languages to their writing direction', () => {
    expect(directionFor('en')).toBe('ltr');
    expect(directionFor('ar')).toBe('rtl');
  });

  it('recognises supported languages only', () => {
    expect(isLanguage('ar')).toBe(true);
    expect(isLanguage('fr')).toBe(false);
  });
});
