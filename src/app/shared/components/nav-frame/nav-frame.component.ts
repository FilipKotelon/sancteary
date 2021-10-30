import { User } from './../../../auth/models/user.model'
import { Store } from '@ngrx/store'
import { fadeInOut } from '@shared/animations/component-animations'
import { Component, OnInit, OnDestroy } from '@angular/core'

import * as fromApp from '@app/store/app.reducer'
import * as AuthActions from '@auth/store/auth.actions'
import * as AuthSelectors from '@auth/store/auth.selectors'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-nav-frame',
  templateUrl: './nav-frame.component.html',
  styleUrls: ['./nav-frame.component.scss'],
  animations: [
    fadeInOut
  ]
})
export class NavFrameComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;

  userLoggedIn = false;
  fullNavOpen = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.storeSub = this.store.select(AuthSelectors.selectUser).subscribe((user: User) => {
      this.userLoggedIn = !!user;
    })
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  openFullNav = () => {
    this.fullNavOpen = true;
  }

  closeFullNav = () => {
    this.fullNavOpen = false;
  }

  logOut = () => {
    this.store.dispatch(
      new AuthActions.Logout()
    )
  }

}
