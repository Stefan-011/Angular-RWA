import { createAction, props } from '@ngrx/store';
import { ComponentEnum } from '../Enums/ComponentEnum';
import { MenuSize } from '../Enums/MenuSize';
import { user } from '../models/user';

export const loginUser = createAction(
  'loginUser',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  'loginSuccess',
  props<{ user: user }>()
);

export const GetLoggedUserSuccess = createAction(
  'GetLoggedInSuccess',
  props<{ user: user }>()
);

export const SetComponent = createAction(
  'SetComponent',
  props<{ comp: ComponentEnum }>()
);

export const RegisterUser = createAction(
  'RegisterUser',
  props<{ username: string; password: string; email: string }>()
);

export const CreateUser = createAction(
  'CreateUser',
  props<{ username: string }>()
);

export const SetMenuSize = createAction(
  'SetMenuSize',
  props<{ Size: MenuSize }>()
);

export const GetLoggedUser = createAction('GetLoggedIn');
export const CreateUserSuccess = createAction('CreateUserSuccess');
export const RegisterUserSuccess = createAction('RegisterUserSuccess');
export const RegisterUserFail = createAction('RegisterUserFail');
