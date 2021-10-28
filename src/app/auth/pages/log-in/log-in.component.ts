import { AuthFormHandler } from '@auth/components/auth-form/auth-form.component'
import { FormGroup } from '@angular/forms'
import { Component } from '@angular/core'
import { AuthType } from '@auth/components/auth-form/auth-form.component'
import { Store } from '@ngrx/store'

import * as AuthActions from '@auth/store/auth.actions'
import * as AppErrorActions from '@app/store/app-error.actions'
import * as fromApp from '@app/store/app.reducer'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements AuthFormHandler {
  authType = AuthType.LogIn;

  constructor(private store: Store<fromApp.AppState>) { }

  onError = (formGroup: FormGroup) => {
    const email = formGroup.get('email')?.value;
    const password = formGroup.get('password')?.value;

    if(!email && !password){
      this.store.dispatch(
        new AppErrorActions.AppError('Please provide your email and password.')
      )
    } else {
      this.store.dispatch(
        new AppErrorActions.AppError('Please check if you provided the correct email and password.')
      )
    }
  }

  onSubmit = (formGroup: FormGroup) => {
    const email = formGroup.get('email')?.value;
    const password = formGroup.get('password')?.value;

    if(email && password){
      this.store.dispatch(
        new AuthActions.LoginStart({ email, password })
      )
    } else {
      this.store.dispatch(
        new AppErrorActions.AppError('Email and password were not provided.')
      )
    }
  }

}
