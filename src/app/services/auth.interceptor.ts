import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = this.cookieService.get('token');
    if (idToken) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken),
      });
      return next.handle(clonedReq);
    } else {
      return next.handle(req);
    }
  }
}
