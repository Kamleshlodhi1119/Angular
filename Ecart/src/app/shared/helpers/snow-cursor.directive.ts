import {
  Directive,
  HostListener,
  Renderer2,
  OnInit,
  NgZone,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: '[appSnowCursor]'
})
export class SnowCursorDirective implements OnInit, OnDestroy {
  private cursor: HTMLElement | null = null;
  private growTimeout: any;
  private currentX = 0;
  private currentY = 0;
  private animationFrameId: number | null = null;

  constructor(private renderer: Renderer2, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.cursor = this.renderer.createElement('div');
    this.renderer.addClass(this.cursor, 'cursor-circle');
    this.renderer.appendChild(document.body, this.cursor);

    this.startAnimationLoop();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.cursor) {
      this.cursor.remove();
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.currentX = e.clientX;
    this.currentY = e.clientY;

    this.setGrow(true);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.setGrow(true);
  }

  private startAnimationLoop() {
    this.ngZone.runOutsideAngular(() => {
      const update = () => {
        if (this.cursor) {
          this.renderer.setStyle(this.cursor, 'left', `${this.currentX}px`);
          this.renderer.setStyle(this.cursor, 'top', `${this.currentY}px`);
        }
        this.animationFrameId = requestAnimationFrame(update);
      };
      update();
    });
  }
private setGrow(grow: boolean) {
  if (!this.cursor) return;

  // Remove idle class when moving
  this.renderer.removeClass(this.cursor, 'idle');

  this.renderer.setStyle(
    this.cursor,
    'transform',
    grow ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(0.8)'
  );

  if (this.growTimeout) clearTimeout(this.growTimeout);
  this.growTimeout = setTimeout(() => {
    this.renderer.setStyle(this.cursor!, 'transform', 'translate(-50%, -50%) scale(1)');
    
    // Add idle class back after no movement
    this.renderer.addClass(this.cursor!, 'idle');
  }, 150);
}
}
