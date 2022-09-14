import { createSelector } from '@ngrx/store';
import { player } from '../models/player';
import { AppState } from '../app.state';

export const SelectMyTeamFeature = createSelector(
  (state: AppState) => state.MyTeam,
  (MyTeam) => MyTeam
);

export const selectMyTeam = createSelector(SelectMyTeamFeature, (MyTeam) =>
  MyTeam.ids
    .map((id) => MyTeam.entities[id])
    .filter((MyPlayer) => MyPlayer != null)
    .map((MyPlayer) => <player>MyPlayer)
);

export const selectPlayerID = createSelector(
  SelectMyTeamFeature,
  (MyTeam) => MyTeam.SelectedPlayer
);

export const selectPlayer = createSelector(
  SelectMyTeamFeature,
  selectPlayerID,
  (MyTeam, PlayerID) => MyTeam.entities[PlayerID]
);

export const selectNumberOfPlayers = createSelector(
  SelectMyTeamFeature,
  (MyTeam) => MyTeam.NumberOfPlayers
);

export const selectSponzor = createSelector(
  SelectMyTeamFeature,
  (MyTeam) => MyTeam.Sponzor
);
