import { createAction, props } from '@ngrx/store';
import { player } from '../models/player';
import { TeamSablon } from '../models/TeamSablon';

export const GetAllPlayers = createAction(
  'GetAllPlayers',
  props<{ name: string }>()
);
export const GetAllPlayersSuccess = createAction(
  'GetAllPlayersSuccess',
  props<{ PlayerList: player[]; name: string }>()
);

export const GetTeamList = createAction('GetTeamList');

export const SetTeamList = createAction(
  'SetNameList',
  props<{ TeamList: TeamSablon[] }>()
);

export const SetName = createAction('SetName', props<{ name: string }>());
