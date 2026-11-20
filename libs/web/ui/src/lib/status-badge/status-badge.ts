import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type StatusBadgeTone = 'loading' | 'ready' | 'error';

@Component({
  selector: 'ufuq-status-badge',
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadge {
  readonly status = input.required<StatusBadgeTone>();
  readonly label = input.required<string>();
}
