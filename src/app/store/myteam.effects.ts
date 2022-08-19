import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, of } from "rxjs";
import { AppState } from "../app.state";
import { MyTeam } from "../models/MyTeam";
import { player } from "../models/player";
import { Sponzor } from "../models/Sponzor";
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
    mergeMap(({token})=> this.myteamservices.GetMyTeam(token).pipe(
      map((data:MyTeam)=>{
        console.log(data.players);
        console.log(data.sponzor)
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
    mergeMap(({ID,token})=> this.myteamservices.BuyMyPlayer(ID,token).pipe(
      map((data:player)=>{
        if(data != undefined)
        return  MyTeamActions.BuyPlayerSuccess({NewOne:data})
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
        return  MyTeamActions.RemoveSponzorSuccess({sponzor:new Sponzor()})
      }),
      catchError(()=> of({type:"load error"}))
    ))
  )
);



/*SavePlayer$ = createEffect(() =>
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

/*checkPlayer$ = createEffect(() =>
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
);*/


  }
