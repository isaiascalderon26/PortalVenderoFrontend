import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class HistorialPedidosService {
  private urlPedidos: string = environment.BASE_URL + '/pedidos';
  private urlPedidosDetalle: string = environment.BASE_URL + '/pedidos-detalle';
  constructor(private http: HttpClient) {}

  public getHistorialPedidos(codigocliente): Promise<any>{
    const params = new HttpParams().append('cliente', codigocliente);
    return this.http.get<any>(this.urlPedidos, {params}).toPromise();
  }
  public getHistorialPedidoDetalle(codigocliente, pedido): Promise<any>{
    const params = new HttpParams()
      .append('cliente', codigocliente)
      .append('pedido', pedido);
    return this.http.get<any>(this.urlPedidosDetalle, {params}).toPromise();
  }
}
