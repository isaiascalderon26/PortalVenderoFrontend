import { Component, Input } from '@angular/core';
import { Body, PlanViisitaClientes } from '../../interfaces/planesVisitaClientes.interface';


@Component({
  selector: 'app-clientes-plan-visita',
  templateUrl: './clientes-plan-visita.component.html',
  styleUrls: ['./clientes-plan-visita.component.scss']
})
export class ClientesPlanVisitaComponent  {
  @Input() body!: Body;

}
