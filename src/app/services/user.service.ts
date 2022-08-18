import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IncomingPackage } from '../models/IncomingPackage';
import {  LoginUser, user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  Login(email:string,password:string) // RADI !!
  {
    return this.http.post<IncomingPackage>(environment.api + `/auth/login`,{username:email,password:password});
  }


  Register(username:string,email:string,password:string)
  { 
      return this.http.post<boolean>(environment.api + "/auth/register",{username:username.toLowerCase(),password:password,email:email.toLowerCase()});
  }

  GetUserByToken(token: string) // RADI !!
  {
    var headers_object = new HttpHeaders({
      'Authorization': "Bearer " + token,
      'Content-Type': 'application/json',
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.http.get<user>(environment.api + `/user/GetMyProfile`,httpOptions);
  }

  CreateUser(username:string) // VRV se brise
  {
    let NewOne = new user();
    alert(username)
    NewOne.username = username;
   
    return this.http.post<user[]>(environment.api + `/korisnici`,NewOne);
  }

    

  
 
  
}
