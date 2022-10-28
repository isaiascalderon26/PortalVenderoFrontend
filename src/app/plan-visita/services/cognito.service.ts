import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ChannelTokenService } from './channel-token.service';
@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private url = environment.cognitoUri;
  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService,
              private channelTokenService: ChannelTokenService) {}
  // Obteener Token de  Azure integracion via SAML
  async getToken(code: string): Promise<Observable<any>> {
    let tokenObject;
    await Auth.currentSession().then(response => {
      tokenObject = {
        idToken: response.getIdToken().getJwtToken(),
        email: response.getIdToken().payload.email,
        group: response.getIdToken().payload['cognito:groups']
      };
    }).catch(errorResponse => {
      tokenObject = {
        error: errorResponse
      };
    });
    return of(tokenObject);
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.removeAll();
    Auth.signOut();
    this.router.navigate(['./auth']);
  }

  refreshUserSession(url: string): void {
    this.cookieService.remove('_token');
    Auth.currentAuthenticatedUser()
    .then((user => {
      this.cookieService.put('_token', user.signInUserSession.idToken.jwtToken);
      localStorage.setItem('GROUP', user.signInUserSession.idToken.payload['cognito:groups']);
      this.channelTokenService.verifyAdminUser(user.signInUserSession.idToken.payload['cognito:groups']);
      this.router.navigate([url]);
    }))
    .catch((error) => {
      console.error('refreshToken - error: ', error);
      this.router.navigate(['./auth']);
    });
  }
}
