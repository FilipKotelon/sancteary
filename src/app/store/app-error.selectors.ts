import { createSelector } from '@ngrx/store';
import * as fromApp from './app.reducer'
import * as fromAppError from './app-error.reducer'

const selectErrorState = (state: fromApp.AppState) => state.error;

export const selectError = createSelector(
  selectErrorState,
  (state: fromAppError.State) => state.error
)