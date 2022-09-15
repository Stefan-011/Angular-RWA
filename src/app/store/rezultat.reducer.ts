import { createReducer, on } from '@ngrx/store';
import * as RezultatAction from './rezultat.action';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { IMap } from '../models/IMap';

export interface RezultatState extends EntityState<IMap> {
  LeftTeamWinns: number;
  RightTeamWinns: number;
}
const adapter = createEntityAdapter<IMap>();

export const initialState: RezultatState = adapter.getInitialState({
  LeftTeamWinns: 0,
  RightTeamWinns: 0,
});

export const RezultatReducer = createReducer(
  initialState,
  on(RezultatAction.UseMap, (state, { Map }) => {
    return adapter.addOne(Map, state);
  }),
  on(RezultatAction.CleanMapPool, (state, {}) => {
    return adapter.removeAll(state);
  }),
  on(RezultatAction.SetLeftTeamWinns, (state, { NumberOfWinns }) => ({
    ...state,
    LeftTeamWinns: NumberOfWinns,
  })),
  on(RezultatAction.SetRightTeamWinns, (state, { NumberOfWinns }) => ({
    ...state,
    RightTeamWinns: NumberOfWinns,
  })),
  on(RezultatAction.ClearState, (state, {}) => ({
    ...state,
    LeftTeamWinns: 0,
    RightTeamWinns: 0,
  }))
);
