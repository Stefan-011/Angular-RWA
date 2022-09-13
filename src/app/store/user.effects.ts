import { Store } from '@ngrx/store';
import { user } from '../models/user';
import { AppState } from '../app.state';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as UserActions from '../store/user.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { GetMyTeam } from 'src/app/store/myteam.action';
import { IncomingPackage } from '../models/IncomingPackage';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LoginActions from '../../app/store/login.action';
import { OperationResult } from '../Enums/OperationResult';

@Injectable()
export class UserEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store<AppState>,
    private userservice: UserService,
    private cookieService: CookieService
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      mergeMap(({ email, password }) =>
        this.userservice.Login(email, password).pipe(
          map((Package: IncomingPackage) => {
            this.store.dispatch(
              LoginActions.LoginIsValid({
                Result: OperationResult.Success,
              })
            );

            this.cookieService.delete('token');
            this.cookieService.set('token', Package.access_token, {
              expires: new Date(new Date().getTime() + 3600 * 1000),
            });

            localStorage.clear();
            localStorage.setItem('loggedIn', 'true');

            this.router.navigate(['home']);

            this.store.dispatch(GetMyTeam());
            return UserActions.loginSuccess({ user: Package.user_data });
          }),
          catchError(() => {
            alert('Fail');
            this.store.dispatch(
              LoginActions.LoginIsNotValid({ Result: OperationResult.Fail })
            );
            return of({ type: 'load error' });
          })
        )
      )
    )
  );

  GetLoggedInUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.GetLoggedUser),
      mergeMap(() =>
        this.userservice.GetUserByToken().pipe(
          map((FoundUser: user) => {
            return UserActions.GetLoggedUserSuccess({ user: FoundUser });
          }),
          catchError(() => {
            localStorage.clear();
            this.cookieService.deleteAll();
            this.router.navigate(['login']);
            return of({ type: 'load error' });
          })
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.RegisterUser),
      mergeMap(({ username, email, password }) =>
        this.userservice.Register(username, email, password).pipe(
          map(() => {
            this.store.dispatch(
              LoginActions.RegisterIsValid({
                Result: OperationResult.Success,
              })
            );
            return UserActions.RegisterUserSuccess();
          }),
          catchError(() => {
            this.store.dispatch(
              LoginActions.RegisterIsNotValid({ Result: OperationResult.Fail })
            );
            return of({ type: 'load error' });
          })
        )
      )
    )
  );
}
