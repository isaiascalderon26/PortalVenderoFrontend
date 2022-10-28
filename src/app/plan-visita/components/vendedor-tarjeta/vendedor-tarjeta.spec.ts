import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VendedorTarjetaComponent } from './vendedor-tarjeta.component';
import { PlanVisitaService } from '../../services/plan-visita.service';
import { Observable } from 'rxjs';

describe('', () => {
  let fixture: ComponentFixture<VendedorTarjetaComponent>;
  let component: VendedorTarjetaComponent;
  let planVisitaService: PlanVisitaService;

  const email = {
    body: {
      ruta: 'ruta',
      cod_user: '001',
      nombre_user: '002',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VendedorTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Create component', () => {
    expect(component).toBeTruthy();
  });
});
