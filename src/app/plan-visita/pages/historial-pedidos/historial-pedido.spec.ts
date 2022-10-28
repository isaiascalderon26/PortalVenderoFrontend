import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HistorialPedidosComponent } from './historial-pedidos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { of, Observable } from 'rxjs';
import { HistorialPedidosService } from '../../services/historial-pedidos.service';
describe('', () => {
  let fixture: ComponentFixture<HistorialPedidosComponent>;
  let component: HistorialPedidosComponent;
  let router: Router;
  let activateRouter: ActivatedRoute;
  let historialPedidosService: HistorialPedidosService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialPedidosComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    //location = TestBed.get(Location);
    historialPedidosService = TestBed.inject(HistorialPedidosService);
    httpMock = TestBed.inject(HttpTestingController);
    activateRouter = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('OnInit HistoriaL', () => {
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('Init: Debe Cargar la lista de pedidos', () => {
  
  });
});
