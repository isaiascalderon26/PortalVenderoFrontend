import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClientesPlanVisitaComponent } from './clientes-plan-visita.component';

describe('', () => {
  let fixture: ComponentFixture<ClientesPlanVisitaComponent>;
  let component: ClientesPlanVisitaComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesPlanVisitaComponent);
    component = fixture.componentInstance;
  });
});
