import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable, Subject, empty } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged: Subject<boolean> = new Subject<boolean>()
  private isLogged: boolean = false
  private username: string = ''

  logInAnnounced$: Observable<boolean> = this.logged.asObservable()

  constructor(
    private http: HttpClient
  ) { }

  announceLogIn(logged: boolean) {
    this.logged.next(logged)
  }

  isLoggedIn(): boolean {
    return this.isLogged
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
        `http://${environment.ORCHESTRATOR_MS}/login`,
        { 
          password,
          username
        }
      )
      .pipe(
        tap((response: { accessToken: string, refreshToken: string }) => {
          this.isLogged = true
          this.setTokens(response.accessToken, response.refreshToken)
        }),
        catchError(() => {
          console.log('catchError')
          this.isLogged = false
          return empty()
        })
      )
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(
        `http://${environment.ORCHESTRATOR_MS}/register`,
        { 
          password,
          username
        }
      )
      .pipe(
        tap(
          (response: { refreshToken: string, token: string }) => {
            this.setTokens(response.refreshToken, response.token)
          },
          () => this.removeTokens()
        )
      )
  }

  refresh(): Observable<any> {
    const refreshToken = this.getRefreshToken()
    return this.http.post<any>(`http://${environment.ORCHESTRATOR_MS}/refresh`, { refreshToken })
      .pipe(
        tap((response: { accessToken: string, refreshToken: string }) => {
          this.setTokens(response.accessToken, response.refreshToken)
        }),
        catchError(() => {
          this.removeTokens()
          return empty()
        })
      )
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('iot-ms-token', accessToken)
    localStorage.setItem('iot-ms-refresh-token', refreshToken)
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

  getAccessUserFromToken(): string {
    const accessToken = this.getAccessToken()
    if (!accessToken) return ''
    return this.decodeToken(accessToken).username
  }

  getUser(): string {
    return this.username || this.getAccessUserFromToken()
  }

  getAccessToken(): string {
    return localStorage.getItem('iot-ms-token')
  }

  getRefreshToken(): string {
    return localStorage.getItem('iot-ms-refresh-token')
  }

}
