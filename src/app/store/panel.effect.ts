import * as PanelAction from 'src/app/store/panel.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IgraciService } from '../services/igraci.service';
import { Injectable } from '@angular/core';
import { player } from '../models/player';
import { AppState } from '../app.state';
import { map, mergeMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { SponzorService } from '../services/sponzor.service';
import { MyteamService } from '../services/myteam.service';
import { Sponzor } from '../models/Sponzor';
import { RequestResponse } from '../models/RequestResponse';
import { PanelErrorMessage } from '../Enums/PanelErrorMessage';
import { TeamSablon } from '../models/TeamSablon';

@Injectable()
export class PanelEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private IgraciService: IgraciService,
    private SponzorService: SponzorService,
    private MyteamService: MyteamService
  ) {}

  GetTeamList = createEffect(() =>
    this.actions$.pipe(
      ofType(PanelAction.GetTeamList),
      mergeMap(({}) =>
        this.MyteamService.GetAllTeams().pipe(
          map((Response: RequestResponse<TeamSablon[], PanelErrorMessage>) => {
            PanelAction.SetErrorMessage({
              ErrorMsg: Response.Server_response,
            });
            return PanelAction.SetTeamList({ TeamList: Response.Package });
          })
        )
      )
    )
  );

  GetSponzorList = createEffect(() =>
    this.actions$.pipe(
      ofType(PanelAction.GetSponzorList),
      mergeMap(({}) =>
        this.SponzorService.GetAll().pipe(
          map((SponzorList: Sponzor[]) => {
            return PanelAction.SetSponzorList({ SponzorList: SponzorList });
          })
        )
      )
    )
  );

  GetPlayerList = createEffect(() =>
    this.actions$.pipe(
      ofType(PanelAction.GetPlayerList),
      mergeMap(({ TeamId }) =>
        this.IgraciService.GetTeamPlayersByTeamID(TeamId).pipe(
          map((PlayerList: player[]) => {
            return PanelAction.SetPlayerList({ PlayerList: PlayerList });
          })
        )
      )
    )
  );

  CreatePlayer = createEffect(() =>
    this.actions$.pipe(
      ofType(PanelAction.CreatePlayer),
      mergeMap(({ Player, TeamID }) =>
        this.IgraciService.CreatePlayer(Player, TeamID).pipe(
          map((Response: RequestResponse<any, PanelErrorMessage>) => {
            console.log(Response);
            return PanelAction.SetErrorMessage({
              ErrorMsg: Response.Server_response,
            });
          })
        )
      )
    )
  );

  EditPlayer = createEffect(() =>
    this.actions$.pipe(
      ofType(PanelAction.EditPlayer),
      mergeMap(({ Player, TeamID }) =>
        this.IgraciService.EditPlayer(Player, TeamID).pipe(
          map((Response: RequestResponse<any, PanelErrorMessage>) => {
            console.log(Response);
            return PanelAction.SetErrorMessage({
              ErrorMsg: Response.Server_response,
            });
          })
        )
      )
    )
  );

  DeletePlayer = createEffect(() =>
    this.actions$.pipe(
      ofType(PanelAction.DeletePlayer),
      mergeMap(({ PlayerID }) =>
        this.IgraciService.DeletePlayer(PlayerID).pipe(
          map((Response: RequestResponse<any, PanelErrorMessage>) => {
            return PanelAction.SetErrorMessage({
              ErrorMsg: Response.Server_response,
            });
          })
        )
      )
    )
  );

  CreateSponzor = createEffect(() =>
    this.actions$.pipe(
      ofType(PanelAction.CreateSponzor),
      mergeMap(({ Sponzor }) =>
        this.SponzorService.CreateSponzor(Sponzor).pipe(
          map((Response: RequestResponse<any, PanelErrorMessage>) => {
            return PanelAction.SetErrorMessage({
              ErrorMsg: Response.Server_response,
            });
          })
        )
      )
    )
  );

  DeleteSponzor = createEffect(() =>
    this.actions$.pipe(
      ofType(PanelAction.DeleteSponzor),
      mergeMap(({ SponzorID }) =>
        this.SponzorService.DeleteSponzor(SponzorID).pipe(
          map((Response: RequestResponse<any, PanelErrorMessage>) => {
            return PanelAction.SetErrorMessage({
              ErrorMsg: Response.Server_response,
            });
          })
        )
      )
    )
  );

  EditSponzor = createEffect(() =>
    this.actions$.pipe(
      ofType(PanelAction.EditSponzor),
      mergeMap(({ Sponzor }) =>
        this.SponzorService.EditSponzor(Sponzor).pipe(
          map((Response: RequestResponse<any, PanelErrorMessage>) => {
            return PanelAction.SetErrorMessage({
              ErrorMsg: Response.Server_response,
            });
          })
        )
      )
    )
  );

  CreateTeam = createEffect(() =>
    this.actions$.pipe(
      ofType(PanelAction.CreateTeam),
      mergeMap(({ Team }) =>
        this.MyteamService.CreateTeam(Team).pipe(
          map((Response: RequestResponse<any, PanelErrorMessage>) => {
            return PanelAction.SetErrorMessage({
              ErrorMsg: Response.Server_response,
            });
          })
        )
      )
    )
  );

  EditTeam = createEffect(() =>
    this.actions$.pipe(
      ofType(PanelAction.EditTeam),
      mergeMap(({ Team }) =>
        this.MyteamService.EditTeam(Team).pipe(
          map((Response: RequestResponse<any, PanelErrorMessage>) => {
            console.log(Response);
            return PanelAction.SetErrorMessage({
              ErrorMsg: Response.Server_response,
            });
          })
        )
      )
    )
  );

  DeleteTeam = createEffect(() =>
    this.actions$.pipe(
      ofType(PanelAction.DeleteTeam),
      mergeMap(({ TeamID }) =>
        this.MyteamService.DeleteTeam(TeamID).pipe(
          map((Response: RequestResponse<any, PanelErrorMessage>) => {
            console.log(Response);
            return PanelAction.SetErrorMessage({
              ErrorMsg: Response.Server_response,
            });
          })
        )
      )
    )
  );
}
