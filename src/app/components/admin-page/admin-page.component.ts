import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { UserService } from 'src/app/services/user.service';
import * as UserSelect from 'src/app/store/user.selector';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  unsubscribe$: Subject<void>;
  UsernameObs$: Observable<string>;

  faComputer = faComputer;
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;
  faBars = faBars;

  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.UsernameObs$ = this.store.select(UserSelect.selectUsersname);
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.UsernameObs$.pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  Logout(): void {
    this.userService.Loggout();
  }

  OpenMenu(): void {
    let userIcon = document.getElementById('nav-links') as HTMLDivElement;
    if (userIcon.style.display == '' || userIcon.style.display == 'none') {
      userIcon.style.display = 'flex';
    } else userIcon.style.display = 'none';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
