import { User, UserRole } from './../models/user.model'
import { Store } from '@ngrx/store'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'

import * as fromApp from '@app/store/app.reducer'
import * as AuthSelectors from '@auth/store/auth.selectors'
import { map, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private store: Store<fromApp.AppState>, private router: Router){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
      return this.store.select(AuthSelectors.selectUser).pipe(
        take(1),
        map((user: User) => {
          const userLoggedIn = !!user;

          if(!userLoggedIn){
            return true;
          }
          
          if(user){
            if(user.role === UserRole.Admin){
              return this.router.createUrlTree(['/admin'])
            } else {
              return this.router.createUrlTree(['/profile/dashboard'])
            }
          }

          return this.router.createUrlTree(['/'])
        })
      )
  }
}