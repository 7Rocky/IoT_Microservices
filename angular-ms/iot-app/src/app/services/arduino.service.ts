import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Microcontroller } from '@models/microcontroller.model';
import { Temperature } from '@models/temperature.model';
import { TemperatureStats } from '@models/temperature-stats.model';

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {

  microcontrollers: Microcontroller[] = [];

  constructor(private http: HttpClient) { }

  getMicrocontrollers(): Observable<Microcontroller[]> {
    if (this.microcontrollers.length) {
      return of(this.microcontrollers);
    } else {
      return this.http.get<Microcontroller[]>(`http://${environment.ORCHESTRATOR_MS}/microcontrollers`)
        .pipe(
          tap(response => this.microcontrollers = response)
        );
    }
  }

  async getMicrocontroller(ip: string, measure: string): Promise<Microcontroller> {
    const findMicrocontroller = (microcontrollers: Microcontroller[]): Microcontroller => {
      return microcontrollers.filter(micro => micro.ip === ip && micro.measure === measure)[0];
    };

    if (this.microcontrollers.length) {
      return of(findMicrocontroller(this.microcontrollers)).toPromise();
    } else {
      console.log('getMicrocontrollers');
      return findMicrocontroller(await this.getMicrocontrollers().toPromise());
    }
  }

  getCurrentTemperatures(measure: string): Observable<Temperature[]> {
    return this.http.get<Temperature[]>(`http://${environment.ORCHESTRATOR_MS}/${measure}`);
  }

  async getCurrentTemperature(ip: string, measure: string): Promise<Temperature> {
    const temperatures = await this.getCurrentTemperatures(measure).toPromise();
    return temperatures.filter(temperature => temperature.ip === ip)[0];
  }

  getPreviousTemperatures(ip: string, init_date: string, end_date: string): Observable<TemperatureStats[]> {
    return this.http.get<TemperatureStats[]>(
        `http://${environment.ORCHESTRATOR_MS}/temperature`,
        { 
          params: {
            path: 'temperatures',
            ip,
            init_date,
            end_date
          }
        }
      );
  }

}
