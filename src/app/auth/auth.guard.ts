import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Role } from '../Enums/Role';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  //
  constructor(
    private CookieService: CookieService,
    private jwtHelper: JwtHelperService,
    private Router: Router
  ) {}

  canActivate(): boolean {
    const token = this.CookieService.get('token');

    if (token == '') {
      this.Router.navigate(['login']);
      return false;
    } else {
      const RoleCheck = this.jwtHelper.decodeToken(token).role;
      switch (RoleCheck) {
        case Role.USER:
          return true;

        case Role.ADMIN:
          this.Router.navigate(['admin_page']);
          return false;
      }

      return true;
    }
  }
}
