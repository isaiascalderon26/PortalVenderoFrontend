import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanVisitaService {
  private urlApi: string = environment.BASE_URL + '/clientes';
  private urlVen: string = environment.BASE_URL + '/vendedor';
  private urlPlan: string = environment.BASE_URL + '/planvisita';

  constructor(
    private http: HttpClient,
    private toastrSvc: ToastrService
  ) {}



  getVendedor(): Observable<any> {
    this.toastrSvc.success('Cargado con Exito!', 'Portal Vendedores');
    const email = localStorage.getItem('EMAIL');
    const params = new HttpParams().append('verificador', email);
    return this.http.get(this.urlVen, {params});
  }

  getPlanVisitas(): Observable<any> {
    const ruta = localStorage.getItem('RUTA');
    const params = new HttpParams().append('ruta', ruta);
    return this.http.get(this.urlPlan, { params });
  }

  getClientes(): Observable<any> {
    const ruta = localStorage.getItem('RUTA');
    const params = new HttpParams()
    .append('ruta', ruta)
    .append('cliente', '');
    return this.http.get(this.urlApi, {params});
  }

  getPlanVisitaPorkunnr(codigocliente): Observable<any> {
    const ruta = localStorage.getItem('RUTA');
    const params = new HttpParams()
    .append('ruta', ruta)
    .append('cliente', codigocliente);
    return this.http.get(this.urlApi, { params });
  }

  buscarclientes(busquedad: string): Observable<any> {
    const ruta = localStorage.getItem('RUTA');
    const params = new HttpParams()
    .append('ruta', ruta)
    .append('cliente', busquedad)
    .append('txtmd', busquedad);
    return this.http.get(this.urlApi, { params });
  }
}
