import { UserRole } from './../models/user.model'
import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const SIGNUP_START = '[Auth] Signup Start';
export const AUTH_SUCCESS = '[Auth] Auth Success';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

export interface UserLoginData {
  email: string;
  password: string;
}

export interface AuthSuccessData {
  user: {
    email: string;
    userId: string;
    token: string;
    role: UserRole;
    expirationDate: Date;
  }
  redirectTo?: string;
}

export type AuthActions = LoginStart | SignUpStart | AuthSuccess | AutoLogin | Logout;

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor( public payload: UserLoginData ){}
}

export class SignUpStart implements Action {
  readonly type = SIGNUP_START;

  constructor( public payload: UserLoginData ){}
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload: AuthSuccessData) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;

  constructor(public payload?: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}