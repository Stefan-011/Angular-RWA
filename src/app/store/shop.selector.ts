import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const SelectShop = createSelector(
  (state: AppState) => state.Shop,
  (Shop) => Shop
);

export const SelectShopState = createSelector(
  SelectShop,
  (Shop) => Shop.shop_state
);

export const SelectErrorMsg = createSelector(
  SelectShop,
  (Shop) => Shop.error_message
);
export const SelectSponzorList = createSelector(
  SelectShop,
  (Shop) => Shop.sponzorlist
);
