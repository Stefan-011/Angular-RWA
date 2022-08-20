import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { OutletContext, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { IgraciService } from './services/igraci.service';
import * as UserActions from '../app/store/user.action';
import { MyteamService } from './services/myteam.service';
import { selectUsersname } from './store/user.selector';
import { GetMyTeam } from './store/myteam.action';
import { CookieService } from 'ngx-cookie-service';
import { SponzorService } from './services/sponzor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MajorSim';

 
  constructor(
    private router:Router,
    private store:Store<AppState>, 
    private cookieservice:CookieService,
    private test:SponzorService
    ){}
  

  ngOnInit():void
  {
    if(localStorage.getItem("loggedIn") != null && this.cookieservice.get("token") != '' ) // rutiranje u zavisnosti od toga da li je korisnik ulogovan ili ne
    {
     this.router.navigate(["home"]);
     this.store.dispatch(GetMyTeam({token:this.cookieservice.get("token")}))
     this.store.dispatch(UserActions.GetLoggedUser({token:this.cookieservice.get("token")}))   
    } 
    else
    this.router.navigate(["login"]);
}




}
