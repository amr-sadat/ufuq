import { Injectable } from '@nestjs/common';
import { healthResponseSchema, type HealthResponse } from '@ufuq/shared/schema';

@Injectable()
export class AppService {
  getHealth(): HealthResponse {
    return healthResponseSchema.parse({
      status: 'ok',
      service: 'api',
      version: process.env['npm_package_version'] ?? '0.0.0',
    });
  }
}
