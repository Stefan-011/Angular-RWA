import { Component, HostListener, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { IgraciService } from './services/igraci.service';
import * as UserActions from '../app/store/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MajorSim';

 
  constructor(private router:Router,private store:Store<AppState>)
  {
   
  }

  ngOnInit()
  {
    if(localStorage.getItem("loggedIn") != null && localStorage.getItem("username") != null )
    {
      this.router.navigate(["home"]);
     // this.store.dispatch(UserActions.ChangeLogin({data:true}));
     this.store.dispatch(UserActions.GetLoggedUser({username:localStorage.getItem("username") + ""}))
    } 
    else
    this.router.navigate(["login"]);

  //  this.router.navigate(['teamview'])
  }




}
