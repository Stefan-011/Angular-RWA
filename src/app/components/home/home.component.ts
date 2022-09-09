import { Component, HostListener, Input, OnInit } from '@angular/core';
import * as UserSelectors from 'src/app/store/user.selector';
import * as UserActions from '../../store/user.action';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ComponentEnum } from 'src/app/Enums/ComponentEnum';
import { Role } from 'src/app/Enums/Role';
import { MenuSize } from 'src/app/Enums/MenuSize';
import { _MatOptionBase } from '@angular/material/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() Username: string;

  $username: Observable<string | undefined>;
  $LogState: Observable<boolean>;
  $ROLEOBS: Observable<Role | undefined>;
  $ComponentType: Observable<ComponentEnum>;
  $MenuSize: Observable<MenuSize>;

  Ruta: ComponentEnum;
  LogState: boolean;
  MenuState: MenuSize;
  role: Role;

  constructor(
    private cookies: CookieService,
    private store: Store<AppState>,
    private route: Router
  ) {
    this.Ruta = ComponentEnum.none;
    this.Username = '';
    this.LogState = false;
    this.MenuState = MenuSize.default;
    this.$LogState = this.store.select(UserSelectors.selectLoggedIn);
    this.$username = this.store.select(UserSelectors.selectUsersname);
    this.$ROLEOBS = this.store.select(UserSelectors.SelectUserRole);
    this.$ComponentType = store.select(UserSelectors.SelectComponent);
    this.$MenuSize = store.select(UserSelectors.SelectMenuSize);
    this.role = Role.DEFAULT;
  }

  ngOnInit(): void {
    this.$username.subscribe((data) => {
      this.Username = data + '';
    });
    this.$LogState.subscribe((data) => (this.LogState = data));

    this.$ROLEOBS.subscribe((role) => {
      if (role != undefined) this.role = role;
    });

    this.$ComponentType.subscribe((type) => {
      this.Ruta = type;
    });

    this.$MenuSize.subscribe((Size) => (this.MenuState = Size));

    this.Ruta = ComponentEnum.Panel;
  }

  switchR(text: string): void {
    switch (text) {
      case 'SIMULACIJA':
        this.store.dispatch(
          UserActions.SetComponent({ comp: ComponentEnum.Simulacija })
        );
        break;

      case 'MYTEAM':
        this.store.dispatch(
          UserActions.SetComponent({ comp: ComponentEnum.MyTeam })
        );
        break;

      case 'SHOP':
        this.store.dispatch(
          UserActions.SetComponent({ comp: ComponentEnum.Shop })
        );
        break;

      case 'PANEL':
        if (this.role != Role.ADMIN) break;
        this.store.dispatch(
          UserActions.SetComponent({ comp: ComponentEnum.Panel })
        );
        break;

      default:
        this.Ruta = -1;
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
    getScreenWidth = window.innerWidth;

    if (getScreenWidth <= 991 && this.MenuState == MenuSize.moblie)
      this.store.dispatch(UserActions.SetMenuSize({ Size: MenuSize.default }));
    else
      this.store.dispatch(UserActions.SetMenuSize({ Size: MenuSize.moblie }));
  }

  logout(): void {
    localStorage.clear();
    this.cookies.deleteAll();
    this.route.navigate(['login']);
  }
}
