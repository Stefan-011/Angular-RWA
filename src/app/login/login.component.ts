import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { user } from '../models/user';

import { UserService } from '../services/user.service';
import * as UserActions from '../store/user.action';
import * as UserSelector from '../store/user.selector';
import { selectUsersname } from '../store/user.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  Mode:boolean = false; // 0 - login | 1 - register
  errorMsg:number; // -1 - default | 0 - inputi prazni | 1 - losa lozinka | 2 - vec koriscen mail | 3 - vec koriscen username | 4 - losi podaci za login
 
  constructor(private userservice:UserService,private router:Router,public store:Store<AppState>) 
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

    this.store.dispatch(UserActions.loginUser({email:email,password:password}));
    this.store.dispatch(UserActions.GetLoggedUser({username:localStorage.getItem("username") + ""}))
    //this.userservice.Login(email,password).subscribe((data)=>{console.log(data);if(data.toString() != "")this.router.navigate(["home"]);else this.errorMsg = 4;})
    
  }

  register(username:string,email:string,password:string,passwordcheck:string)
  {

    if(username.length == 0 || email.length == 0 || password.length == 0 || passwordcheck.length == 0)
    this.errorMsg = 0;    
    else
    if(password == passwordcheck)
    this.userservice.CheckEmail(email).subscribe((data)=>
    {
      if(data.toString() == "")
      this.userservice.CheckUsername(username).subscribe((data2)=>
      {
        console.log(data2)
        if(data2.toString() == "")
        this.userservice.Register(username,email,password).subscribe((data3)=>{alert("Uspesno ste se registovali!"); this.SwitchMode();})
        else
        this.errorMsg = 3;
      })
      else
      this.errorMsg = 2;
    })
    else
    this.errorMsg = 1;
  }
  
  
}
