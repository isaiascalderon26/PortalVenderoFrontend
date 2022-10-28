import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Body1, Vendedor } from '../../interfaces/vendedorPortal';
import { PlanVisitaService } from '../../services/plan-visita.service';

@Component({
  selector: 'app-vendedor-tarjeta',
  templateUrl: './vendedor-tarjeta.component.html',
  styleUrls: ['./vendedor-tarjeta.component.scss']
})
export class VendedorTarjetaComponent {

  @Input() codUser = '';
  @Input() nameUser = '';

}
