import { Router } from '@angular/router'
import { fadeInOut } from '@shared/animations/component-animations'
import { Component, Input, Output, EventEmitter } from '@angular/core'
import { ChecksIfAdmin } from '../utility/checks-if-admin.class';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss'],
  animations: [
    fadeInOut
  ]
})
export class PopupMessageComponent extends ChecksIfAdmin {
  @Input() error: boolean;
  @Input() open: boolean;
  @Input() msg: string;

  @Output() onClose = new EventEmitter<void>();

  constructor(protected router: Router){
    super(router);
  }
  
  closePopup = () => {
    this.onClose.emit();
  }
}
