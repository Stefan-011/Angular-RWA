import { Component, OnInit, Output } from '@angular/core';
import { GetMyTeam } from 'src/app/store/myteam.action';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import * as UserActions from '../store/user.action';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
//---------- Pomocne promenjive ----------//
  Mode:boolean = false; // Promenjiva koja odredjuje mod komponente (0 - login | 1 - register)
  errorMsg:number; // Promenjiva koja odredjuje vrstu error-a (-1 - default | 0 - inputi prazni | 1 - losa lozinka | 2 - vec koriscen mail | 3 - vec koriscen username | 4 - losi podaci za login)
 //--------------------------------------//

  constructor(
    private userservice:UserService,
    public store:Store<AppState>,
    private router:Router,
    private cookieservice:CookieService
  ) 
  { 
  this.Mode = false;
  this.errorMsg = -1;
  }



  ngOnInit(): void {
    this.Mode = false;
  }

  SwitchMode():void
  {
    var loginDiv = document.getElementById("login") as HTMLDivElement;
    if(this.Mode)
    {
      this.Mode = false;
      loginDiv.style.height = "50vh" 
    }
    else
    {
      this.Mode = true;
      loginDiv.style.height = "60vh" 
    }
    this.errorMsg = -1;
  }


  login(email:string,password:string):void
  {
    if(email.length == 0 || password.length == 0 )
    this.errorMsg = 4
    this.store.dispatch(UserActions.loginUser({email:email,password:password}));
    this.store.dispatch(GetMyTeam({token:this.cookieservice.get("token")}))
  }


  register(username:string,email:string,password:string,passwordcheck:string)
  {

    if(username.length == 0 || email.length == 0 || password.length == 0 || passwordcheck.length == 0)
      this.errorMsg = 0;    
    else
      if(password == passwordcheck)
        this.store.dispatch(UserActions.RegisterUser({username:username,password:password,email:email}))
        this.Mode = false;
  }
   
  
}
