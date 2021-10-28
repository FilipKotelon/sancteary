import { User } from './../models/user.model'
import * as AuthActions from './auth.actions';

export interface State {
  user: User,
  loading: boolean
}

const initState: State = {
  user: null,
  loading: false
}

export function authReducer ( state = initState, action: AuthActions.AuthActions ){
  switch(action.type){

    case AuthActions.LOGIN_START :
    case AuthActions.SIGNUP_START :
      return {
        ...state,
        loading: true
      }

    case AuthActions.AUTH_SUCCESS :
      const userData = action.payload.user;
      const user = new User(
        userData.email,
        userData.userId,
        userData.role,
        userData.token,
        userData.expirationDate
      );

      console.log(user);

      return {
        ...state,
        user,
        loading: false
      }
      
    case AuthActions.LOGOUT :
      return {
        ...state,
        user: null
      }

    default:
      return state;
      
  }
}