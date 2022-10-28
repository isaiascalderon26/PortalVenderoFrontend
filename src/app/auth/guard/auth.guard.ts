import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { CognitoService } from 'src/app/plan-visita/services/cognito.service';


@Injectable({
  providedIn: 'root',
})
export class MsalGuard implements CanActivate, CanActivateChild  {
  constructor(
    private auth: AuthService,
    private router: Router,
    private cognitoService: CognitoService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isValidToken = false;
    if (this.auth.isUserLoggedIn()){
      const token = this.auth.validateToken();
      if (token !== undefined && token === environment.AWS_CLIENT_ID) {
        isValidToken = true;
      } else {
        this.cognitoService.refreshUserSession(state.url);
      }
    } else {
      this.cognitoService.refreshUserSession(state.url);
      isValidToken = false;
    }
    return isValidToken;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isValidToken = false;
    if (this.auth.isUserLoggedIn()){
      const token = this.auth.validateToken();
      if (token !== undefined && token === environment.AWS_CLIENT_ID) {
        isValidToken = true;
      } else {
        this.cognitoService.refreshUserSession(state.url);
      }
    } else {
      this.cognitoService.refreshUserSession(state.url);
    }
    return isValidToken;
  }
}
