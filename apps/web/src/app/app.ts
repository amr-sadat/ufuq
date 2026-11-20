import { DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  DEFAULT_LANGUAGE,
  MESSAGES,
  directionFor,
  type Language,
} from '@ufuq/shared/i18n';
import { StatusBadge } from '@ufuq/web/ui';
import { HealthService } from './health.service';

@Component({
  imports: [StatusBadge],
  selector: 'ufuq-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly healthService = inject(HealthService);

  protected readonly language = signal<Language>(DEFAULT_LANGUAGE);
  protected readonly messages = computed(() => MESSAGES[this.language()]);
  protected readonly health = this.healthService.health;
  protected readonly status = computed(() => this.health().status);
  protected readonly statusLabel = computed(() => {
    switch (this.health().status) {
      case 'ready':
        return this.messages().connected;
      case 'error':
        return this.messages().unavailable;
      default:
        return this.messages().checking;
    }
  });

  constructor() {
    this.applyDirection();
    void this.healthService.check();
  }

  protected switchLanguage(): void {
    this.language.update((language) => (language === 'en' ? 'ar' : 'en'));
    this.applyDirection();
  }

  private applyDirection(): void {
    const root = this.document.documentElement;
    root.lang = this.language();
    root.dir = directionFor(this.language());
  }
}
