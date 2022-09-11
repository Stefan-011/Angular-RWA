import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { IMap } from '../models/IMap';

export const SelectPanelState = createSelector(
  (state: AppState) => state.Panel,
  (Panel) => Panel
);

export const SelectPanelMode = createSelector(
  SelectPanelState,
  (Panel) => Panel.PanelMode
);

export const SelectErrorMessage = createSelector(
  SelectPanelState,
  (Panel) => Panel.ErrorMessage
);

export const SelectPlayer = createSelector(
  SelectPanelState,
  (Panel) => Panel.Player
);

export const SelectTeam = createSelector(
  SelectPanelState,
  (Panel) => Panel.Team
);

export const SelectSponzor = createSelector(
  SelectPanelState,
  (Panel) => Panel.Sponzor
);

export const SelectPlayerList = createSelector(
  SelectPanelState,
  (Panel) => Panel.PlayerList
);

export const SelectTeamList = createSelector(
  SelectPanelState,
  (Panel) => Panel.TeamList
);

export const SelectSponzorList = createSelector(
  SelectPanelState,
  (Panel) => Panel.SponzorList
);

export const SelectCRUDState = createSelector(
  SelectPanelState,
  (Panel) => Panel.CRUDState
);
