import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { LoginUser, user } from "../models/user";
import { UserService } from "../services/user.service";
import * as UserActions from '../store/user.action';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,private userservice:UserService,private router:Router) {}

  loginUser$ = createEffect(()=>
  this.actions$.pipe(
    ofType(UserActions.loginUser),
    mergeMap(({email,password}) => this.userservice.Login(email,password).pipe(
      map((data1:LoginUser[])=> { 
        console.log(data1[0])
        localStorage.setItem("username",data1[0].username);
        localStorage.setItem("loggedIn","true");
        this.router.navigate(["home"]);
        let data = new user();
        data.username = data1[0].username;
        return UserActions.loginSuccess({data})
      }),
      catchError(()=> of({type:"load error"}))
      )
     )
    )

  );
  GetLoggedInUser$ = createEffect(()=>
  this.actions$.pipe(
    ofType(UserActions.GetLoggedUser),
    mergeMap(({username}) => this.userservice.GetUserByUsername(username).pipe(
      map((data1:user[])=> { 

        let data = data1[0];
        return UserActions.GetLoggedUserSuccess({data})
      }),
      catchError(()=> of({type:"load error"}))
      )
     )
    )

  );


  }
