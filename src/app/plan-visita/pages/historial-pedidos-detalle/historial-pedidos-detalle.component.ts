import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialPedidosService } from '../../services/historial-pedidos.service';
import { OrderDetail } from '../../interfaces/orderDetails';
import { Location } from '@angular/common';

@Component({
  selector: 'app-historial-pedidos-detalle',
  templateUrl: './historial-pedidos-detalle.component.html',
  styleUrls: ['./historial-pedidos-detalle.component.scss']
})
export class HistorialPedidosDetalleComponent implements OnInit {

  protected erpClientId = '';
  public orderId = '';
  public orderDetailList = new Array<OrderDetail>();
  public accountObject = {
    total: 0,
    subtotal: 0,
    taxes: 0,
    discounts: 0
  };
  constructor(private route: ActivatedRoute, private historialService: HistorialPedidosService, private location: Location) {
    route.params.subscribe((response) => {
      this.erpClientId = response.cliente;
      this.orderId = response.pedido;
    });
   }

  ngOnInit(): void {
    this.getOrderDetail();

  }

  protected getOrderDetail(): void {
    this.historialService.getHistorialPedidoDetalle(this.erpClientId, this.orderId)
      .then((response) => {
        this.orderDetailList = response.body.productDetails;
        this.orderDetailList.forEach((order) => {
          this.accountObject.total += Number(order.totalPrice);
          this.accountObject.taxes += Number(order.totalTaxes);
          this.accountObject.discounts += Number(order.discounts);
          this.accountObject.subtotal += Number(order.accountSubTotal);
        });
      })
      .catch(error => {
        console.error('Error obteniendo el detalle del pedido, ', error.message);
      });
  }
  public goBack(): void {
    this.location.back();
  }


}
