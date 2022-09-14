import { createAction, props } from '@ngrx/store';
import { ShopErrorMsg } from '../Enums/ShopErrorMsg';
import { ShopMode } from '../Enums/ShopMode';
import { Sponzor } from '../models/Sponzor';

export const SetShopMode = createAction(
  'SetShopMode',
  props<{ Mode: ShopMode }>()
);

export const SetErrorMsg = createAction(
  'SetErrorMsg',
  props<{ ErrorMSG: ShopErrorMsg }>()
);

export const SetSponzorList = createAction(
  'SetSponzorList',
  props<{ SponzorList: Sponzor[] }>()
);
export const GetSponzorList = createAction('GetSponzorList');
