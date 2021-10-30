import { State } from '@auth/store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store'

import * as fromAuth from '@auth/store/auth.reducer'
import * as fromAppMsg from './app-msg.reducer'

export interface AppState {
  auth: fromAuth.State,
  error: fromAppMsg.State
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  error: fromAppMsg.appMsgReducer
}