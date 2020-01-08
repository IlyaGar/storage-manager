import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestDoc } from '../models/request-doc';
import { AnswerDoc } from '../models/answer-doc';
import { WDocQuery } from '../models/w-doc-query';
import { WDocAnswer } from '../models/w-doc-answer';
import { NewTask } from '../models/new-task';
import { GetSkald } from 'src/app/wms-map/models/get-sclad';
import { CurTask } from '../models/curtask';
import { MainTask } from '../models/main-task';
import { PrintTask } from '../models/print-task';
import { PrintAnsw } from '../models/print-answ';

@Injectable({
  providedIn: 'root'
})
export class ProcService {

  private url_get_prihod = environment.apiUrl + "/wms/getprixod";
  private url_get_zpc = environment.apiUrl + "/wms/getzpc";
  private url_get_perem = environment.apiUrl + "/wms/getperem";
  private url_get_vozv = environment.apiUrl + "/wms/getvozv";
  private url_get_doc = environment.apiUrl + "/wms/getdoc";
  private url_pst_new_task = environment.apiUrl + "/wms/settask";
  private url_get_tasks = environment.apiUrl + "/wms/currenttask/";
  private url_get_task_without = environment.apiUrl + "/wms/fcurrenttask/";
  private url_get_print_answt = environment.apiUrl + "/wms/printcomplate/";

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

  getDoc(data: WDocQuery): Observable<WDocAnswer> {
    return this.http.post<WDocAnswer>(`${this.url_get_doc}`, data);
  }

  postNewTask(data: NewTask): Observable<any> {
    return this.http.post<any>(`${this.url_pst_new_task}`, data);
  }

  getMainTasks(data: GetSkald): Observable<Array<MainTask>> {
    return this.http.post<Array<MainTask>>(`${this.url_get_tasks}`, data);
  }
  
  getCurTasks(data: GetSkald): Observable<Array<CurTask>> {
    return this.http.post<Array<CurTask>>(`${this.url_get_task_without}`, data);
  }

  getPrintAnsw(data: PrintTask): Observable<Array<PrintAnsw>> {
    return this.http.post<Array<PrintAnsw>>(`${this.url_get_print_answt}`, data);
  }
}