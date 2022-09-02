import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectLoginState = createSelector(
  (state: AppState) => state.Login,
  (Login) => Login
);

export const selectLoginMode = createSelector(selectLoginState, (Login) => {
  return Login.Mode;
});

export const selectErrorMessage = createSelector(selectLoginState, (Login) => {
  return Login.ErrorMessage;
});

export const selectLoginValidity = createSelector(selectLoginState, (Login) => {
  return Login.LoginValidate;
});

export const selectRegisterValidity = createSelector(
  selectLoginState,
  (Login) => {
    return Login.RegisterValidate;
  }
);
