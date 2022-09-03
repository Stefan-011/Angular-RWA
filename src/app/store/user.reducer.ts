import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.action';
import { user } from '../models/user';
import { ComponentEnum } from '../Enums/ComponentEnum';
import { ShopMode } from '../Enums/ShopMode';

export interface UserState {
  loggedIn: boolean;
  CurrentUser: user | null;
  component: ComponentEnum;
  shop_state: ShopMode;
}

export const initialState: UserState = {
  loggedIn: false,
  CurrentUser: null,
  component: ComponentEnum.none,
  shop_state: ShopMode.Igraci,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.GetLoggedUserSuccess, (state, { data }) => ({
    ...state,
    CurrentUser: data,
    loggedIn: true,
  })),

  on(UserActions.loginSuccess, (state, { data }) => ({
    ...state,
    CurrentUser: data,
    loggedIn: true,
  })),

  on(UserActions.SetComponent, (state, { comp }) => ({
    ...state,
    component: comp,
  })),

  on(UserActions.SetShopMode, (state, { Mode }) => ({
    ...state,
    shop_state: Mode,
  }))
);
