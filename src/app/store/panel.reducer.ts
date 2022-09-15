import { createReducer, on } from '@ngrx/store';
import * as PanelAction from './panel.action';
import { player } from '../models/player';
import { Sponzor } from '../models/Sponzor';
import { TeamSablon } from '../models/TeamSablon';
import { PanelMode } from '../Enums/Panelmode';
import { PanelErrorMessage } from '../Enums/PanelErrorMessage';
import { CRUDState } from '../Enums/CRUDState';

export interface PanelState {
  PanelMode: PanelMode;
  Player: player;
  Sponzor: Sponzor;
  Team: TeamSablon;
  TeamList: TeamSablon[];
  PlayerList: player[];
  SponzorList: Sponzor[];
  ErrorMessage: PanelErrorMessage;
  CRUDState: CRUDState;
}

export const initialState: PanelState = {
  ErrorMessage: PanelErrorMessage.default,
  PanelMode: PanelMode.DEFAULT,
  Player: {
    id: -1,
    kd: 0,
    img: '',
    nick: '',
    team: '',
    price: 0,
    name: '',
    lname: '',
    impact: 0,
    rating: 0,
  },
  Sponzor: {
    id: -1,
    img: '',
    money: 0,
    name: '',
  },
  Team: {
    id: -1,
    name: '',
  },
  TeamList: [],
  PlayerList: [],
  SponzorList: [],
  CRUDState: CRUDState.DEFAULT,
};

export const PanelReducer = createReducer(
  initialState,
  on(PanelAction.SetErrorMessage, (state, { ErrorMsg }) => ({
    ...state,
    ErrorMessage: ErrorMsg,
  })),

  on(PanelAction.SetPanelMode, (state, { Mode }) => ({
    ...state,
    PanelMode: Mode,
  })),

  on(PanelAction.SetPlayer, (state, { Player }) => ({
    ...state,
    Player: Player,
  })),

  on(PanelAction.SetSponzor, (state, { Sponzor }) => ({
    ...state,
    Sponzor: Sponzor,
  })),

  on(PanelAction.SetTeam, (state, { Team }) => ({
    ...state,
    Team: Team,
  })),

  on(PanelAction.SetTeamList, (state, { TeamList }) => ({
    ...state,
    TeamList: TeamList,
  })),

  on(PanelAction.SetSponzorList, (state, { SponzorList }) => ({
    ...state,
    SponzorList: SponzorList,
  })),

  on(PanelAction.SetPlayerList, (state, { PlayerList }) => ({
    ...state,
    PlayerList: PlayerList,
  })),

  on(PanelAction.SetCRUDState, (state, { Operation }) => ({
    ...state,
    CRUDState: Operation,
  })),
  on(PanelAction.ClearState, (state, {}) => ({
    ...state,
    ErrorMessage: PanelErrorMessage.default,
    PanelMode: PanelMode.DEFAULT,
    Player: {
      id: -1,
      kd: 0,
      img: '',
      nick: '',
      team: '',
      price: 0,
      name: '',
      lname: '',
      impact: 0,
      rating: 0,
    },
    Sponzor: {
      id: -1,
      img: '',
      money: 0,
      name: '',
    },
    Team: {
      id: -1,
      name: '',
    },
    TeamList: [],
    PlayerList: [],
    SponzorList: [],
    CRUDState: CRUDState.DEFAULT,
  }))
);
