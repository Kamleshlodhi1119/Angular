import { Directive, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSnowCursor]'
})
export class SnowCursorDirective {
  

 private snow = [ "🔻","❄",   "🔹", "✦", "🔸",  "▫️","✧",  "▪️", "✼"];
  constructor(private renderer: Renderer2) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const flake = this.renderer.createElement('div');
    this.renderer.addClass(flake, 'snowflake');
    flake.textContent = this.snow[Math.floor(Math.random() * this.snow.length)];
    
    this.renderer.setStyle(flake, 'left', e.pageX + 4+'px');
    this.renderer.setStyle(flake, 'top', e.pageY + 'px');
    this.renderer.setStyle(flake, 'fontSize', (Math.random() * 10 + 10) + 'px');
    this.renderer.appendChild(document.body, flake);

    setTimeout(() => {
      flake.remove();
    }, 2000);
  }
}
