import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'

import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, filter, switchMap, take } from 'rxjs/operators'

import { AuthService } from '@services/auth.service'
import { AuthResponse } from '@models/auth-response.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false
  private refreshTokenSubject = new BehaviorSubject<string>('')

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('login') || request.url.includes('register')) {
      this.isRefreshing = false
      return next.handle(request)
    }

    const accessToken = this.authService.getAccessToken()

    if (accessToken) {
      request = this.addToken(request, accessToken)
    }

    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            if (request.url.includes('refresh')) {
              this.authService.announceLogIn(false)
            }
            return this.handle401Error(request, next)
          } else {
            return throwError(error)
          }
        })
      )
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true
      this.refreshTokenSubject.next('')

      return this.authService.refresh()
        .pipe(
          switchMap((response: AuthResponse): Observable<HttpEvent<any>> => {
            this.isRefreshing = false
            this.refreshTokenSubject.next(response.accessToken)
            return next.handle(this.addToken(request, response.accessToken))
          })
        )
    } else {
      return this.refreshTokenSubject
        .pipe(
          filter((token: string): boolean => !!token),
          take(1),
          switchMap((token: string): Observable<HttpEvent<any>> => next.handle(this.addToken(request, token)))
        )
    }
  }

}
