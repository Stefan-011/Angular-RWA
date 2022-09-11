import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as OtherTeamAction from './Otherteam.action';
import { createReducer, on } from '@ngrx/store';
import { player } from '../models/player';
import { TeamSablon } from '../models/TeamSablon';

export interface OtherTeamState extends EntityState<player> {
  name: string;
  SelectedPlayer: number;
  TeamList: TeamSablon[];
}
const adapter = createEntityAdapter<player>();

export const initialState: OtherTeamState = adapter.getInitialState({
  name: '',
  SelectedPlayer: 0,
  TeamList: [],
});

export const OtherTeamState = createReducer(
  initialState,
  on(OtherTeamAction.GetAllPlayersSuccess, (state, { data }) => {
    return adapter.setAll(data, state);
  }),

  on(OtherTeamAction.SetName, (state, { name }) => ({ ...state, name: name })),

  on(OtherTeamAction.SetTeamList, (state, { TeamList }) => ({
    ...state,
    TeamList: TeamList,
  }))
);
