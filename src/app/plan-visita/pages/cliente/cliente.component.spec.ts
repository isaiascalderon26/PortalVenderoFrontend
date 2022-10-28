import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClienteComponent } from './cliente.component';
import { PlanVisitaService } from '../../services/plan-visita.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('', () => {
  let fixture: ComponentFixture<ClienteComponent>;
  let component: ClienteComponent;
  // const servicio = new PlanVisitaService(null, null);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ToastrModule.forRoot(), RouterModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [PlanVisitaService, ToastrService],
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;

    // component = new ClienteComponent(servicio, null);
  });

  it('Init: Debe Cragar la lista de Clientes', () => {
    // spyOn(servicio, 'getClientes');
    // component.ngOnInit();
    // expect(component.planVisitas.length).toBeGreaterThan(0);
  });
});
