import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  name = environment.cookieName;
  public _subject = new Subject<any>();
  
  constructor(
    private cookieService: CookieService,
  ) { }

  logEvent(event) {
    this._subject.next(event);
  }

  get events$ () {
    return this._subject.asObservable();
  }

  getToken() {
    if(this.cookieService.check(this.name)){
      let fullData = this.cookieService.get(this.name);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie){
        return loginFromCookie.token
      }
    }
    else return false;
  }

  deleteCookie() {
    if(this.cookieService.check(this.name)){
      this.cookieService.delete(this.name);
    }
  }
}
