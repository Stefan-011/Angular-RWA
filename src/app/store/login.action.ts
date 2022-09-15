import { createAction, props } from '@ngrx/store';
import { ErrorMessage } from '../Enums/ErrorMessage';
import { LoginMod } from '../Enums/LoginMod';
import { OperationResult } from '../Enums/OperationResult';
import { user } from '../models/user';

export const ChangeErrorMessage = createAction(
  'setError',
  props<{ Error: ErrorMessage }>()
);

export const changeMode = createAction('setMode', props<{ Mod: LoginMod }>());

export const RegisterIsValid = createAction(
  'RegisterIsValid',
  props<{ Result: OperationResult }>()
);

export const RegisterIsNotValid = createAction(
  'RegisterIsNotValid',
  props<{ Result: OperationResult }>()
);

export const LoginIsValid = createAction(
  'LoginIsValid',
  props<{ Result: OperationResult }>()
);

export const LoginIsNotValid = createAction(
  'LoginIsNotValid',
  props<{ Result: OperationResult }>()
);

export const RestartLogin = createAction('RestartLogin');
export const RestartRegister = createAction('RestartLogin');

export const ClearState = createAction('ClearState');
