import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Body, PlanVisita } from 'src/app/plan-visita/interfaces/planVisita.interface';
import { PlanVisitaService } from 'src/app/plan-visita/services/plan-visita.service';
import { ActivatedRoute } from '@angular/router';
import { PlanViisitaClientes } from '../../interfaces/planesVisitaClientes.interface';
import { AnyLayout } from 'mapbox-gl';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  @Output() planVisitaOutput = new EventEmitter<Body>();
  planVisita: Body;
  planVisitas: PlanViisitaClientes[] = [];
  bodyBackoup: Body[] = [];
  body: Body[] = [];
  codVendedor = '';
  nameVendedor = '';
  hayError = false;
  chanceAndReportList = [
    { icon: 'circle', name: 'Isotonicas', color: 'red' },
    { icon: 'circle', name: 'Aguas', color: 'green' },
    { icon: 'circle', name: 'Cervezas', color: 'yellow' }
  ];

  constructor(
    private route: ActivatedRoute,
    private planService: PlanVisitaService
  ) {
    route.params.subscribe((response) => {
      const codigoCliente = response.kunnr;
      this.obtenerVisitas(codigoCliente);
    });
  }

  ngOnInit(): void {
    this.planService.getVendedor().subscribe((email: any) => {
      localStorage.setItem('RUTA', email.body.ruta);

      this.codVendedor = email.body.cod_user;
      this.nameVendedor = email.body.nombre_user;

      this.planService.getPlanVisitas().subscribe(
        (planVisitas: any) => {
          this.body = planVisitas.body;
          this.bodyBackoup = planVisitas.body;
        },
        (err) => {
          this.hayError = true;
          this.planVisitas = [];
        }
      );
    });
  }

  obtenerVisitas(codigocliente): void {
    this.planService
      .getPlanVisitaPorkunnr(codigocliente)
      .subscribe((cliente: any) => {
        this.planVisita = cliente.body[0];
        this.planVisitaOutput.emit(this.planVisita);
      });
  }
}
