import { UserRole } from './../models/user.model'
import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTH_SUCCESS = '[Auth] Auth Success';
export const AUTH_FAIL = '[Auth] Auth Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

export interface UserLoginData {
  email: string;
  userId: string;
  token: string;
  role: UserRole;
  expirationDate: Date;
  redirect: boolean;
}

export type AuthActions = LoginStart;

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor( public payload: UserLoginData ){}
}