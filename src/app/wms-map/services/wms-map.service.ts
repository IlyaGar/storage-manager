import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Stillages } from '../models/stillages';
import { GetSkald } from '../models/get-sclad';
import { SetSklad } from '../models/set-sclad';
import { CellRequest } from '../models/cell-request';
import { CellAnsw } from '../models/cell-answ';
import { HistAnsw } from '../models/history-answer';
import { ErrorLog } from '../models/error-log';
import { ErrorLogRequest } from '../models/error-log-request';

@Injectable({
  providedIn: 'root'
})
export class WmsMapService {

  url_get_sclad: string = environment.apiUrl + "/wms/getstillages";
  url_set_sclad: string = environment.apiUrl + "/wms/setstillages";
  url_get_cell: string = environment.apiUrl + "/wms/getcell";
  url_get_error_log: string = environment.apiUrl + "/wms/journal";
  url_get_history: string = environment.apiUrl + "/wms/history";

  constructor(private http: HttpClient) { }

  getSclad(data: GetSkald): Observable<Stillages> {
    return this.http.post<Stillages>(this.url_get_sclad, data);
  }

  postSclad(data: SetSklad): Observable<any> {
    return this.http.post<any>(this.url_set_sclad, data);
  }

  getCell(data: CellRequest): Observable<CellAnsw> {
    return this.http.post<CellAnsw>(this.url_get_cell, data);
  }

  getErrorLog(data: ErrorLogRequest): Observable<Array<ErrorLog>> {
    return this.http.post<Array<ErrorLog>>(this.url_get_error_log, data);
  }

  getHistory(data: any): Observable<HistAnsw> {
    return this.http.post<HistAnsw>(this.url_get_history, data);
  }
}
