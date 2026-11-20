import { z } from 'zod';

/** Version prefix for every public API route. */
export const API_VERSION = 'v1';

/** Path to the API health endpoint. */
export const HEALTH_PATH = `/${API_VERSION}/health`;

/**
 * Contract for the API health endpoint. Both apps validate against this
 * schema so the payload cannot drift between the server and the client.
 */
export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  service: z.literal('api'),
  version: z.string().min(1),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
