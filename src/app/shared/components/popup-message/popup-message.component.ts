import { fadeInOut } from '@shared/animations/component-animations'
import { Component, Input, Output, EventEmitter } from '@angular/core'


@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss'],
  animations: [
    fadeInOut
  ]
})
export class PopupMessageComponent {
  @Input() open: boolean;
  @Input() msg: string;

  @Output() onClose = new EventEmitter<void>();
  
  closePopup = () => {
    this.onClose.emit();
  }
}
