import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BuscarComponent } from './buscar.component';

describe('', () => {
  let fixture: ComponentFixture<BuscarComponent>;
  let component: BuscarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarComponent);
    component = fixture.componentInstance;
  });
});
