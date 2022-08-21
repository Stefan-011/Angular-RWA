import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MyteamService } from "../services/myteam.service";
import { catchError, map, mergeMap, of } from "rxjs";
import * as UserActions from "../store/user.action";
import * as MyTeamActions from './myteam.action';
import { Sponzor } from "../models/Sponzor";
import { Injectable } from "@angular/core";
import { MyTeam } from "../models/MyTeam";
import { player } from "../models/player";
import { AppState } from "../app.state";
import { Store } from "@ngrx/store";


@Injectable()
export class MyTeamEffects {
  constructor(
    private actions$:Actions,
    private store:Store<AppState>,
    private myteamservices:MyteamService
    ) {}

  GetMyTeam$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MyTeamActions.GetMyTeam),
    mergeMap(({token})=> this.myteamservices.GetMyTeam(token).pipe(
      map((data:MyTeam)=>{
        this.store.dispatch(MyTeamActions.GetMyTeamSuccess_Sponzor({sponzor:data.sponzor}))
        return MyTeamActions.GetMyTeamSuccess({MyTeam:data});
      }),
      catchError(()=> of({type:"load error"}))
    ))
  )
);

SellPlayer$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MyTeamActions.SellPlayer),
    mergeMap(({ID,token})=> this.myteamservices.SellMyPlayer(ID,token).pipe(
      map(()=>{
        this.store.dispatch(UserActions.GetLoggedUser({token:token}));
        return MyTeamActions.SellPlayerSuccess({ID:ID});
      }),
      catchError(()=> of({type:"load error"}))
    ))
  )
);

BuyPlayer$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MyTeamActions.BuyPlayer),
    mergeMap(({ID,token})=> this.myteamservices.BuyMyPlayer(ID,token).pipe(
      map((data:player)=>{
        if(data != undefined)
        {
          this.store.dispatch(UserActions.GetLoggedUser({token:token}));
          return  MyTeamActions.BuyPlayerSuccess({NewOne:data})
        }   
        else
        return MyTeamActions.BuyPlayerFail();
      }),
      catchError(()=> of({type:"load error"}))
    ))
  )
);

addSponzor$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MyTeamActions.AddSponzor),
    mergeMap(({id,token})=> this.myteamservices.AddSponzor(token,id).pipe(
      map((data:Sponzor)=>{  
        this.store.dispatch(UserActions.GetLoggedUser({token:token}));
        return  MyTeamActions.AddSponzorSuccess({sponzor:data})
      }),
      catchError(()=> of({type:"load error"}))
    ))
  )
);

RemoveSponzor$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MyTeamActions.RemoveSponzor),
    mergeMap(({token})=> this.myteamservices.RemoveSponzor(token).pipe(
      map(()=>{  
        this.store.dispatch(UserActions.GetLoggedUser({token:token}));
        return  MyTeamActions.RemoveSponzorSuccess({sponzor:new Sponzor()})
      }),
      catchError(()=> of({type:"load error"}))
    ))
  )
);

  }
