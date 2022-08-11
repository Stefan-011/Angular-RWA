import { state } from '@angular/animations';
import { createSelector,createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { player } from '../models/player';

import { user } from '../models/user';

export const SelectotherTeamFeature = createSelector(
(state : AppState) => state.OtherTeam,
(team) => team
);

export const selectCurrentOtherTeam = createSelector(
  SelectotherTeamFeature,
  (team) => team.ids
  );

export const selectCurrentOtherTeams = createSelector(SelectotherTeamFeature, (data) =>
    data.ids
    .map((id) => data.entities[id])
    .filter((data) => data != null)
    .map((data) => <player>data)
    );

    export const selectName = createSelector(SelectotherTeamFeature, (data) =>
    data.name
    );

  

   


/*export const selectUsersname = createSelector(
    selectCurrentOtherTeam,
    (data)=>{return data..username}
)*/