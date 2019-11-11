import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestDoc } from '../models/request-doc';
import { AnswerDoc } from '../models/answer-doc';
import { WDocQuery } from '../models/w-doc-query';
import { WDocAnswer } from '../models/w-doc-answer';

@Injectable({
  providedIn: 'root'
})
export class ProcService {

  private url_get_prihod = environment.apiUrl + "/wms/getprixod";
  private url_get_zpc = environment.apiUrl + "/wms/getzpc";
  private url_get_perem = environment.apiUrl + "/wms/getperem";
  private url_get_vozv = environment.apiUrl + "/wms/getvozv";
  private url_get_doc = environment.apiUrl + "/wms/getdoc";

  constructor(private http: HttpClient) { }

  getDocsPrihod(data: RequestDoc): Observable<Array<AnswerDoc>> {
    return this.http.post<Array<AnswerDoc>>(`${this.url_get_prihod}`, data);
  }

  getDocsZpc(data: RequestDoc): Observable<Array<AnswerDoc>> {
    return this.http.post<Array<AnswerDoc>>(`${this.url_get_zpc}`, data);
  }

  getDocsPerem(data: RequestDoc): Observable<Array<AnswerDoc>> {
    return this.http.post<Array<AnswerDoc>>(`${this.url_get_perem}`, data);
  }

  getDocsVozv(data: RequestDoc): Observable<Array<AnswerDoc>> {
    return this.http.post<Array<AnswerDoc>>(`${this.url_get_vozv}`, data);
  }

  getDoc(data: WDocQuery): Observable<any> {
    return this.http.post<any>(`${this.url_get_doc}`, data);
  }
}