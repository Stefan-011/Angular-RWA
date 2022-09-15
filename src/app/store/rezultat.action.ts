import { createAction, props } from '@ngrx/store';
import { MapsEnum } from '../Enums/MapsEnum';
import { IMap } from '../models/IMap';

export const SetLeftTeamWinns = createAction(
  'LeftTeamWinns',
  props<{ NumberOfWinns: number }>()
);
export const SetRightTeamWinns = createAction(
  'RightTeamWinns',
  props<{ NumberOfWinns: number }>()
);
export const UseMap = createAction('UseMap', props<{ Map: IMap }>());
export const CleanMapPool = createAction('CleanMapPool');
export const ClearState = createAction('ClearState');
