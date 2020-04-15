import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
        tap((response: { token: string }) => {
          localStorage.setItem('iot-ms-token', response.token);
          localStorage.setItem('iot-ms-user', username);
        })
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
        tap((response: { token: string }) => {
          localStorage.setItem('iot-ms-token', response.token);
          localStorage.setItem('iot-ms-user', username);
        })
      );
  }

}
