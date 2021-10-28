import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from '@app/shared/animations/route-animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    fader
  ]
})
export class AdminComponent{
  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
