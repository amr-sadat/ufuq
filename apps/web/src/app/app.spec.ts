import { DOCUMENT } from '@angular/common';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MESSAGES } from '@ufuq/shared/i18n';
import { App } from './app';
import { HealthService } from './health.service';
import type { HealthState } from './health.service';

describe('App', () => {
  const state = signal<HealthState>({ status: 'loading' });
  const check = vi.fn().mockResolvedValue(undefined);

  beforeEach(async () => {
    state.set({ status: 'loading' });
    check.mockClear();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: HealthService,
          useValue: { health: state.asReadonly(), check },
        },
      ],
    }).compileComponents();

    const root = TestBed.inject(DOCUMENT).documentElement;
    root.lang = 'en';
    root.dir = 'ltr';
  });

  afterEach(() => {
    const root = TestBed.inject(DOCUMENT).documentElement;
    root.lang = 'en';
    root.dir = 'ltr';
  });

  it('renders the English shell and checks the API on start', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain(
      MESSAGES.en.title,
    );
    expect(compiled.textContent).toContain(MESSAGES.en.checking);
    expect(check).toHaveBeenCalledOnce();
  });

  it('shows the connected state once the API contract is valid', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    state.set({
      status: 'ready',
      health: { status: 'ok', service: 'api', version: '0.0.0' },
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(MESSAGES.en.connected);
  });

  it('shows the error state when the API is unavailable', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    state.set({ status: 'error' });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      MESSAGES.en.unavailable,
    );
  });

  it('switches to Arabic RTL from the language button', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    compiled.querySelector('button')?.click();
    fixture.detectChanges();

    expect(compiled.querySelector('h1')?.textContent).toContain(
      MESSAGES.ar.title,
    );
    expect(TestBed.inject(DOCUMENT).documentElement.dir).toBe('rtl');
    expect(TestBed.inject(DOCUMENT).documentElement.lang).toBe('ar');
  });
});
