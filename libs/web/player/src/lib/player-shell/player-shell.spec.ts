import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PlayerShell } from './player-shell';

@Component({
  imports: [PlayerShell],
  template: `<ufuq-player-shell label="Learning experience">
    <p>Section content</p>
  </ufuq-player-shell>`,
})
class PlayerHost {}

describe('PlayerShell', () => {
  it('renders projected content inside a labelled section', async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(PlayerHost);
    fixture.detectChanges();

    const section = (fixture.nativeElement as HTMLElement).querySelector(
      'section',
    );

    expect(section?.getAttribute('aria-label')).toBe('Learning experience');
    expect(section?.textContent).toContain('Section content');
  });
});
