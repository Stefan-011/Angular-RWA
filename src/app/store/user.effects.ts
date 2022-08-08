import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { user } from "../models/user";
import { UserService } from "../services/user.service";
import * as UserActions from '../store/user.action';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,private userservice:UserService) {}

  loginUser$ = createEffect(()=>
  this.actions$.pipe(
    ofType(UserActions.loginUser),
    mergeMap((info) => this.userservice.Login(info.email,info.password).pipe(
      map((data)=>UserActions.loginSuccess({data:data})),
      catchError(()=>of({type:"load error"}))
      )
     )
    )
  );


  }
