import { Component, HostListener, OnInit, Output } from '@angular/core';
import * as UserActions from '../../store/user.action';

import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  Mode:boolean = false;
  errorMsg:number; 
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  constructor(
    public store:Store<AppState>,
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
    this.Mode = !this.Mode;
    this.errorMsg = -1;
  }


  login(email:string,password:string):void
  {
    if(email.length == 0 || password.length == 0 || (this.regexp.test(email) == false))
    this.errorMsg = 4
    this.store.dispatch(UserActions.loginUser({email:email,password:password}));
  }


  register(username:string,email:string,password:string,passwordcheck:string)
  {
    if(this.regexp.test(email) == false)
    {
      this.errorMsg = 2; 
      return;
    }

    if(username.length == 0 || email.length == 0 || password.length == 0 || passwordcheck.length == 0 )
      this.errorMsg = 0;    
    else
      if(password == passwordcheck)
      {
        this.store.dispatch(UserActions.RegisterUser({username:username,password:password,email:email}))
        this.Mode = false;
      }     
      else
      this.errorMsg = 1; 
      
  }
   
  
}
