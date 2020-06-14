import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

import { Microcontroller } from '@models/microcontroller.model'
import { Humidity } from '@models/humidity.model'
import { HumidityStats } from '@models/humidity-stats.model'
import { Light } from '@models/light.model'
import { LightStats } from '@models/light-stats.model'
import { Temperature } from '@models/temperature.model'
import { TemperatureStats } from '@models/temperature-stats.model'

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {

  microcontrollers: Microcontroller[] = []

  constructor(
    private http: HttpClient
  ) { }

  getMicrocontrollers(): Observable<Microcontroller[]> {
    if (this.microcontrollers.length) {
      return of(this.microcontrollers)
    } else {
      return this.http.get<Microcontroller[]>(`http://${environment.ORCHESTRATOR_MS}/microcontrollers`)
        .pipe(
          tap(response => {
            this.microcontrollers = response
            this.microcontrollers.forEach(micro => micro.isInactive = false)
          })
        )
    }
  }

  async getMicrocontroller(ip: string, measure: string): Promise<Microcontroller> {
    const findMicrocontroller = (microcontrollers: Microcontroller[]): Microcontroller => {
      return microcontrollers.filter(micro => micro.ip === ip && micro.measure === measure)[0]
    }

    if (this.microcontrollers.length) {
      return of(findMicrocontroller(this.microcontrollers)).toPromise()
    } else {
      return findMicrocontroller(await this.getMicrocontrollers().toPromise())
    }
  }

  postMicrocontroller(microcontroller: Microcontroller): Observable<any> {
    return this.http.post<any>(`http://${environment.ORCHESTRATOR_MS}/microcontrollers`, microcontroller)
  }

  private getCurrentMeasures(measure: string): Observable<Humidity[] | Light[] | Temperature[]> {
    return this.http.get<any[]>(`http://${environment.ORCHESTRATOR_MS}/${measure}`)
  }

  async getCurrentMeasure(ip: string, measure: string): Promise<Humidity | Light | Temperature> {
    return new Promise<Humidity | Light | Temperature>(resolve => {
      this.getCurrentMeasures(measure)
        .subscribe(measures => {
          const filteredMeasures = measures.filter(measure => measure && measure.ip === ip)
          resolve(filteredMeasures.length ? filteredMeasures[0] : null)
        })
      })
  }

  async postLightStatus(ip: string, status: string): Promise<Light> {
    return this.http.post<Light>(
        `http://${environment.ORCHESTRATOR_MS}/light`,
        { ip, status }
      )
      .toPromise()
  }

  getPreviousMeasures(
    ip: string,
    measure: string,
    group: string,
    init_date: string,
    end_date: string
  ): Observable<HumidityStats[] | LightStats[] | TemperatureStats[]> {
    return this.http.get<HumidityStats[] | LightStats[] | TemperatureStats[]>(
        `http://${environment.ORCHESTRATOR_MS}/${measure}`,
        { 
          params: {
            path: group,
            ip,
            init_date,
            end_date
          }
        }
      )
  }

}
