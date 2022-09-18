import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IncomingPackage } from '../models/IncomingPackage';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import * as UserActions from 'src/app/store/user.action';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private store: Store<AppState>
  ) {}

  Login(email: string, password: string) {
    return this.http.post<IncomingPackage>(environment.api + `/auth/login`, {
      username: email.toLowerCase(),
      password: password,
    });
  }

  Register(username: string, email: string, password: string) {
    return this.http.post<boolean>(environment.api + '/auth/register', {
      username: username.toLowerCase(),
      password: password,
      email: email.toLowerCase(),
    });
  }

  GetUserByToken() {
    return this.http.get<user>(environment.api + `/user/GetMyProfile`);
  }

  Loggout() {
    localStorage.clear();
    this.cookies.deleteAll();
    this.store.dispatch(UserActions.LogoutUser());
  }
}
