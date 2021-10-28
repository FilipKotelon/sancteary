import { State } from '@auth/store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store'

import * as fromAuth from '@auth/store/auth.reducer'
import * as fromAppError from './app-error.reducer'

export interface AppState {
  auth: fromAuth.State,
  error: fromAppError.State
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  error: fromAppError.appErrorReducer
}