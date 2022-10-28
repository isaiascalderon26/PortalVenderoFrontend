import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AttributesReports } from '../../interfaces/attributesReports';

@Component({
  selector: 'app-gestion-vendedor',
  templateUrl: './gestion-vendedor.component.html',
  styleUrls: ['./gestion-vendedor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionVendedorComponent implements OnInit {

  active = 1 ;
  public reports = new Array();
  constructor() {
   }

  ngOnInit(): void {
    const attrReports1 = new AttributesReports();
    const attrReports2 = new AttributesReports();
    const attrReports3 = new AttributesReports();
    const attrReports4 = new AttributesReports();
    const attrReports5 = new AttributesReports();
    const attrReports6 = new AttributesReports();
    attrReports1.name = 'Remunerativo General';
    attrReports1.application = 'app-gestion';
    attrReports1.index = 1;

    attrReports2.name = 'Cumplimiento Global';
    attrReports2.application = 'app-cliente-remunerativo';
    attrReports2.index = 2;

    attrReports3.name = 'Cumplimiento por Volumen (detalle)';
    attrReports3.application = 'app-reporte-volumen';
    attrReports3.index = 3;

    attrReports4.name = 'Cumplimiento por Volumen (Global)';
    attrReports4.application = 'app-report-vol-global';
    attrReports4.index = 4;

    attrReports5.name = 'Cumplimiento FDE';
    attrReports5.application = 'app-reporte-fde-detalle';
    attrReports5.index = 5;

    attrReports6.name = 'Cumplimiento por Volumen (Parcializada)';
    attrReports6.application = 'app-report-vol-parcial';
    attrReports6.index = 6;
    this.reports.push(attrReports1, attrReports2, attrReports3, attrReports4, attrReports6, attrReports5 );
  }

}
