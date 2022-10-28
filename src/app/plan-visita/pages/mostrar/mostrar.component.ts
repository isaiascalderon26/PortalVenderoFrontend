import { Component, OnInit } from '@angular/core';
import { PlanVisitaService } from '../../services/plan-visita.service';
import { Body, PlanViisitaClientes } from '../../interfaces/planesVisitaClientes.interface';
import { Vendedor, Body1 } from '../../interfaces/vendedorPortal';
import { PlanVisita } from '../../interfaces/planVisita.interface';
import { ChannelTokenService } from '../../services/channel-token.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss'],
})
export class MostrarComponent implements OnInit {
  // get auth() {
  //   return this.authService.account;
  // }
  busquedad = '';

  planVisitas: PlanViisitaClientes[] = [];
  body: Body[] = [];
  bodyBackoup: Body[] = [];
  hayError = false;
  bclientes: PlanVisita[] = [];
  vendedor: Vendedor[] = [];
  Body1: Body1[] = [];
  codVendedor = '';
  nameVendedor = '';
  constructor(
    private planService: PlanVisitaService,
    private channelTokenService: ChannelTokenService,
    private cookieService: CookieService
  ) {}

  public buscar(): void {
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
    const token = this.cookieService.get('_token');
    const group = localStorage.getItem('GROUP') !== null ? localStorage.getItem('GROUP').split(',') : null;
    if (token !== null || token !== undefined) {
      this._loadVendedor();
    }
    this.channelTokenService.verifyAdminUser(group);
    this._suscribeChannel();
  }

  private _suscribeChannel(): void {
    this.channelTokenService.$subject.subscribe(() => {
      this._loadVendedor();
    });
  }

  private _loadVendedor(): void {
    this.planService.getVendedor().subscribe(
      (email: any) => {
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
      },
      (err) => {
        this.hayError = true;
        this.planVisitas = [];
      }
    );
  }
}
