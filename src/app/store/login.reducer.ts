import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.action';
import { LoginMod } from '../Enums/LoginMod';
import { ErrorMessage } from '../Enums/ErrorMessage';
import { OperationResult } from '../Enums/OperationResult';

export interface LoginState {
  Mode: LoginMod;
  ErrorMessage: ErrorMessage;
  RegisterValidate: OperationResult;
  LoginValidate: OperationResult;
}

export const initialState: LoginState = {
  Mode: LoginMod.Login,
  ErrorMessage: ErrorMessage.None,
  RegisterValidate: OperationResult.none,
  LoginValidate: OperationResult.none,
};

export const LoginReducer = createReducer(
  initialState,
  on(LoginActions.ChangeErrorMessage, (state, { Error }) => ({
    ...state,
    ErrorMessage: Error,
  })),

  on(LoginActions.changeMode, (state, { Mod }) => {
    return {
      ...state,
      Mode: Mod,
    };
  }),

  on(LoginActions.LoginIsNotValid, (state, { Result }) => ({
    ...state,
    LoginValidate: Result,
  })),

  on(LoginActions.LoginIsValid, (state, { Result }) => {
    return {
      ...state,
      LoginValidate: Result,
    };
  }),

  on(LoginActions.RegisterIsNotValid, (state, { Result }) => ({
    ...state,
    RegisterValidate: Result,
  })),

  on(LoginActions.RegisterIsValid, (state, { Result }) => {
    return {
      ...state,
      RegisterValidate: Result,
    };
  }),

  on(LoginActions.RestartRegister, (state) => ({
    ...state,
    LoginValidate: OperationResult.none,
  })),

  on(LoginActions.RestartLogin, (state) => {
    return {
      ...state,
      RegisterValidate: OperationResult.none,
    };
  }),
  on(LoginActions.ClearState, (state, {}) => ({
    ...state,
    Mode: LoginMod.Login,
    ErrorMessage: ErrorMessage.None,
    RegisterValidate: OperationResult.none,
    LoginValidate: OperationResult.none,
  }))
);
