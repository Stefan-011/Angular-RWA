import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  LoginUser, user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  Login(email:string,password:string)
  {
    return this.http.get<LoginUser[]>(environment.api + `/LoginData?email=${email.toLowerCase()}&&password=${password}`);
  }

  CheckEmail(email:string)
  {
    return this.http.get(environment.api + `/LoginData?email=${email.toLowerCase()}`);
  }

  CheckUsername(username:string)
  {
    return this.http.get(environment.api + `/LoginData?username=${username.toLowerCase()}`);
  }

  Register(username:string,email:string,password:string)
  { 
      return this.http.post(environment.api + "/LoginData/",{username:username.toLowerCase(),password:password,email:email.toLowerCase()});
  }

  GetUserByUsername(username:string)
  {
    return this.http.get<user[]>(environment.api + `/korisnici?username=${username.toLowerCase()}`);
  }

  CreateUser(username:string)
  {
    let NewOne = new user();
    alert(username)
    NewOne.username = username;
   
    return this.http.post<user[]>(environment.api + `/korisnici`,NewOne);
  }

    
 
  
}
