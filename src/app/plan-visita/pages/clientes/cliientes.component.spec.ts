import { Observable, throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlanVisitaService } from '../../services/plan-visita.service';
import { ClientesComponent } from './clientes.component';
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

describe('', () => {
  let fixture: ComponentFixture<ClientesComponent>;
  let component: ClientesComponent;
  let planVisitaService: PlanVisitaService;
  //let location: Location;
  let router: Router;
  let activateRouter: ActivatedRoute;

  let httpMock: HttpTestingController;

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

    router = TestBed.get(Router);
    planVisitaService = TestBed.inject(PlanVisitaService);
    httpMock = TestBed.inject(HttpTestingController);
    activateRouter = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Init: Debe Cragar la lista de Clientes', () => {
    const cliente = ['cliente1', 'cliente2', 'cliente3'];
    spyOn(planVisitaService, 'getClientes').and.callFake(() => {
      return Observable.from([cliente]);
    });

    component.ngOnInit();
    fixture.detectChanges();
    expect(component.planVisitas.length).toEqual(0);
  });

  it('Debe de llamar a la busquedad de clientes', () => {
    const cliente = {
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

    spyOn(planVisitaService, 'getClientes').and.callFake(() => {
      return Observable.from([cliente]);
    });

    component.ngOnInit();
    fixture.detectChanges();
    component.busquedad = 'demoss';
    component.buscar();
    fixture.detectChanges();
    expect(component.body.length).toEqual(cliente.body.length);
  });

  it('Init: Error al listar Clientes', () => {
    spyOn(planVisitaService, 'getClientes').and.callFake(() =>
      throwError(new Error('error'))
    );

    component.ngOnInit();
    fixture.detectChanges();
    expect(component.hayError).toEqual(true);
  });
});
