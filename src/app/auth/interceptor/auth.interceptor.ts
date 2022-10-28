import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private cookieService: CookieService){}


    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!httpRequest.url.includes('token/')) {
            const token = this.cookieService.get('_token');
            const request = httpRequest.clone( {
                setHeaders: { Authorization: `Bearer ${ token }`}
            });
            return next.handle(request);
        } else {
            const auth = btoa(environment.AWS_CLIENT_ID + ':' + environment.AWS_CLIENT_SECRET);
            return next.handle(httpRequest.clone({setHeaders: { Authorization: `Basic ${ auth }` }}));
        }
      }
}
