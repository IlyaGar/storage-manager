import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginQuery } from '../models/login-query';
import { LoginResponse } from '../models/login-response';
import { environment } from 'src/environments/environment';
import { AttentionFormComponent } from 'src/app/dialog-windows/attention-dialog/attention-form/attention-form.component';
import { LoginService } from '../services/login.service';
import { TokenService } from 'src/app/common/services/token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  cookieName = environment.cookieName;
  isLogin: boolean = false;
  isCorectLogin: boolean = true;
  expiredDate: Date;
  loginQuery = new LoginQuery("", "");
  loginResponse: LoginResponse;
  
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private tokenService: TokenService,
    private loginService: LoginService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    if(this.cookieService.check(this.cookieName)){
      let fullData = this.cookieService.get(this.cookieName);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie){
        this.isLogin = true;
        this.router.navigate(['/inventory']);
      }
    }
    else this.isLogin = false;
  }

  onOkClick() {
    this.loginService.getLogin(this.loginQuery).subscribe(response => {
      this.checkResponse(response) 
    },
      error => console.log(error)
    );
  }

  checkResponse(response) {
    if(!response)
      this.openAttentionDialog(response);
    else {
      if(response.status as string) {
        if(response.status != 'true') {
          this.openAttentionDialog(response.status);
        }
        else {
          this.loginResponse = response; 
          this.loginUser(); 
        }
      }
      else {
        this.loginResponse = response; 
        this.loginUser(); 
      }
    }
  }

  loginUser() {
    if(this.loginResponse.token) {
      this.isCorectLogin = true;
      this.setCookie(this.cookieName, this.loginResponse);
      this.isLogin = true;
      this.tokenService.logEvent(true);
      // this.tokenService.doLogin(true);
      this.router.navigate(['/product-group']);
    }
    else {
      this.isCorectLogin = false;
    }
  }

  setCookie(nameCookie: string, loginResponse: LoginResponse) {
    let loginJson = JSON.stringify(loginResponse);
    this.cookieService.set(nameCookie, loginJson, 365);
  }

  openAttentionDialog(status: string) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      data: {status: status},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
