import { Component, OnInit } from '@angular/core';
import { Body, PlanVisita } from '../../interfaces/planVisita.interface';
import { PlanVisitaService } from '../../services/plan-visita.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  busquedad = '';
  planVisitas: PlanVisita[] = [];
  body: Body[] = new Array();
  hayError = false;
  public noData: boolean;
  bclientes: Body[] = [];
  bodyBackoup: Body[] = [];

  constructor(private planService: PlanVisitaService) {}

  buscar(): void {
    this.hayError = false;
    const filtro = this.body.filter((item) => {
      const name = item.txtmd
        .toUpperCase()
        .startsWith(this.busquedad.toUpperCase());
      if (name) {
        return true;
      } else {
        const codigo = item.kunnr
          .toUpperCase()
          .startsWith(this.busquedad.toUpperCase());
        return codigo;
      }
    });

    if (filtro.length > 0) {
      this.body = filtro;
    } else {
      this.body = this.bodyBackoup;
    }
  }
  ngOnInit(): void {
    this.planService.getClientes().subscribe(
      (planVisitas: any) => {
        this.body = planVisitas.body;
        this.noData = this.body[0]['Error'] !== undefined ? true : false;
      },
      (err) => {
        console.error('ngOnInit - err', err);
        this.noData = true;
        this.hayError = true;
        this.planVisitas = [];
      }
    );
  }
}
