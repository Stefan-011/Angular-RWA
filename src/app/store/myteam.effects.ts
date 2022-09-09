import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MyteamService } from '../services/myteam.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as UserActions from '../store/user.action';
import * as MyTeamActions from './myteam.action';
import * as ShopAction from './shop.action';
import { Sponzor } from '../models/Sponzor';
import { Injectable } from '@angular/core';
import { MyTeam } from '../models/MyTeam';
import { player } from '../models/player';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { RequestResponse } from '../models/RequestResponse';
import { ShopErrorMsg } from '../Enums/ShopErrorMsg';
import { ShopMode } from '../Enums/ShopMode';

@Injectable()
export class MyTeamEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private myteamservices: MyteamService
  ) {}

  GetMyTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MyTeamActions.GetMyTeam),
      mergeMap(({}) =>
        this.myteamservices.GetMyTeam().pipe(
          map((data: MyTeam) => {
            this.store.dispatch(
              MyTeamActions.GetMyTeamSuccess_Sponzor({ sponzor: data.sponzor })
            );
            return MyTeamActions.GetMyTeamSuccess({ MyTeam: data });
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );

  SellPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MyTeamActions.SellPlayer),
      mergeMap(({ ID, token }) =>
        this.myteamservices.SellMyPlayer(ID).pipe(
          map(() => {
            this.store.dispatch(UserActions.GetLoggedUser({ token: token }));
            return MyTeamActions.SellPlayerSuccess({ ID: ID });
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );

  BuyPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MyTeamActions.BuyPlayer),
      mergeMap(({ ID, token, NumOfPlayers }) =>
        this.myteamservices.BuyMyPlayer(ID).pipe(
          map((Response: RequestResponse<player, ShopErrorMsg>) => {
            console.log(Response.Server_response);
            if (Response.Package != undefined) {
              this.store.dispatch(UserActions.GetLoggedUser({ token: token }));
              this.store.dispatch(
                MyTeamActions.SetNumberOfPlayers({
                  PlayerCount: NumOfPlayers++,
                })
              );
              return MyTeamActions.BuyPlayerSuccess({
                NewOne: Response.Package,
              });
            } else {
              this.store.dispatch(
                ShopAction.SetErrorMsg({ ErrorMSG: Response.Server_response })
              );
              return MyTeamActions.BuyPlayerFail();
            }
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );

  addSponzor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MyTeamActions.AddSponzor),
      mergeMap(({ id, token }) =>
        this.myteamservices.AddSponzor(id).pipe(
          map((Response: RequestResponse<Sponzor, ShopErrorMsg>) => {
            this.store.dispatch(UserActions.GetLoggedUser({ token: token }));
            if (Response.Server_response == ShopErrorMsg.none) {
              return MyTeamActions.AddSponzorSuccess({
                sponzor: Response.Package,
              });
            } else {
              this.store.dispatch(
                ShopAction.SetErrorMsg({ ErrorMSG: Response.Server_response })
              );
              return MyTeamActions.AddSponzorFail();
            }
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );

  RemoveSponzor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MyTeamActions.RemoveSponzor),
      mergeMap(({ token }) =>
        this.myteamservices.RemoveSponzor().pipe(
          map((Response: RequestResponse<Sponzor, ShopErrorMsg>) => {
            this.store.dispatch(UserActions.GetLoggedUser({ token: token }));
            if (Response.Server_response == ShopErrorMsg.none) {
              var Sponzor: Sponzor = {
                id: -1,
                img: '',
                name: '',
                money: 0,
              };
              return MyTeamActions.RemoveSponzorSuccess({ sponzor: Sponzor });
            } else {
              this.store.dispatch(
                ShopAction.SetErrorMsg({ ErrorMSG: Response.Server_response })
              );
              return MyTeamActions.RemoveSponzorFail();
            }
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
}
