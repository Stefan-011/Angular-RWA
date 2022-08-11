import { createSelector,createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { user } from '../models/user';

export const selectCurrentUser = createSelector(
(state : AppState) => state.user,
(user) => user
);

export const selectUsersMoney = createSelector(
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
    (data)=> {if(data.component != null)return data.component; else return ""})
