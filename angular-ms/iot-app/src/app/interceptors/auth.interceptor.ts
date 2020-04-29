import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '@services/auth.service';

import { LoginComponent } from '@components/login/login.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private loginComponent: LoginComponent,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('iot-ms-token');

    if (token) {
      if (this.authService.hasExpired(token) && !req.url.includes('/refresh')) {
        const refreshToken = localStorage.getItem('iot-ms-refresh-token');
        this.authService.refresh(refreshToken);
      }
      
      const clonedRequest = req.clone({ setHeaders: { authorization: `Bearer ${token}` } });
      return next.handle(clonedRequest);
    }

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.removeTokens();
            this.router.navigate(['']);
            this.loginComponent.openDialog();
          }

          return throwError(error);
        })
      );
  }

}
