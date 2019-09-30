import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/login-manager/models/login-response';
import { LogoutStatus } from 'src/app/login-manager/models/logout-status';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-navbar-form',
  templateUrl: './navbar-form.component.html',
  styleUrls: ['./navbar-form.component.css']
})
export class NavbarFormComponent implements OnInit {

  cookieName = environment.cookieName;
  isLogin = false;
  loginResponse = new LoginResponse("", "", "", "", "", "");
  logoutStatus: LogoutStatus;
  
  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    if(this.cookieService.check(this.cookieName)){
      let fullData = this.cookieService.get(this.cookieName);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie){
        this.loginResponse = loginFromCookie;
        this.isLogin = true;
      }
    }
    else this.isLogin = false;
  }

}
