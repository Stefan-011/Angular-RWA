import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, of } from "rxjs";
import { AppState } from "../app.state";
import { player } from "../models/player";
import { LoginUser, user } from "../models/user";
import { IgraciService } from "../services/igraci.service";
import { MyteamService } from "../services/myteam.service";
import * as MyTeamActions from './myteam.action';


@Injectable()
export class MyTeamEffects {
  constructor(private actions$: Actions,private router:Router,private myteamservices:MyteamService,private store:Store<AppState>,private igraciservice:IgraciService) {}

  GetMyTeam$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MyTeamActions.GetMyTeam),
    mergeMap(({name})=> this.myteamservices.GetMyTeam(name).pipe(
      map((data:player[])=>{
        console.log(data);
        return MyTeamActions.GetMyTeamSuccess({MyTeam:data});
      }),
      catchError(()=> of({type:"load error"}))
    ))
  )
);

SellPlayer$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MyTeamActions.SellPlayer),
    mergeMap(({ID})=> this.myteamservices.SellMyPlayer(ID).pipe(
      map(()=>{
        console.log("wat")
        return MyTeamActions.SellPlayerSuccess({ID:ID});
      }),
      catchError(()=> of({type:"load error"}))
    ))
  )
);

BuyPlayer$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MyTeamActions.BuyPlayer),
    mergeMap(({ID,username})=> this.igraciservice.GetPlayernameID(ID).pipe(
      map((data:player)=>{
        console.log(data)
        this.store.dispatch(MyTeamActions.BuyPlayerSaved({NewOne:data,username:username}));
        return  MyTeamActions.BuyPlayerSuccess({NewOne:data})
      }),
      catchError(()=> of({type:"load error"}))
    ))
  )
);

SavePlayer$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MyTeamActions.BuyPlayerSaved),
    mergeMap(({NewOne,username})=> this.myteamservices.BuyMyPlayer(NewOne,username).pipe(
      map(()=>{
        return MyTeamActions.BuyPlayerSavedSuccess();
      }),
      catchError(()=> of({type:"load error"}))
    ))
  )
);

checkPlayer$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MyTeamActions.CheckMyPlayer),
    mergeMap(({nick,username,ID})=>this.myteamservices.CheckMyPlayer(nick,username).pipe(
     map((data:player[])=>{
        if(data[0] == undefined)     
        return  MyTeamActions.BuyPlayer({ID:ID,username:username})
       else
       return MyTeamActions.CheckMyPlayerFail();

      }),
      catchError(()=> of({type:"load error"}))
    ))
  )
);


  }
