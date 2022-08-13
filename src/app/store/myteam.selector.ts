import { createSelector,createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { player } from '../models/player';
import { user } from '../models/user';

export const SelectMyTeamFeature = createSelector(
(state : AppState) => state.MyTeam,
(MyTeam) => MyTeam
);

export const selectMyTeam = createSelector(SelectMyTeamFeature,
(MyTeam) =>
MyTeam.ids
.map((id) => MyTeam.entities[id])
.filter((MyTeam) => MyTeam != null)
.map((MyTeam) => <player>MyTeam)
);

export const selectPlayerID = createSelector(
    SelectMyTeamFeature,
    (MyTeam) => MyTeam.SelectedPlayer
);

export const selectPlayer = createSelector(
SelectMyTeamFeature,
selectPlayerID,
(MyTeam,PlayerID) => MyTeam.entities[PlayerID]
);

export const selectNumberOfPlayers = createSelector(
    SelectMyTeamFeature,
     (MyTeam) => MyTeam.ids.length
);





/*export const selectUsersMoney = createSelector(
    selectCurrentUser,
    (data)=>{if(data.CurrentUser?.money != null)return data.CurrentUser?.money; else return 0}
)

export const selectUsersname = createSelector(
    selectCurrentUser,
    (data)=>{if(data.CurrentUser?.username != null) return data.CurrentUser?.username; else return ""}
)

export const selectLoggedIn = createSelector(
    selectCurrentUser,
    (data)=>{return data.loggedIn}
)

export const SelectComponent = createSelector(
    selectCurrentUser,
    (data)=> {if(data.component != null)return data.component; else return ""})*/
