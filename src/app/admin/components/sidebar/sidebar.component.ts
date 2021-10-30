import { User } from './../../../auth/models/user.model'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { Component, OnInit, OnDestroy } from '@angular/core';

import * as fromApp from '@app/store/app.reducer'
import * as AuthActions from '@auth/store/auth.actions'
import * as AuthSelectors from '@auth/store/auth.selectors'

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;

  userLoggedIn = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.storeSub = this.store.select(AuthSelectors.selectUser).subscribe((user: User) => {
      this.userLoggedIn = !!user;
    })
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  logOut = () => {
    this.store.dispatch(
      new AuthActions.Logout()
    )
  }

}