import { createAction, props } from '@ngrx/store';
import { CRUDState } from '../Enums/CRUDState';
import { PanelErrorMessage } from '../Enums/PanelErrorMessage';
import { PanelMode } from '../Enums/Panelmode';
import { MyTeam } from '../models/MyTeam';
import { player } from '../models/player';
import { Sponzor } from '../models/Sponzor';
import { TeamSablon } from '../models/TeamSablon';

export const SetPlayer = createAction('SetPlayer', props<{ Player: player }>());

export const SetTeam = createAction('SetTeam', props<{ Team: TeamSablon }>());

export const SetSponzor = createAction(
  'SetSponzor',
  props<{ Sponzor: Sponzor }>()
);

export const GetPlayerList = createAction(
  'GetPlayerList',
  props<{ TeamId: number }>()
);

export const SetPlayerList = createAction(
  'SetPlayerList',
  props<{ PlayerList: player[] }>()
);

export const GetTeamList = createAction('GetTeamList');

export const SetTeamList = createAction(
  'SetTeamList',
  props<{ TeamList: TeamSablon[] }>()
);

export const GetSponzorList = createAction('GetSponzorList');

export const SetSponzorList = createAction(
  'SetSponzorList',
  props<{ SponzorList: Sponzor[] }>()
);

export const SetErrorMessage = createAction(
  'SetErrrorMessage',
  props<{ ErrorMsg: PanelErrorMessage }>()
);

export const SetPanelMode = createAction(
  'SetPanelMode',
  props<{ Mode: PanelMode }>()
);

export const CreatePlayer = createAction(
  'CreatePlayer',
  props<{ Player: player; TeamID: number }>()
);

export const CreateSponzor = createAction(
  'CreateSponzor',
  props<{ Sponzor: Sponzor }>()
);

export const CreateTeam = createAction(
  'CreateTeam',
  props<{ Team: TeamSablon }>()
);

export const EditPlayer = createAction(
  'EditPlayer',
  props<{ Player: player; TeamID: number }>()
);

export const EditSponzor = createAction(
  'EditSponzor',
  props<{ Sponzor: Sponzor }>()
);

export const EditTeam = createAction('EditTeam', props<{ Team: TeamSablon }>());

export const DeletePlayer = createAction(
  'DeletePlayer',
  props<{ PlayerID: number }>()
);

export const DeleteSponzor = createAction(
  'DeleteSponzor',
  props<{ SponzorID: number }>()
);

export const DeleteTeam = createAction(
  'DeleteTeam',
  props<{ TeamID: number }>()
);

export const SetCRUDState = createAction(
  'SetCRUDState',
  props<{ Operation: CRUDState }>()
);
