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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

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
            // TODO
            alert('Not Authenticated');
            // this.router.navigateByUrl('/login');
          }

          return throwError(error);
        })
      );
  }

}
