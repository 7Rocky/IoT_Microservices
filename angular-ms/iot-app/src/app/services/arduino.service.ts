import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

import { Light } from '@models/light.model'
import { Microcontroller } from '@models/microcontroller.model'

import { Measure } from '@alias/measure.type'
import { MeasureStats } from '@alias/measure-stats.type'

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
      .pipe(tap(this.clearMicrocontrollers))
  }

  deleteMicrocontroller(microcontroller: Microcontroller): Observable<any> {
    return this.http.delete<any>(
        `http://${environment.ORCHESTRATOR_MS}/microcontrollers`, {
          params: {
            ip: microcontroller.ip,
            measure: microcontroller.measure
          }
        }
      )
      .pipe(tap(this.clearMicrocontrollers))
  }

  putMicrocontroller(updatedMicrocontroller: any): Observable<any> {
    return this.http.put<any>(`http://${environment.ORCHESTRATOR_MS}/microcontrollers`, updatedMicrocontroller)
      .pipe(tap(this.clearMicrocontrollers))
  }

  private getCurrentMeasures(measure: string): Observable<Measure[]> {
    return this.http.get<any[]>(`http://${environment.ORCHESTRATOR_MS}/${measure}`)
  }

  clearMicrocontrollers() {
    this.microcontrollers = []
  }

  async getCurrentMeasure(ip: string, measure: string): Promise<Measure> {
    return new Promise<Measure>(resolve => {
      this.getCurrentMeasures(measure)
        .subscribe((measures: Measure[]) => {
          const filteredMeasures = measures.filter((measure: Measure) => measure && measure.ip === ip)
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
  ): Observable<MeasureStats[]> {
    return this.http.get<MeasureStats[]>(
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
