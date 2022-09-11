import { createSelector } from '@ngrx/store';
import { player } from '../models/player';
import { AppState } from '../app.state';

export const SelectotherTeamFeature = createSelector(
  (state: AppState) => state.OtherTeam,
  (team) => team
);

export const selectCurrentOtherTeam = createSelector(
  SelectotherTeamFeature,
  (team) => team.ids
);

export const selectCurrentOtherTeams = createSelector(
  SelectotherTeamFeature,
  (data) =>
    data.ids
      .map((id) => data.entities[id])
      .filter((data) => data != null)
      .map((data) => <player>data)
);
export const selectName = createSelector(
  SelectotherTeamFeature,
  (data) => data.name
);

export const SelectTeamList = createSelector(
  SelectotherTeamFeature,
  (data) => data.TeamList
);
