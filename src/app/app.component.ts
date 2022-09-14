import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { GetMyTeam } from './store/myteam.action';
import { CookieService } from 'ngx-cookie-service';
import * as UserActions from '../app/store/user.action';
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
  role: Role;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private cookieservice: CookieService
  ) {
    this.$RoleObs = this.store.select(UserSelect.SelectUserRole);
    this.role = Role.DEFAULT;
  }

  ngOnInit(): void {
    this.$RoleObs.subscribe((role) => {
      if (role != undefined) this.role = role;
    });
    if (
      localStorage.getItem('loggedIn') == null &&
      this.cookieservice.get('token') != ''
    ) {
      localStorage.setItem('loggedIn', 'true');
    } else if (
      localStorage.getItem('loggedIn') != null &&
      this.cookieservice.get('token') != ''
    ) {
      this.router.navigate(['home']);
      if (this.role == Role.USER) this.store.dispatch(GetMyTeam());
      this.store.dispatch(UserActions.GetLoggedUser());
    } else {
      localStorage.clear();
      this.cookieservice.deleteAll();
      this.router.navigate(['login']);
    }
  }
}
