import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Role } from '../Enums/Role';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
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
    }
    const RoleCheck = this.jwtHelper.decodeToken(token).role;
    if (RoleCheck == Role.ADMIN) return true;
    else {
      this.Router.navigate(['home']);
      return false;
    }
  }
}
