import { createAction, props } from '@ngrx/store';
import { Sponzor } from '../models/Sponzor';
import { MyTeam } from '../models/MyTeam';
import { player } from '../models/player';

export const GetMyTeam = createAction('GetMyTeam');
export const GetMyTeamSuccess = createAction(
  'GetMyTeamSuccess',
  props<{ MyTeam: MyTeam }>()
);
export const GetMyTeamSuccess_Sponzor = createAction(
  ' GetMyTeamSuccess_Sponzor ',
  props<{ sponzor: Sponzor }>()
);

export const SelectPlayer = createAction(
  'SelectPlayer',
  props<{ ID: number }>()
);

export const SellPlayer = createAction(
  'SellPlayer',
  props<{ ID: number; NumOfPlayers: number }>()
);
export const SellPlayerSuccess = createAction(
  'SellPlayerSuccess',
  props<{ ID: number }>()
);

export const BuyPlayer = createAction(
  'BuyPlayer',
  props<{ ID: number; NumOfPlayers: number }>()
);
export const BuyPlayerSuccess = createAction(
  'BuyPlayerSuccess',
  props<{ NewOne: player }>()
);
export const BuyPlayerFail = createAction('BuyPlayerFail');

export const AddSponzor = createAction('AddSponzor', props<{ id: number }>());
export const AddSponzorSuccess = createAction(
  'AddSponzorSuccess',
  props<{ sponzor: Sponzor }>()
);
export const AddSponzorFail = createAction('AddSponzorFail');

export const RemoveSponzor = createAction('RemoveSponzor');
export const RemoveSponzorSuccess = createAction(
  'RemoveSponzor',
  props<{ sponzor: Sponzor }>()
);
export const RemoveSponzorFail = createAction('RemoveSponzorFail');

export const SetNumberOfPlayers = createAction(
  'SetNumberOfPlayers',
  props<{ PlayerCount: number }>()
);
