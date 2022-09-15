import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.action';
import { user } from '../models/user';
import { ComponentEnum } from '../Enums/ComponentEnum';
import { MenuSize } from '../Enums/MenuSize';

export interface UserState {
  loggedIn: boolean;
  CurrentUser: user | null;
  component: ComponentEnum;
  MenuSize: MenuSize;
}

export const initialState: UserState = {
  loggedIn: false,
  CurrentUser: null,
  component: ComponentEnum.Home,
  MenuSize: MenuSize.default,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.GetLoggedUserSuccess, (state, { user }) => ({
    ...state,
    CurrentUser: user,
    loggedIn: true,
  })),

  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    CurrentUser: user,
    loggedIn: true,
  })),

  on(UserActions.SetComponent, (state, { comp }) => ({
    ...state,
    component: comp,
  })),
  on(UserActions.SetMenuSize, (state, { Size }) => ({
    ...state,
    MenuSize: Size,
  })),
  on(UserActions.LogoutUser, (state, {}) => ({
    ...state,
    loggedIn: false,
  })),
  on(UserActions.SetLoginState, (state, { LoginState }) => ({
    ...state,
    loggedIn: LoginState,
  })),
  on(UserActions.ClearState, (state, {}) => ({
    ...state,
    loggedIn: false,
    CurrentUser: null,
    component: ComponentEnum.Home,
    MenuSize: MenuSize.default,
  }))
);
