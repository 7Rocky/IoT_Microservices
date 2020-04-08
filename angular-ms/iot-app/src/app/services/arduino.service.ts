import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Temperature } from '@models/temperature.model';

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {

  constructor(
    private http: HttpClient
  ) { }

  getCurrentTemperature(): Observable<Temperature> {
    return this.http.get<any>(
      `http://${environment.ORCHESTRATOR_MS}/temperature`,
      { 
        headers: {
          authorization: `Bearer ${localStorage.getItem('iot-ms-token')}`
        }
      }
    );
  }

  getPreviousTemperatures(n: number): Observable<Temperature[]> {
    let temperatures: Temperature[] = [];
    const date: Date = new Date(2019, Number((Math.random() * 11).toFixed()), Number((Math.random() * 30 + 1).toFixed()), 1);
    const time_step: number = 86400000;

    this.http.get<any>(
      `http://${environment.ORCHESTRATOR_MS}/temperature`,
      { 
        headers: {
          authorization: `Bearer ${localStorage.getItem('iot-ms-token')}`
        },
        params: {
          path: '/temperatures'
        }
      }
    ).subscribe(response => console.log(response));

    for (let i = 0; i < n; i++) {
      const digital_value: string = (Math.random() * 200 + 350).toFixed();
      const real_value: string = (1 / (Math.log(1023 / +digital_value - 1) / 4275 + 1 / 298.15) - 273.15 /*digital_value / 10 - 25*/).toFixed(1);

      temperatures.push({
        date: new Date(date.getTime() + i * time_step).toLocaleDateString(),
        digital_value: +digital_value,
        real_value: +real_value,
        timestamp: date.getTime() + i * time_step
      });
    }

    return of(temperatures);
  }

}
