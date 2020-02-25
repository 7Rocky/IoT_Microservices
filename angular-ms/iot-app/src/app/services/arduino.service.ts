import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {
  endpoint: string = environment.ORCHESTRATOR_MS;

  constructor(
    private http: HttpClient
  ) { }

  getData(params: any): Observable<any> {
    return this.http.get<any>(`http://${this.endpoint}`, { params });
  }

  postData(url: string): Observable<any> {
    return this.http.post<any>(url, { message: 'Hello Backend' });
  }
}
