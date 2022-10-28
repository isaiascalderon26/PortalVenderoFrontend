import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClienteTarjetaComponent } from './cliente-tarjeta.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { Text1, Zterm } from '../../interfaces/planesVisitaClientes.interface';
import { Body, Mcod3 } from '../../interfaces/planVisita.interface';

describe('', () => {
  let fixture: ComponentFixture<ClienteTarjetaComponent>;
  let component: ClienteTarjetaComponent;
  let router: Router;

  const body: Body = {
    kunnr: 'dat',
    txtmd: 'demo3',
    erdat: null,
    aufsd: 'dat',
    text1: Text1.PagoContado,
    zterm: Zterm.Yg01,
    mcod3: Mcod3.LasCondes,
    stras: 'dat',
    telf1: 'dat',
    lat: 'dat',
    long: 'dat',
    plan: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteTarjetaComponent],
      imports: [CommonModule, HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    router = TestBed.get(Router);
    fixture = TestBed.createComponent(ClienteTarjetaComponent);
    component = fixture.componentInstance;
  });

  it('OnInit', () => {
    component.body = body;
    fixture.detectChanges();
    expect(component.body).not.toBeUndefined();
  });
});
