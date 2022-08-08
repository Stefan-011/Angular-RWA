import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  Login(email:string,password:string)
  {
    return this.http.get<user>(environment.api + `/korisnici?email=${email.toLowerCase()}&&password=${password}`);
  }

  CheckEmail(email:string)
  {
    return this.http.get(environment.api + `/korisnici?email=${email.toLowerCase()}`);
  }

  CheckUsername(username:string)
  {
    return this.http.get(environment.api + `/korisnici?username=${username.toLowerCase()}`);
  }

  Register(username:string,email:string,password:string)
  {
      return this.http.post(environment.api + "/korisnici/",{username:username.toLowerCase(),password:password,email:email.toLowerCase()});
  }

  GetUserByUsername(username:string)
  {
    return this.http.get<user>(environment.api + `/korisnici?email=${username.toLowerCase()}`);
  }

    
 
  
}
