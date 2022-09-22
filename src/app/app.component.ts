import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { GetMyTeam } from './store/myteam.action';
import { CookieService } from 'ngx-cookie-service';
import * as UserActions from '../app/store/user.action';
import * as ShopActions from '../app/store/shop.action';
import * as MyTeamActions from '../app/store/myteam.action';
import * as LoginActions from '../app/store/login.action';
import * as PanelActions from '../app/store/panel.action';
import * as RezultatActions from '../app/store/rezultat.action';
import * as OtherTeamActions from '../app/store/Otherteam.action';

import * as UserSelect from '../app/store/user.selector';
import { Role } from './Enums/Role';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MajorSim';

  $RoleObs: Observable<Role | undefined>;
  $LoggedInStateObs: Observable<boolean>;
  role: Role;
  LoggedIn: boolean;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private cookieservice: CookieService
  ) {
    this.LoggedIn = false;
    this.$RoleObs = this.store.select(UserSelect.SelectUserRole);
    this.$LoggedInStateObs = this.store.select(UserSelect.selectLoggedIn);
    this.role = Role.DEFAULT;
  }

  ngOnInit(): void {
    this.$RoleObs.subscribe((role) => {
      if (role != undefined) this.role = role;
    });
    this.router.navigate(['home']);

    if (this.cookieservice.get('token') != '') {
      this.store.dispatch(UserActions.SetLoginState({ LoginState: true }));
      if (this.role == Role.USER) this.store.dispatch(GetMyTeam());
      this.store.dispatch(UserActions.GetLoggedUser());
    } else {
      this.cookieservice.deleteAll();
    }

    this.$LoggedInStateObs.subscribe((LoggedInState) => {
      if (this.LoggedIn == true && LoggedInState == false)
        this.ClearAllStates();
      this.LoggedIn = LoggedInState;
    });
  }

  ClearAllStates() {
    this.store.dispatch(UserActions.ClearState());
    this.store.dispatch(ShopActions.ClearState());
    this.store.dispatch(MyTeamActions.ClearState());
    this.store.dispatch(LoginActions.ClearState());
    this.store.dispatch(PanelActions.ClearState());
    this.store.dispatch(RezultatActions.ClearState());
    this.store.dispatch(OtherTeamActions.ClearState());
  }
}
