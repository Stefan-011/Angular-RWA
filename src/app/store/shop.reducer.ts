import { createReducer, on } from '@ngrx/store';
import * as ShopAction from './shop.action';
import { ShopMode } from '../Enums/ShopMode';
import { ShopErrorMsg } from '../Enums/ShopErrorMsg';

export interface ShopState {
  shop_state: ShopMode;
  error_message: ShopErrorMsg;
}

export const initialState: ShopState = {
  shop_state: ShopMode.Igraci,
  error_message: ShopErrorMsg.default,
};

export const ShopReducer = createReducer(
  initialState,
  on(ShopAction.SetShopMode, (state, { Mode }) => ({
    ...state,
    shop_state: Mode,
  })),
  on(ShopAction.SetErrorMsg, (state, { ErrorMSG }) => ({
    ...state,
    error_message: ErrorMSG,
  }))
);
