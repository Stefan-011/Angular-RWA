import { createAction, props } from '@ngrx/store';
import { player } from '../models/player';




export const GetAllPlayers = createAction('GetAllPlayers',props<{name:string}>());
export const GetAllPlayersSuccess = createAction('GetAllPlayersSuccess',props<{data:player[],name:string}>());

export const SetName = createAction('SetName',props<{name:string}>());



