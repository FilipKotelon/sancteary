import { Subscription } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { fader } from '@shared/animations/route-animations'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'

import * as fromApp from './store/app.reducer'
import * as AuthActions from '@auth/store/auth.actions'
import * as AuthSelectors from '@auth/store/auth.selectors'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.storeSub = this.store.select(AuthSelectors.selectAuth).pipe(
      take(1),
      map(authState => authState)
    ).subscribe((authState) => {
      if(!authState.user && !authState.loading){
        this.store.dispatch(
          new AuthActions.AutoLogin()
        )
      }
    })
  }

  ngOnDestroy() {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
