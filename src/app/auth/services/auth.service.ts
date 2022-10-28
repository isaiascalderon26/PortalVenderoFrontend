import { Injectable } from '@angular/core';
import { JwtPayload } from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private redirectUrl: string | undefined = '/';
  private loginUrl = './auth';
  private token;

  constructor(private cookieService: CookieService){}

  private isLoggin = false;
  setLogin(login: boolean): void {
    this.isLoggin = login;
  }

  isLogin(): boolean {
    const token: JwtPayload = JSON.parse(localStorage.getItem('TOKEN'));
    return this.isLoggin;
  }

  isUserLoggedIn(): boolean {
    let timeCompleted = false;
    try {
      const tokenCooked = this.cookieService.get('_token') ? this.cookieService.get('_token') : undefined;
      if (tokenCooked !== undefined){
        this.token = jwt_decode(tokenCooked);
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(this.token.exp);
        if (expirationDate > new Date()){
          timeCompleted = true;
        }
      }
    }
    catch (exception) {
      console.error('Error obteniendo expiration Date del token, error: ', exception);
      return timeCompleted;
    }
    return timeCompleted;
  }
  getRedirectUrl(): string | undefined {
    return this.redirectUrl;
  }

  setRedirectUrl(url: string | undefined): void {
    this.redirectUrl = url;
  }

  getLoginUrl(): string {
    return this.loginUrl;
  }

  validateToken(): string {
    let validation = null;
    try {
      const tokenCooked = this.cookieService.get('_token') ? this.cookieService.get('_token') : undefined;
      if (tokenCooked !== undefined){
        this.token =  jwt_decode(tokenCooked);
        const email = localStorage.getItem('EMAIL');
        let userId = null;
        this.token.identities.forEach(element => {
          userId = element.userId;
        });
        if (this.token.hasOwnProperty('aud') && userId === email) {
          validation = this.token.aud;
        }
      }
    }
    catch (exception) {
      console.error('Error obteniendo datos del token, error: ', exception);
      return validation;
    }
    return validation;
  }
}
