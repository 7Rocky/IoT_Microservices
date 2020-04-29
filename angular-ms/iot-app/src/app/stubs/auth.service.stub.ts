import { Injectable } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

class LocalStorage {

  storage = new Map<string, string>();

  getItem(key: string): string {
    return this.storage.get(key);
  }

  removeItem(key: string) {
    this.storage.delete(key);
  }

  setItem(key: string, value: string) {
    this.storage.set(key, value);
  }

};

const localStorage = new LocalStorage();

@Injectable({
  providedIn: 'root'
})
export class AuthServiceStub {

  private logged = new Subject<boolean>();

  logInAnnounced$ = this.logged.asObservable();
  isLoggedIn: boolean = !!localStorage.getItem('iot-ms-token');

  announceLogIn(mission: boolean) {
    this.logged.next(mission);
  }

  // constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return of({
        refreshToken: '54321',
        token: '12345'
      })
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
    return of({
        refreshToken: '54321',
        token: '12345'
      })
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
    return of({ 
        refreshToken: '55555'
      })
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
    const base64Url = token.split('.')[1];

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    console.log(JSON.parse(jsonPayload).exp - Date.now() / 1000);

    return JSON.parse(jsonPayload).exp - Date.now() / 1000 < 20;
  }

}
