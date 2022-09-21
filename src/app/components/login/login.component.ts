import { Component, OnInit } from '@angular/core';
import * as UserActions from '../../store/user.action';
import * as LoginActions from '../../store/login.action';
import * as LoginSelectors from '../../store/login.selector';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { LoginMod } from 'src/app/Enums/LoginMod';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ErrorMessage } from 'src/app/Enums/ErrorMessage';
import { OperationResult } from 'src/app/Enums/OperationResult';
import { MatDialog } from '@angular/material/dialog';
import { OpenDialog } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  $LogModeObs: Observable<LoginMod>;
  $ErrorMessageObs: Observable<ErrorMessage>;
  $LoginValidity: Observable<OperationResult>;
  $RegisterValidity: Observable<OperationResult>;
  $Unsubscribe: Subject<void>;

  Mode: LoginMod;
  ErrorMsg: ErrorMessage;
  regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  constructor(public store: Store<AppState>, private matDialog: MatDialog) {
    this.$Unsubscribe = new Subject<void>();
    this.Mode = LoginMod.Login;
    this.ErrorMsg = ErrorMessage.None;

    this.$LogModeObs = this.store.select(LoginSelectors.selectLoginMode);
    this.$ErrorMessageObs = this.store.select(
      LoginSelectors.selectErrorMessage
    );
    this.$LoginValidity = this.store.select(LoginSelectors.selectLoginValidity);
    this.$RegisterValidity = this.store.select(
      LoginSelectors.selectRegisterValidity
    );
  }

  ngOnInit(): void {
    this.SetupObservers();
  }

  SetupObservers(): void {
    this.$LogModeObs.pipe(takeUntil(this.$Unsubscribe)).subscribe((Mode) => {
      this.Mode = Mode;
    });

    this.$ErrorMessageObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((Error) => {
        this.ErrorMsg = Error;
      });

    this.$LoginValidity
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((Validity) => {
        if (Validity == OperationResult.Fail)
          OpenDialog('Greska pri prijavljivanju !', this.matDialog);
        if (Validity != OperationResult.none)
          this.store.dispatch(LoginActions.RestartLogin());
      });

    this.$RegisterValidity
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((Validity) => {
        if (Validity == OperationResult.Fail)
          OpenDialog('Greska pri registraciji !', this.matDialog);
        else if (Validity == OperationResult.Success) {
          OpenDialog('Uspesna registracija !', this.matDialog);
          this.SwitchMode();
        }
        if (Validity != OperationResult.none)
          this.store.dispatch(LoginActions.RestartRegister());
      });
  }

  SwitchMode(): void {
    let NewMode: LoginMod;
    if (this.Mode == LoginMod.Login) {
      NewMode = LoginMod.Register;
    } else NewMode = LoginMod.Login;

    this.store.dispatch(LoginActions.changeMode({ Mod: NewMode }));
    this.store.dispatch(
      LoginActions.ChangeErrorMessage({ Error: ErrorMessage.None })
    );
  }

  SetLayoutByMode(): boolean {
    if (this.Mode == LoginMod.Login) return false;
    else return true;
  }

  SetErrorMessage(Error: ErrorMessage): void {
    this.store.dispatch(LoginActions.ChangeErrorMessage({ Error: Error }));
  }

  CheckErrorMessage(): ErrorMessage {
    return this.ErrorMsg;
  }

  Login(email: string, password: string): void {
    if (
      email.length == 0 ||
      password.length == 0 ||
      this.regexp.test(email) == false
    )
      this.SetErrorMessage(ErrorMessage.LoginError);
    else
      this.store.dispatch(
        UserActions.loginUser({ email: email, password: password })
      );
  }

  Register(
    username: string,
    email: string,
    password: string,
    passwordcheck: string
  ): void {
    if (this.regexp.test(email) == false) {
      this.SetErrorMessage(ErrorMessage.InvalidEmail);
      return;
    }

    if (
      username.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      passwordcheck.length == 0
    )
      this.SetErrorMessage(ErrorMessage.InvalidData);
    else if (password == passwordcheck) {
      this.store.dispatch(
        UserActions.RegisterUser({
          username: username,
          password: password,
          email: email,
        })
      );
    } else this.SetErrorMessage(ErrorMessage.InvalidPassword);
  }

  ngOnDestroy(): void {
    this.$Unsubscribe.next();
    this.$Unsubscribe.complete();
    this.$Unsubscribe.unsubscribe();
  }
}
