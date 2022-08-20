import * as OtherTeamAction from "src/app/store/Otherteam.action"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IgraciService } from "../services/igraci.service";
import { Injectable } from "@angular/core";
import { player } from "../models/player";
import { AppState } from "../app.state";
import { map, mergeMap } from "rxjs";
import { Store } from "@ngrx/store";


@Injectable()
export class OtherTeamEffects {
  
constructor(
  private actions$: Actions,
  private store:Store<AppState>,
  private igraciservice:IgraciService
  ) {}

GetAllTeams$ = createEffect(() =>
  this.actions$.pipe(
    ofType(OtherTeamAction.GetAllPlayers),
    mergeMap(({name})=> this.igraciservice.GetTeamPlayers(name).pipe(
      map((data:player[])=>{
        this.store.dispatch(OtherTeamAction.SetName({name:name}));
        return OtherTeamAction.GetAllPlayersSuccess({data,name});
      })
    ))
  )
);

}