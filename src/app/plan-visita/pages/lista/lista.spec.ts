import { Observable, throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlanVisitaService } from '../../services/plan-visita.service';
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
import { ListaComponent } from './lista.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('', () => {
  let fixture: ComponentFixture<ListaComponent>;
  let component: ListaComponent;
  let planVisitaService: PlanVisitaService;
  //let location: Location;
  let router: Router;
  let activateRouter: ActivatedRoute;
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
        txtmd: 'demo3',
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
        txtmd: 'demo4',
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
        NoopAnimationsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [PlanVisitaService, ToastrService],
    }).compileComponents();

    router = TestBed.get(Router);
    //location = TestBed.get(Location);
    planVisitaService = TestBed.inject(PlanVisitaService);
    httpMock = TestBed.inject(HttpTestingController);
    activateRouter = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('Init: lista de plan visita historial', () => {
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
});
