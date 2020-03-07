import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {
  endpoint: string = environment.ORCHESTRATOR_MS;

  constructor(
    private http: HttpClient
  ) { }

  getCurrentTemperature(params: any): Observable<any> {
    return this.http.get<any>(`http://${this.endpoint}`, { params });
  }

  getPreviousTemperatures(n: number): Observable<any> {
    let temperatures = [];
    const date = new Date(2019, 11, 22, 1);

    for (let i = 0; i < n; i++) {
      temperatures.push({
        date: new Date(date.getTime() + i * 60000).toUTCString(),
        digital_value: [ (Math.random() * 100).toFixed() + 400 ],
        real_value: [ (Math.random() * 100).toFixed() + 400 ],
        timestamp: date.getTime() + i * 60000
      });
    }

    return of(temperatures);
  }

  setQuery(url: string): Observable<any> {
    return this.http.get<any>(`http://${url}`);
  }

  postData(url: string): Observable<any> {
    return this.http.post<any>(url, { message: 'Hello Backend' });
  }
}
