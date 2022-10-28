import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { PowerBIConfig } from '../interfaces/powerBiConfig';

@Injectable({ providedIn: 'root' })
export class ChannelTokenService {

  constructor(private http: HttpClient){}
  private urlApi: string = environment.BASE_URL + '/gettokenpb';

  $subject = new Subject<boolean>();
  public adminSubject = new Subject<boolean>();
  public adminObservable: Observable<boolean>;

  consumeVendedor(): void {
    this.$subject.next(true);
  }

  public verifyAdminUser(user: string[]): void {
    const isAdmin = user !== null ? user.includes('admin-group') : false;
    this.adminSubject.next(isAdmin);
  }

  public getURLToEmbedReport(): Promise<PowerBIConfig> {
    return this.http.get<PowerBIConfig>(this.urlApi).toPromise();
  }

}
