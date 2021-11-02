import { NavigationEnd, Router } from '@angular/router'
import { fadeInOut } from './../../animations/component-animations'
import { Component, Input, Output, EventEmitter } from '@angular/core'
import { ChecksIfAdmin } from '../utility/checks-if-admin.class'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-accept-popup',
  templateUrl: './accept-popup.component.html',
  styleUrls: ['./accept-popup.component.scss'],
  animations: [
    fadeInOut
  ]
})
export class AcceptPopupComponent extends ChecksIfAdmin {
  @Input() open: boolean;
  @Input() msg: string;
  @Input() acceptMsg = 'Accept';
  @Input() declineMsg = 'Cancel';
  
  @Output() declined = new EventEmitter<void>()
  @Output() accepted = new EventEmitter<void>()

  constructor(protected router: Router){
    super(router);
  }
  
  onDecline = () => {
    this.declined.emit();
  }

  onAccept = () => {
    this.accepted.emit();
  }
}
