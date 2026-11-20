import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HEALTH_PATH } from '@ufuq/shared/schema';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(HealthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('reports the API as ready after validating the shared contract', async () => {
    const check = service.check();
    const request = http.expectOne(HEALTH_PATH);

    expect(request.request.method).toBe('GET');

    const payload = {
      status: 'ok',
      service: 'api',
      version: '0.0.0',
    } as const;
    request.flush(payload);
    await check;

    expect(service.health()).toEqual({
      status: 'ready',
      health: payload,
    });
  });

  it('reports an error when the contract does not match', async () => {
    const check = service.check();
    http.expectOne(HEALTH_PATH).flush({
      status: 'degraded',
      service: 'api',
      version: '0.0.0',
    });
    await check;

    expect(service.health()).toEqual({ status: 'error' });
  });

  it('reports an error when the request fails', async () => {
    const check = service.check();
    http
      .expectOne(HEALTH_PATH)
      .flush('unavailable', { status: 503, statusText: 'Unavailable' });
    await check;

    expect(service.health()).toEqual({ status: 'error' });
  });
});
