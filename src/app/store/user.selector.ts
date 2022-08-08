import { createSelector,createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { user } from '../models/user';

export const selectCurrentUser = createSelector(
(state : AppState) => state.user,
(user) => user
);

export const selectUsersMoney = createSelector(
    selectCurrentUser,
    (state:user)=>{return state.money}
)