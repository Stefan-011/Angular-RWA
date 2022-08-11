import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, of } from "rxjs";
import * as OtherTeamAction from "src/app/store/Otherteam.action"
import { AppState } from "../app.state";
import { player } from "../models/player";
import { IgraciService } from "../services/igraci.service";


@Injectable()
export class OtherTeamEffects {
constructor(private actions$: Actions,private igraciservice:IgraciService,private store:Store<AppState>) {}

GetAllTeams$ = createEffect(() =>
  this.actions$.pipe(
    ofType(OtherTeamAction.GetAllPlayers),
    mergeMap(({name})=> this.igraciservice.GetTeamPlayers(name).pipe(
      map((data:player[])=>{
        console.log(data);
        this.store.dispatch(OtherTeamAction.SetName({name:name}));
        return OtherTeamAction.GetAllPlayersSuccess({data,name});
      })
    ))
  )
);

}