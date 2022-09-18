import { Component, HostListener, Input, OnInit } from '@angular/core';
import * as UserSelectors from 'src/app/store/user.selector';
import * as UserActions from '../../store/user.action';
import { Router } from '@angular/router';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ComponentEnum } from 'src/app/Enums/ComponentEnum';
import { Role } from 'src/app/Enums/Role';
import { MenuSize } from 'src/app/Enums/MenuSize';
import { _MatOptionBase } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() Username: string;

  $Unsubscribe: Subject<void>;
  $LogState: Observable<boolean>;
  $MenuSize: Observable<MenuSize>;
  $RoleObs: Observable<Role | undefined>;
  $ComponentType: Observable<ComponentEnum>;
  $username: Observable<string | undefined>;

  Ruta: ComponentEnum;
  MenuState: MenuSize;
  LogState: boolean;
  role: Role;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private UserService: UserService
  ) {
    this.Username = '';
    this.LogState = false;
    this.role = Role.DEFAULT;
    this.Ruta = ComponentEnum.Home;
    this.MenuState = MenuSize.default;
    this.$Unsubscribe = new Subject<void>();
    this.$MenuSize = store.select(UserSelectors.SelectMenuSize);
    this.$RoleObs = this.store.select(UserSelectors.SelectUserRole);
    this.$LogState = this.store.select(UserSelectors.selectLoggedIn);
    this.$username = this.store.select(UserSelectors.selectUsersname);
    this.$ComponentType = store.select(UserSelectors.SelectComponent);
  }

  ngOnInit(): void {
    this.SetupObservers();
  }

  SetupObservers(): void {
    this.$username.pipe(takeUntil(this.$Unsubscribe)).subscribe((username) => {
      if (username != undefined) this.Username = username;
    });

    this.$LogState
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((logstate) => (this.LogState = logstate));

    this.$RoleObs.pipe(takeUntil(this.$Unsubscribe)).subscribe((role) => {
      if (role != undefined) this.role = role;
    });

    this.$ComponentType.pipe(takeUntil(this.$Unsubscribe)).subscribe((comp) => {
      this.Ruta = comp;
    });

    this.$MenuSize
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((Size) => (this.MenuState = Size));
  }

  SwitchRoute(RouteOption: string): void {
    console.log(RouteOption);
    switch (RouteOption) {
      case ComponentEnum.Simulacija:
        if (this.role != Role.USER) break;
        this.store.dispatch(
          UserActions.SetComponent({ comp: ComponentEnum.Simulacija })
        );
        break;

      case ComponentEnum.MyTeam:
        if (this.role != Role.USER) break;
        this.store.dispatch(
          UserActions.SetComponent({ comp: ComponentEnum.MyTeam })
        );
        break;

      case ComponentEnum.Shop:
        if (this.role != Role.USER) break;
        this.store.dispatch(
          UserActions.SetComponent({ comp: ComponentEnum.Shop })
        );
        break;

      case ComponentEnum.Panel:
        if (this.role != Role.ADMIN) break;
        this.store.dispatch(
          UserActions.SetComponent({ comp: ComponentEnum.Panel })
        );
        break;

      default:
        this.store.dispatch(
          UserActions.SetComponent({ comp: ComponentEnum.Home })
        );
        break;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    let getScreenWidth = window.innerWidth;
    if (getScreenWidth >= 991 && this.MenuState == MenuSize.moblie)
      this.store.dispatch(UserActions.SetMenuSize({ Size: MenuSize.default }));
  }

  OpenCollapse(): void {
    let getScreenWidth = window.innerWidth;
    if (getScreenWidth <= 991 && this.MenuState == MenuSize.moblie)
      this.store.dispatch(UserActions.SetMenuSize({ Size: MenuSize.default }));
    else
      this.store.dispatch(UserActions.SetMenuSize({ Size: MenuSize.moblie }));
  }

  Logout(): void {
    this.router.navigate(['login']);
    this.UserService.Loggout();
  }

  ngOnDestroy(): void {
    this.$Unsubscribe.next();
    this.$Unsubscribe.complete();
  }
}
