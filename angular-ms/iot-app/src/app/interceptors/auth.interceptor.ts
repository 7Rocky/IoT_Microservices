import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginComponent } from '@components/login/login.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginComponent: LoginComponent) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('iot-ms-token');

    if (token) {
      const clonedRequest = req.clone({ setHeaders: { authorization: `Bearer ${token}` } });
      return next.handle(clonedRequest);
    }

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.log('Not Authenticated');
            localStorage.removeItem('iot-ms-token');
            localStorage.removeItem('iot-ms-user');
            this.loginComponent.openDialog();
          }

          return throwError(error);
        })
      );
  }

}
