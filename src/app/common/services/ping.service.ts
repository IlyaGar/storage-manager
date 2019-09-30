import { Injectable } from '@angular/core';
import { Subject, Observable, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PingService {
  
  pingStream: Subject<number> = new Subject<number>();
  ping: number = 0;
  // url: string = environment.apiUrl + "storemap";
  url: string = "http://192.168.1.38";

  constructor(private _http: HttpClient) { 
    interval(5000)
    .subscribe((data) => {
      let timeStart: number = performance.now();

      this._http.get(this.url)
        .subscribe((data) => {
          let timeEnd: number = performance.now();

          let ping: number = timeEnd - timeStart;
          this.ping = ping;
          this.pingStream.next(ping);
        });
    });
  }
}
