import { MESSAGES } from './messages';

describe('MESSAGES', () => {
  it('provides every string for both languages', () => {
    const keys = Object.keys(MESSAGES.en) as (keyof typeof MESSAGES.en)[];

    for (const language of ['en', 'ar'] as const) {
      for (const key of keys) {
        expect(MESSAGES[language][key]).not.toBe('');
      }
    }
  });

  it('keeps the Arabic title in Arabic script', () => {
    expect(MESSAGES.ar.title).toMatch(/[\u0600-\u06ff]/);
  });
});
