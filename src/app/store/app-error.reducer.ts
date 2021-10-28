import * as AppErrorActions from './app-error.actions';

export interface State {
  error: string
}

const initState: State = {
  error: ''
}

export function appErrorReducer ( state = initState , action: AppErrorActions.AppErrorActions ) {
  switch(action.type){
    case AppErrorActions.APP_ERROR :
      return {
        ...state,
        error: action.payload
      }
    case AppErrorActions.APP_ERROR_CLEAR :
      return {
        ...state,
        error: ''
      }
    default :
      return state;
  }
}