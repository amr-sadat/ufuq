import { healthResponseSchema } from './health';

describe('healthResponseSchema', () => {
  it('accepts a valid health response', () => {
    const response = {
      status: 'ok',
      service: 'api',
      version: '0.0.0',
    } as const;

    expect(healthResponseSchema.parse(response)).toEqual(response);
  });

  it('rejects an unknown status', () => {
    const result = healthResponseSchema.safeParse({
      status: 'degraded',
      service: 'api',
      version: '0.0.0',
    });

    expect(result.success).toBe(false);
  });

  it('rejects a missing version', () => {
    const result = healthResponseSchema.safeParse({
      status: 'ok',
      service: 'api',
    });

    expect(result.success).toBe(false);
  });
});
