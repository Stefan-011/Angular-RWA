import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { IgraciService } from '../services/igraci.service';
import * as UserSelectors from 'src/app/store/user.selector'
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { user } from '../models/user';
import { state } from '@angular/animations';
import * as UserActions from '../store/user.action';
import { Router } from '@angular/router';
import * as OtherTeamAction from "src/app/store/Otherteam.action"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ruta:number;
  MenuState:boolean;// Promenjiva koja aktivira collapse menu
  $username:Observable<string | undefined>;
  $LogState:Observable<boolean>
  LogState:boolean;
  @Input() Username:string;
 
  
  constructor(private igraciservis:IgraciService,private store:Store<AppState>,private route:Router)
  {
    this.ruta = -1;
    this.MenuState = false;
    this.LogState = false;
    this.Username = "";
    this.$username = this.store.select(UserSelectors.selectUsersname);
    this.$LogState = this.store.select(UserSelectors.selectLoggedIn);
    this.$username.subscribe((data)=>{this.Username = data+""}); 
  }

  ngOnInit():void
  {
    this.$LogState.subscribe((data)=>this.LogState = data);
    //this.igraciservis.GetTeamPlayers("G2").subscribe((data)=>console.log(data));
   // this.store.subscribe((state)=> alert(state.user.loggedIn));
   // this.test.Test().subscribe();
   // this.test.TestGet().subscribe((data)=>{console.log(data.money)});
  }

  switchR(text:string)
  {
    switch(text)
    {
      case "sim":
        this.ruta = 0;
        break;
        case "myteam":
          this.store.dispatch(UserActions.SetComponent({comp:"myteam"}))
        this.ruta = 1;
        break;
        case "shop":
      this.store.dispatch(UserActions.SetComponent({comp:"shop"}))
        this.ruta = 1;
        break;
        default :
        this.ruta = -1;
        break;
    }
  }

// Listener koji gleda promenu sirine ekrana
@HostListener('window:resize', ['$event'])
onWindowResize(): void 
{
  let  getScreenWidth = window.innerWidth;
  if(getScreenWidth >= 991 && this.MenuState == true)
  this.MenuState = false;
}
OpenCollapse()
{
  let  getScreenWidth = window.innerWidth;
  getScreenWidth = window.innerWidth;
  if(getScreenWidth <= 991 && this.MenuState == false)
  this.MenuState = true;
  else
    this.MenuState = false;
}

logout()
{
  localStorage.clear();
  this.route.navigate(["login"]);
}

OnDestroy()
{
  //this.$LogState.unsubsribe()
}


}
