import { CursorService } from '@core/services/cursor.service'
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-cursor',
  templateUrl: './custom-cursor.component.html',
  styleUrls: ['./custom-cursor.component.scss'],
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  @ViewChild('customCursor', {static: true}) cursorEl: ElementRef;
  msg: string;
  isLarge: boolean;
  cursorSizeSubscription: Subscription;
  cursorMsgSubscription: Subscription;

  constructor(private renderer: Renderer2, private cursorSvc: CursorService) { }

  ngOnInit(): void {
    this.cursorSizeSubscription = this.cursorSvc.changedSize.subscribe((isLarge: boolean) => {
      this.isLarge = isLarge;
    })

    this.cursorMsgSubscription = this.cursorSvc.changedMsg.subscribe((msg: string) => {
      this.msg = msg;
    })

    document.addEventListener('mousemove', this.followCursor);
  }

  ngOnDestroy(){
    this.cursorSizeSubscription.unsubscribe();
    this.cursorMsgSubscription.unsubscribe();
  }

  followCursor = (e: MouseEvent) => {
    this.renderer.setStyle(this.cursorEl.nativeElement, 'top', `${e.clientY}px`);
    this.renderer.setStyle(this.cursorEl.nativeElement, 'left', `${e.clientX}px`);
  }
}
