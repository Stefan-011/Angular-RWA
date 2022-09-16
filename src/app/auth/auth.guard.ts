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
    } else return true;
  }
}
