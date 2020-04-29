import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged = new Subject<boolean>();

  logInAnnounced$ = this.logged.asObservable();
  isLoggedIn: boolean = !!localStorage.getItem('iot-ms-token');
  username: string = '';

  announceLogIn(logged: boolean) {
    this.logged.next(logged);
  }

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
        `http://${environment.ORCHESTRATOR_MS}/login`,
        { 
          password,
          username
        }
      )
      .pipe(
        tap(
          (response: { refreshToken: string, token: string }) => {
            this.setTokens(response.refreshToken, response.token, username)
          },
          () => this.removeTokens()
        )
      );
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
            this.setTokens(response.refreshToken, response.token, username)
          },
          () => this.removeTokens()
        )
      );
  }

  refresh(refreshToken: string): Promise<any> {
    return this.http.post<any>(
        `http://${environment.ORCHESTRATOR_MS}/refresh`,
        { 
          refreshToken
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
      .toPromise();
  }

  setTokens(refreshToken: string, token: string, username?: string) {
    localStorage.setItem('iot-ms-refresh-token', refreshToken);
    localStorage.setItem('iot-ms-token', token);
    this.isLoggedIn = true;

    if (username) {
      this.username = username;
      localStorage.setItem('iot-ms-user', username);
      this.announceLogIn(true);
    }
  }

  removeTokens() {
    localStorage.removeItem('iot-ms-refresh-token');
    localStorage.removeItem('iot-ms-token');
    localStorage.removeItem('iot-ms-user');
    this.isLoggedIn = false;
    this.announceLogIn(false);
  }

  hasExpired(token: string): boolean {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload).exp - Date.now() / 1000 < 20;
    }

    return false;
  }

}
