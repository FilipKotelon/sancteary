import { CursorService } from '@core/services/cursor.service'
import { Directive, HostListener, Input } from '@angular/core'

@Directive({
  selector: '[appHoverEnlargeCursor]'
})
export class HoverEnlargeCursorDirective{
  @Input() hoverMessage!: string;
  constructor(private cursorSvc: CursorService){}

  @HostListener('mouseenter') mouseenter(e: Event){
    const msg = this.hoverMessage ? this.hoverMessage : 'Click';
    this.cursorSvc.enlargeCursor(msg);
  }

  @HostListener('mouseleave') mouseleave(e: Event){
    this.cursorSvc.normalizeCursor();
  }
}