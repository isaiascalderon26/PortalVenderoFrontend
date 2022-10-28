import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Output, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AdapterService {
  @Output() planVisitaOutput = new EventEmitter<Body>();

  public adapterB2b = environment.BASE_URL + '/adapterb2b';

  constructor(private http: HttpClient) {}

  public getDiscount(codigoCliente: string): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    const body = {
      cpgId: environment.b2bVariables.cpgId,
      countryId: environment.b2bVariables.countryId,
      erpClientId: '0' + codigoCliente,
      'X-B2B-Transaction-Id': uuidv4(),
      'X-B2B-Organization-Id':
        environment.b2bVariables['X-B2B-Organization-Id'],
      lambdaname: 'getdiscounts',
    };

    return this.http.post(this.adapterB2b, body, { headers }).toPromise();
  }

  public updateDiscount(
    codigoCliente: string,
    clientDiscounts: any
  ): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    const body = {
      cpgId: environment.b2bVariables.cpgId,
      countryId: environment.b2bVariables.countryId,
      erpClientId: '0' + codigoCliente,
      'X-B2B-Transaction-Id': uuidv4(),
      'X-B2B-Organization-Id':
        environment.b2bVariables['X-B2B-Organization-Id'],
      lambdaname: 'updatediscounts',
      clientDiscounts: clientDiscounts,
    };

    return this.http.post(this.adapterB2b, body, { headers }).toPromise();
  }
}
