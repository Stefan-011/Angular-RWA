import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  Login(email:String,password:String)
  {
    return this.http.get(environment.api + `/korisnici?email=${email}&&password=${password}`);
  }

  CheckEmail(email:String)
  {
    return this.http.get(environment.api + `/korisnici?email=${email}`);
  }

  CheckUsername(username:String)
  {
    return this.http.get(environment.api + `/korisnici?username=${username}`);
  }

  Register(username:string,email:string,password:string)
  {
      return this.http.post(environment.api + "/korisnici/",{username:username,password:password,email:email});
  }

    
 
  
}
