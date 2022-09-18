import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { MapsEnum } from '../Enums/MapsEnum';
import { IMap } from '../models/IMap';

export const selectRezulatState = createSelector(
  (state: AppState) => state.Rezultat,
  (Rezultat) => Rezultat
);

export const selectMapUsedMaps = createSelector(
  selectRezulatState,
  (Rezultat) => {
    return Rezultat.ids
      .map((id) => Rezultat.entities[id])
      .filter((Map) => Map != null)
      .map((Map) => <IMap>Map);
  }
);

export const selectRightTeamWinns = createSelector(
  selectRezulatState,
  (Rezultat) => Rezultat.RightTeamWinns
);

export const selectLeftTeamWinns = createSelector(
  selectRezulatState,
  (Rezultat) => Rezultat.LeftTeamWinns
);
