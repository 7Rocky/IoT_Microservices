import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';

import microcontrollerMock from '@mocks/microcontroller.mock';
import temperatureMock from '@mocks/temperature.mock';
import temperatureStatsMock from '@mocks/temperature-stats.mock';
import { Microcontroller } from '@models/microcontroller.model';
import { Temperature } from '@models/temperature.model';
import { TemperatureStats } from '@models/temperature-stats.model';

@Injectable({
  providedIn: 'root'
})
export class ArduinoServiceStub {

  microcontrollers: Microcontroller[] = [];

  //constructor(private http: HttpClient) { }

  getValue() {
    return 'real value';
  }

  getMicrocontrollers(): Observable<Microcontroller[]> {
    if (this.microcontrollers.length) {
      return of(this.microcontrollers);
    } else {
      return of([ microcontrollerMock ]);
    }
  }

  async getMicrocontroller(ip: string, measure: string): Promise<Microcontroller> {
    const findMicrocontroller = (microcontrollers: Microcontroller[]): Microcontroller => {
      return microcontrollers.filter(micro => micro.ip === ip && micro.measure === measure)[0];
    };

    if (this.microcontrollers.length) {
      return of(findMicrocontroller(this.microcontrollers)).toPromise();
    } else {
      return findMicrocontroller(await this.getMicrocontrollers().toPromise());
    }
  }

  getCurrentTemperatures(measure: string): Observable<Temperature[]> {
    return of([ temperatureMock ]);
  }

  async getCurrentTemperature(ip: string, measure: string): Promise<Temperature> {
    const temperatures = await this.getCurrentTemperatures(measure).toPromise();
    return temperatures.filter(temperature => temperature.ip === ip)[0];
  }

  getPreviousTemperatures(ip: string, init_date: string, end_date: string): Observable<TemperatureStats[]> {
    return of([ temperatureStatsMock ]);
  }

}