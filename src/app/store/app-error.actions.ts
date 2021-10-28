import { Action } from '@ngrx/store'

export const APP_ERROR = '[App] Error';
export const APP_ERROR_CLEAR = '[App] ErrorClear';

export type AppErrorActions = AppError | AppErrorClear;

export class AppError implements Action {
  readonly type = APP_ERROR;

  constructor( public payload: string ){ }
}

export class AppErrorClear implements Action {
  readonly type = APP_ERROR_CLEAR;
}