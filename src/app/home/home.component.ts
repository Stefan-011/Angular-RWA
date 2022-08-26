import { Component, HostListener, Input, OnInit} from '@angular/core';
import * as UserSelectors from 'src/app/store/user.selector';
import * as UserActions from '../store/user.action';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() Username:string; 

  $username:Observable<string | undefined>;
  $LogState:Observable<boolean>;

  Ruta:number;
  LogState:boolean; 
  MenuState:boolean;

 
  constructor(
    private cookies:CookieService,
    private store:Store<AppState>,
    private route:Router 
    )
  {
    this.Ruta = -1;
    this.Username = "";
    this.LogState = false;
    this.MenuState = false; 
    this.$LogState = this.store.select(UserSelectors.selectLoggedIn);
    this.$username = this.store.select(UserSelectors.selectUsersname);
    
  }

  
  ngOnInit():void
  {
    this.$username.subscribe((data)=>{this.Username = data+""}); 
    this.$LogState.subscribe((data)=>this.LogState = data);
  }


  switchR(text:string):void
  {
    switch(text)
    {
      case "sim":
        this.Ruta = 0;
      break;

      case "myteam":
        this.store.dispatch(UserActions.SetComponent({comp:"myteam"}))
        this.Ruta = 1;
      break;

      case "shop":
        this.store.dispatch(UserActions.SetComponent({comp:"shop"}))
        this.Ruta = 1;
      break;

      default :
        this.Ruta = -1;
      break;
    }
  }



@HostListener('window:resize', ['$event'])
onWindowResize(): void 
{
  let getScreenWidth = window.innerWidth;
  if(getScreenWidth >= 991 && this.MenuState == true)
    this.MenuState = false;
}


OpenCollapse():void
{
  let getScreenWidth = window.innerWidth;
      getScreenWidth = window.innerWidth;

  if(getScreenWidth <= 991 && this.MenuState == false)
    this.MenuState = true;
  else
    this.MenuState = false;
}


logout():void
{
  localStorage.clear();
  this.cookies.deleteAll();
  this.route.navigate(["login"]);
}

}
