import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  name = environment.cookieName;
  
  constructor(
    private cookieService: CookieService,
  ) { }

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
