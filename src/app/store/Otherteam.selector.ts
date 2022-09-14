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
  (team) =>
    team.ids
      .map((id) => team.entities[id])
      .filter((player) => player != null)
      .map((player) => <player>player)
);
export const selectName = createSelector(
  SelectotherTeamFeature,
  (team) => team.name
);

export const SelectTeamList = createSelector(
  SelectotherTeamFeature,
  (team) => team.TeamList
);
