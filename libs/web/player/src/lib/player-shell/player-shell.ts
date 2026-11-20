import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Frame every player screen renders inside. Visual primitives are projected
 * into it so the player shell stays independent of the schema.
 */
@Component({
  selector: 'ufuq-player-shell',
  templateUrl: './player-shell.html',
  styleUrl: './player-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerShell {
  readonly label = input.required<string>();
}
