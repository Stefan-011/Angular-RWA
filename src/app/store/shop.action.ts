import { createAction, props } from '@ngrx/store';
import { ShopErrorMsg } from '../Enums/ShopErrorMsg';
import { ShopMode } from '../Enums/ShopMode';

export const SetShopMode = createAction(
  'SetShopMode',
  props<{ Mode: ShopMode }>()
);

export const SetErrorMsg = createAction(
  'SetErrorMsg',
  props<{ ErrorMSG: ShopErrorMsg }>()
);
