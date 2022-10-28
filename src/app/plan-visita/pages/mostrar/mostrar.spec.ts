import { Observable, throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlanVisitaService } from '../../services/plan-visita.service';
import { MostrarComponent } from './mostrar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Text1, Zterm } from '../../interfaces/planVisita.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChannelTokenService } from '../../services/channel-token.service';

describe('', () => {
  let fixture: ComponentFixture<MostrarComponent>;
  let component: MostrarComponent;
  let planVisitaService: PlanVisitaService;
  //let location: Location;
  let authService: AuthService;
  let channelTokenService: ChannelTokenService;
  let httpMock: HttpTestingController;
  let store = {};

  const email = {
    body: {
      ruta: 'ruta',
      cod_user: '001',
      nombre_user: '002',
    },
  };

  const planVisitas = {
    body: [
      {
        kunnr: 'dat',
        txtmd: 'demo',
        erdat: null,
        aufsd: 'dat',
        text1: Text1.PagoContado,
        zterm: Zterm.Yg01,
        mcod3: '',
        stras: 'dat',
        telf1: 'dat',
        lat: 'dat',
        long: 'dat',
        plan: null,
      },
      {
        kunnr: 'dat',
        txtmd: 'demo2',
        erdat: null,
        aufsd: 'dat',
        text1: Text1.PagoContado,
        zterm: Zterm.Yg01,
        mcod3: '',
        stras: 'dat',
        telf1: 'dat',
        lat: 'dat',
        long: 'dat',
        plan: null,
      },
    ],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [PlanVisitaService, ToastrService],
    }).compileComponents();

    planVisitaService = TestBed.inject(PlanVisitaService);
    authService = TestBed.inject(AuthService);
    channelTokenService = TestBed.inject(ChannelTokenService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(MostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Init: Debe Cargar la lista de plan visita', () => {
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      return (store[key] = value + '');
    });

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      return store[key];
    });

    localStorage.setItem('TOKEN', 'token');

    spyOn(planVisitaService, 'getVendedor').and.callFake(() => {
      return Observable.from([email]);
    });

    spyOn(planVisitaService, 'getPlanVisitas').and.callFake(() => {
      return Observable.from([planVisitas]);
    });

    component.ngOnInit();
    fixture.detectChanges();
    expect(component.body.length > 0).toBeTrue();
  });

  it('Debe de llamar a la busquedad de plan de visita', () => {
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      return (store[key] = value + '');
    });

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      return store[key];
    });

    localStorage.setItem('TOKEN', 'token');

    spyOn(planVisitaService, 'getVendedor').and.callFake(() => {
      return Observable.from([email]);
    });

    spyOn(planVisitaService, 'getPlanVisitas').and.callFake(() => {
      return Observable.from([planVisitas]);
    });

    component.ngOnInit();
    component.busquedad = 'demoss';
    component.buscar();
    fixture.detectChanges();
    expect(component.body.length).toEqual(planVisitas.body.length);
  });

  it('Init: Error al listar Clientes', () => {
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      return (store[key] = value + '');
    });

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      return store[key];
    });

    localStorage.setItem('TOKEN', 'token');

    spyOn(planVisitaService, 'getVendedor').and.callFake(() =>
      throwError(new Error('error'))
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.hayError).toEqual(true);
  });

  it('Init: Error al Plan visita', () => {
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      return (store[key] = value + '');
    });

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      return store[key];
    });

    localStorage.setItem('TOKEN', 'token');

    spyOn(planVisitaService, 'getVendedor').and.callFake(() => {
      return Observable.from([email]);
    });

    spyOn(planVisitaService, 'getPlanVisitas').and.callFake(() =>
      throwError(new Error('error'))
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.hayError).toEqual(true);
  });
});
