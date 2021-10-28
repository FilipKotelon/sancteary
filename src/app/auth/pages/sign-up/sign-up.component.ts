import { AuthFormHandler } from '@auth/components/auth-form/auth-form.component'
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthType } from '@auth/components/auth-form/auth-form.component';

import * as AuthActions from '@auth/store/auth.actions'
import * as AppErrorActions from '@app/store/app-error.actions'
import * as fromApp from '@app/store/app.reducer'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements AuthFormHandler {
  authType = AuthType.SignUp;

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
        new AuthActions.SignUpStart({ email, password })
      )
    } else {
      this.store.dispatch(
        new AppErrorActions.AppError('Email and password were not provided.')
      )
    }
  }

}
