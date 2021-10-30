import { User } from './../models/user.model'
import { AuthSuccessData } from './auth.actions'
import { of } from "rxjs";

import { UserRole } from '../models/user.model';
import * as AuthActions from '@auth/store/auth.actions'
import * as AppMsgActions from '@app/store/app-msg.actions'

export const handleError = (error) => {
  let msg = 'An error occurred. Try again later.';
  console.log(error);

  if(!error.code){
    return of(new AppMsgActions.AppError(msg))
  }

  switch(error.code){
    case 'auth/email-already-exists':
      msg = 'An account with this email already exists.';
      break;
    case 'auth/internal-error':
      msg = 'An internal error has occured. Try again later.';
      break;
    case 'auth/invalid-email':
      msg = 'This email is not valid.';
      break;
    case 'auth/invalid-password':
      msg = 'The password must contain at least 6 characters.';
      break;
    case 'auth/wrong-password':
      msg = 'The password for this email is not correct.';
      break;
    case 'auth/user-not-found':
      msg = 'No user found for this email.';
      break;
  }

  console.log(msg);

  return of(new AppMsgActions.AppError(msg))
}

export const handleAuthSuccess = (data: AuthSuccessData) => {
  const user = new User(
    data.user.email,
    data.user.userId,
    data.user.role,
    data.user.token,
    data.user.expirationDate
  );

  localStorage.setItem('loggedInUser', JSON.stringify(user));

  return new AuthActions.AuthSuccess({
    user: {
      email: data.user.email,
      userId: data.user.userId,
      token: data.user.token,
      role: data.user.role,
      expirationDate: data.user.expirationDate
    },
    redirectTo: data.redirectTo
  })
}

export const getLocalStorageUser = (): User => {
  const savedUser = localStorage.getItem('loggedInUser');

  if(!savedUser){
    return null;
  }

  const userData : {
    email: string,
    id: string,
    role: UserRole,
    _token: string,
    _tokenExpirationDate: string
  } = JSON.parse(savedUser);

  const user = new User(
    userData.email,
    userData.id,
    userData.role,
    userData._token,
    new Date(userData._tokenExpirationDate)
  )

  //Token will return null if the token expired
  if(!user.token){
    localStorage.removeItem('loggedInUser');

    return null;
  }

  return user;
}