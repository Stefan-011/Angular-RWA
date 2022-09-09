import { Store } from '@ngrx/store';
import { user } from '../models/user';
import { AppState } from '../app.state';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as UserActions from './user.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { GetMyTeam } from 'src/app/store/myteam.action';
import { IncomingPackage } from '../models/IncomingPackage';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class LoginEffects {
  constructor() {}
}
