import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable, Subject, empty } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

import { AuthResponse } from '@models/auth-response.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged = new Subject<boolean>()
  private isLogged = false
  private username = ''

  logInAnnounced$: Observable<boolean> = this.logged.asObservable()

  constructor(
    private http: HttpClient
  ) { }

  announceLogIn(logged: boolean) {
    this.logged.next(logged)
  }

  isLoggedIn() {
    return this.isLogged
  }

  private doAuth(username: string, password: string, method: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `http://${environment.ORCHESTRATOR_MS}/${method}`,
      { 
        password,
        username
      }
    )
    .pipe(
      tap(
        (response: AuthResponse) => {
          this.isLogged = true
          this.setTokens(response)
        },
        () => {
          this.isLogged = false
          this.removeTokens()
          return empty()
        }
      )
    )
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.doAuth(username, password, 'login')
  }

  register(username: string, password: string): Observable<AuthResponse> {
    return this.doAuth(username, password, 'register')
  }

  refresh(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken()
    return this.http.post<AuthResponse>(`http://${environment.ORCHESTRATOR_MS}/refresh`, { refreshToken })
      .pipe(
        tap((response: AuthResponse) => {
          this.setTokens(response)
        }),
        catchError(() => {
          this.removeTokens()
          return empty()
        })
      )
  }

  setTokens(tokens: AuthResponse) {
    localStorage.setItem('iot-ms-token', tokens.accessToken)
    localStorage.setItem('iot-ms-refresh-token', tokens.refreshToken)
    this.isLogged = true
    this.announceLogIn(true)
  }

  removeTokens() {
    localStorage.removeItem('iot-ms-token')
    localStorage.removeItem('iot-ms-refresh-token')
    this.isLogged = false
    this.announceLogIn(false)
  }

  decodeToken(token: string): { exp: number, iat: number, username: string } {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    return JSON.parse(jsonPayload)
  }

  getAccessUserFromToken() {
    const accessToken = this.getAccessToken()
    if (!accessToken) return ''
    return this.decodeToken(accessToken).username
  }

  getUser() {
    return this.username || this.getAccessUserFromToken()
  }

  getAccessToken() {
    return localStorage.getItem('iot-ms-token')
  }

  getRefreshToken() {
    return localStorage.getItem('iot-ms-refresh-token')
  }

}
