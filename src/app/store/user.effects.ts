import { Store } from "@ngrx/store";
import { user } from "../models/user";
import { AppState } from "../app.state";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {CookieService} from 'ngx-cookie-service';
import * as UserActions from '../store/user.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { UserService } from "../services/user.service";
import { GetMyTeam } from 'src/app/store/myteam.action';
import { IncomingPackage } from "../models/IncomingPackage";
import { Actions, createEffect, ofType } from "@ngrx/effects";



@Injectable()
export class UserEffects {
  constructor(
    private router:Router,
    private actions$: Actions,
    private store:Store<AppState>, 
    private userservice:UserService,
    private cookieService:CookieService
    ) {}

  loginUser$ = createEffect(()=>
  this.actions$.pipe(
    ofType(UserActions.loginUser),
    mergeMap(({email,password}) => this.userservice.Login(email,password).pipe(
      map((data1:IncomingPackage)=> { 
        if(data1 == undefined)
        alert("Uneli ste pogresne podatke !")

        this.cookieService.delete("token");
        this.cookieService.set("token",data1.access_token,{ expires: new Date(new Date().getTime() + 3600 * 1000)})

        localStorage.clear()
        localStorage.setItem("loggedIn","true");

        this.router.navigate(["home"]);

        let data = new user();
        data.money = data1.data.money;
        data.username = data1.data.username
        this.store.dispatch(GetMyTeam({token:data1.access_token}))
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
    mergeMap(({token}) => this.userservice.GetUserByToken(token).pipe(
      map((data:user)=> { 
        return UserActions.GetLoggedUserSuccess({data})
      }),
      catchError(()=> of({type:"load error"}))
      )
     )
    )
  );

  registerUser$ = createEffect(()=>
  this.actions$.pipe(
    ofType(UserActions.RegisterUser),
    mergeMap(({username,email,password}) => this.userservice.Register(username,email,password).pipe(
      map((data:boolean)=> 
      { 
        if(data==true)
        alert("Uspesno registrovanje!")
        else
        alert("Greska pri registovanju !")

         this.store.dispatch(UserActions.CreateUser({username:username}));
         return UserActions.RegisterUserSuccess();
      }),
      catchError(()=> of({type:"load error"}))
      )
     )
    )
  );

  createUser$ = createEffect(()=>
  this.actions$.pipe(
    ofType(UserActions.CreateUser),
    mergeMap(({username}) => this.userservice.CreateUser(username).pipe(
      map(()=> 
      { 
        alert("Uspesno ste se registovali!");
         return UserActions.CreateUserSuccess();
      }),
      catchError(()=> of({type:"load error"}))
      )
     )
    )
  );

  }
