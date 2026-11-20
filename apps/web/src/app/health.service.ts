import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { HEALTH_PATH, healthResponseSchema } from '@ufuq/shared/schema';
import type { HealthResponse } from '@ufuq/shared/schema';
import { firstValueFrom } from 'rxjs';

export type HealthState =
  | { readonly status: 'loading' }
  | { readonly status: 'ready'; readonly health: HealthResponse }
  | { readonly status: 'error' };

/**
 * Checks the API against the shared schema. The payload is untrusted until the
 * schema parses it, so a contract drift surfaces as an error state instead of
 * leaking into the UI.
 */
@Injectable({ providedIn: 'root' })
export class HealthService {
  private readonly http = inject(HttpClient);
  private readonly state = signal<HealthState>({ status: 'loading' });

  readonly health = this.state.asReadonly();

  async check(): Promise<void> {
    this.state.set({ status: 'loading' });

    try {
      const response = await firstValueFrom(
        this.http.get<unknown>(HEALTH_PATH),
      );
      this.state.set({
        status: 'ready',
        health: healthResponseSchema.parse(response),
      });
    } catch {
      this.state.set({ status: 'error' });
    }
  }
}
