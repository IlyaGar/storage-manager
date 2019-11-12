import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StillageItem } from '../models/stillage-item';
import { HttpClient } from '@angular/common/http';
import { Stillages } from '../models/stillages';
import { GetSkald } from '../models/get-sclad';
import { SetSklad } from '../models/set-sclad';


@Injectable({
  providedIn: 'root'
})
export class WmsMapService {

  // url: string = environment.apiUrl + "storemap";
  url: string = "http://localhost:63572/api/storemap";
  url_get_sclad: string = environment.apiUrl + "/wms/getstillages";
  url_set_sclad: string = environment.apiUrl + "/wms/setstillages";

  constructor(private http: HttpClient) { }

  postData(arr: Array<Array<StillageItem>>): Observable<String> {
    var data = new Stillages(arr, arr.length, arr[0].length);
    return this.http.post<String>(this.url, data);
  }

  getData(): Observable<Stillages> {
    return this.http.get<Stillages>(this.url);
  }

  getSclad(data: GetSkald): Observable<Stillages> {
    return this.http.post<Stillages>(this.url_get_sclad, data);
  }

  postSclad(data: SetSklad): Observable<any> {
    return this.http.post<any>(this.url_set_sclad, data);
  }
}
