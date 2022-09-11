import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { GetMyTeam } from './store/myteam.action';
import { CookieService } from 'ngx-cookie-service';
import * as UserActions from '../app/store/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MajorSim';

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private cookieservice: CookieService
  ) {}

  ngOnInit(): void {
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
      this.store.dispatch(GetMyTeam());
      this.store.dispatch(UserActions.GetLoggedUser());
    } else {
      localStorage.clear();
      this.cookieservice.deleteAll();
      this.router.navigate(['login']);
    }
  }
}
