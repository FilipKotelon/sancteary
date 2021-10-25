import { User } from './../models/user.model'
import * as AuthActions from './auth.actions';

export interface State {
  user: User
}

const initState: State = {
  user: null
}

export function authReducer ( state = initState, action: AuthActions.AuthActions ){
  switch(action.type){
    default:
      return state;
  }
}