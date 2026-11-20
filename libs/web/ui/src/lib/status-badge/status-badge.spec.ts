import { TestBed } from '@angular/core/testing';
import { StatusBadge } from './status-badge';

describe('StatusBadge', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadge],
    }).compileComponents();
  });

  it('renders the label and exposes its state to assistive technology', () => {
    const fixture = TestBed.createComponent(StatusBadge);
    fixture.componentRef.setInput('status', 'ready');
    fixture.componentRef.setInput('label', 'API connected');
    fixture.detectChanges();

    const status = (fixture.nativeElement as HTMLElement).querySelector(
      '[role="status"]',
    );

    expect(status?.textContent).toContain('API connected');
    expect(status?.getAttribute('data-status')).toBe('ready');
  });
});
