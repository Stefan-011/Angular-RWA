import { createAction, props } from '@ngrx/store';
import { MyTeam } from '../models/MyTeam';
import { player } from '../models/player';
import { Sponzor } from '../models/Sponzor';


export const GetMyTeam = createAction('GetMyTeam',props<{token:string}>());
export const GetMyTeamSuccess = createAction('GetMyTeamSuccess',props<{MyTeam:MyTeam}>());
export const GetMyTeamSuccess_Sponzor = createAction(' GetMyTeamSuccess_Sponzor ',props<{sponzor:Sponzor}>());


export const SelectPlayer =  createAction('SelectPlayer',props<{ID:number}>());

export const SellPlayer =  createAction('SellPlayer',props<{ID:number,token:string}>());
export const SellPlayerSuccess =  createAction('SellPlayerSuccess',props<{ID:number}>());

export const BuyPlayer =  createAction('BuyPlayer',props<{ID:number,token:string}>());
export const BuyPlayerSuccess =  createAction('BuyPlayerSuccess',props<{NewOne:player}>());
export const BuyPlayerFail =  createAction('BuyPlayerFail');

//export const BuyPlayerSaved =  createAction('BuyPlayerSaved',props<{NewOne:player,username:string}>());
//export const BuyPlayerSavedSuccess =  createAction('BuyPlayerSavedSuccess');

export const CheckMyPlayer =  createAction('CheckMyPlayer',props<{nick:string,username:string,ID:number}>());
export const CheckMyPlayerFail =  createAction('CheckMyPlayerFail');


export const AddSponzor =  createAction('AddSponzor',props<{id:number,token:string}>());
export const AddSponzorSuccess =  createAction('AddSponzorSuccess',props<{sponzor:Sponzor}>());

export const RemoveSponzor =  createAction('RemoveSponzor',props<{token:string}>());
export const RemoveSponzorSuccess =  createAction('RemoveSponzor',props<{sponzor:Sponzor}>());




/*export const GetAllPlayers = createAction('GetAllPlayers',props<{name:string}>());
export const GetAllPlayersSuccess = createAction('GetAllPlayersSuccess',props<{data:player[],name:string}>());

export const SetName = createAction('SetName',props<{name:string}>());*/





