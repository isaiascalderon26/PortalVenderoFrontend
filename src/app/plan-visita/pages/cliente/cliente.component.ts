import { Location, PlatformLocation } from '@angular/common';
import { AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Body } from '../../interfaces/planVisita.interface';
import { PlanVisitaService } from '../../services/plan-visita.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  public planVisitas: any;
  public tabsToApps = [
    {
      id: 0,
      name: 'clientData',
      label: 'Datos Cliente'
    },
    {
      id: 1,
      name: 'history',
      label: 'Historial'
    },
    {
      id: 2,
      name: 'promotion',
      label:'Precio-promoción'
    }
  ];
  public appToshow: string;
  public body: Body[] = [];
  protected codigoCliente: string;

  constructor(private location: Location, private planService: PlanVisitaService, private route: ActivatedRoute,
              private spinnerService: SpinnerService) {
    route.params.subscribe((response) => {
      this.codigoCliente = response.kunnr;
    });
  }

  public getOutput(event: any): void{
    this.planVisitas = event;
  }

  ngOnInit(): void {
    this.appToshow = 'clientData'
    const stateGeted = JSON.parse(JSON.stringify(this.location.getState()));
    if (stateGeted.navigationId !== 4) {
      this.getVisits(this.codigoCliente);
      this.appToshow = 'history';
    }
  }

  protected getVisits(codigocliente): void {
    this.spinnerService.show();
    this.planService
      .getPlanVisitaPorkunnr(codigocliente)
      .subscribe((cliente: any) => {
        this.planVisitas = cliente.body[0];
      });
    this.spinnerService.hide();
  }

  public displayApp(index: number): void {
    this.appToshow = this.tabsToApps[index].name;
  }
}
