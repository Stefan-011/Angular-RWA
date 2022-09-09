import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IncomingPackage } from '../models/IncomingPackage';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { Role } from '../Enums/Role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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
}
