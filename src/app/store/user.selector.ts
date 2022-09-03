import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectCurrentUser = createSelector(
  (state: AppState) => state.user,
  (user) => user
);

export const selectUsersMoney = createSelector(selectCurrentUser, (user) => {
  if (user.CurrentUser?.money != null) return user.CurrentUser?.money;
  else return 0;
});

export const selectUsersname = createSelector(selectCurrentUser, (user) => {
  if (user.CurrentUser?.username != null) return user.CurrentUser?.username;
  else return '';
});

export const selectLoggedIn = createSelector(selectCurrentUser, (user) => {
  return user.loggedIn;
});

export const SelectComponent = createSelector(
  selectCurrentUser,
  (user) => user.component
);

export const SelectShopState = createSelector(
  selectCurrentUser,
  (user) => user.shop_state
);
