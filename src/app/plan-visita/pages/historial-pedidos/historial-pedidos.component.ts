import { Component, Input} from '@angular/core';
import { Order } from '../../interfaces/order';
import { OrderDetail } from '../../interfaces/orderDetails';
import { HistorialPedidosService } from '../../services/historial-pedidos.service';
import { ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html',
  styleUrls: ['./historial-pedidos.component.scss'],
})
export class HistorialPedidosComponent {

  @Input() planVisita;

  public codigoCliente = '';
  public dataSource: Order[];
  public orderList = new Array();
  public historialPedido: OrderDetail;
  public hayError = false;
  public showDetails = new Array<boolean>();
  public status = '';
  protected indexOld: number;
  public headerTitles = [
    { id: 0, label: 'Canal de Venta / N° Pedido' },
    { id: 1, label: 'Numero de pedido Interno' },
    { id: 2, label: 'Fecha Creación' },
    { id: 3, label: 'Fecha Entrega' },
    { id: 4, label: 'Monto Total' },
    { id: 5, label: 'Estado' }
  ];
  public mobileDesign = false;

  @HostListener('window:resize', ['$event'])
  protected getScreenSize(event?): void {
    window.innerWidth <= 767 ? this.mobileDesign = true : this.mobileDesign = false;
  }

  constructor( private route: ActivatedRoute, private historialService: HistorialPedidosService) {
    this.getScreenSize();
    route.params.subscribe((response) => {
      this.codigoCliente = '0' + response.kunnr;
      this.getOrders(this.codigoCliente);
    });
  }

  public getOrders(codigoCliente): void {
    this.historialService.getHistorialPedidos(codigoCliente)
      .then((orders) => {
        this.dataSource = orders.message;
        let orderAux = '';
        this.dataSource.forEach((order, index) => {
          if (orderAux === order.orderId) {
            this.createNewObject(this.dataSource[index - 1], order);
          } else {
            this.createNewObject(this.dataSource[index], null);
          }
          orderAux = order.orderId;
        });
      })
      .catch((err) => {
        console.error('Error: ', err.message);
      });
  }

  private createNewObject(firstOrder: any, secondOrder: any): void {
    const index = this.orderList.findIndex(order => order.orderId === firstOrder.orderId);
    if (index !== -1) {
      this.orderList.splice(index, 1) ;
    }
    let orderMerged;
    if (secondOrder !== null){
      orderMerged = {
        orderId: firstOrder.orderId,
        sourceChannel: firstOrder.sourceChannel,
        erpOrderId: [firstOrder.erpOrderId, secondOrder.erpOrderId],
        orderDate: [firstOrder.orderDate, secondOrder.orderDate],
        deliveryDate: [firstOrder.deliveryDate, secondOrder.deliveryDate],
        amount: [firstOrder.amount, secondOrder.amount],
        status: [firstOrder.status, secondOrder.status],
        origin: [firstOrder.origin, secondOrder.origin]
      };
    }
    else {
      orderMerged = {
        orderId: firstOrder.orderId,
        sourceChannel: firstOrder.sourceChannel,
        erpOrderId: [firstOrder.erpOrderId],
        orderDate: [firstOrder.orderDate],
        deliveryDate: [firstOrder.deliveryDate],
        amount: [firstOrder.amount],
        status: [firstOrder.status],
        origin: [firstOrder.origin]
      };
    }
    this.orderList.push(orderMerged);
  }

  public validateOrderStatus(status: string): string {
    let selectedClass = 'grey';
    this.status = 'Desconocido';
    switch (status) {
      case 'DELIVERED':
        selectedClass = 'green';
        this.status = 'Entregado';
        break;
      case 'FAILED':
        selectedClass = '#e21717';
        this.status = 'Fallido';
        break;
      case 'TRANSIT':
        selectedClass = '#FDDA0D';
        this.status = 'En tránsito';
        break;
      case 'BLOCKED':
        selectedClass = '#e21717';
        this.status = 'Bloqueado';
        break;
      case 'CANCELED':
        selectedClass = '#e21717';
        this.status = 'Cancelado';
        break;
      case 'PARTIAL_DELIVERY':
        selectedClass = '#e67010';
        this.status = 'Entrega parcial';
        break;
      default:
        selectedClass = 'grey';
        this.status = 'Desconocido';
        break;
    }
    return selectedClass;
  }

  public showOrderDetails(index: number): void {
    this.showDetails[index] = this.showDetails[index] ? false : true;
  }
}

