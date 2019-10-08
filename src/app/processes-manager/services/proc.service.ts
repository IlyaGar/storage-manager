import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcService {

  private urlDocs = environment.apiUrl + "!!!!!";

  constructor(private http: HttpClient) { }

  getProducts(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlDocs}`, data);
  }
}
