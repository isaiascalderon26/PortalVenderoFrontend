import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPedidosDetalleComponent } from './historial-pedidos-detalle.component';

describe('HistorialPedidosDetalleComponent', () => {
  let component: HistorialPedidosDetalleComponent;
  let fixture: ComponentFixture<HistorialPedidosDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialPedidosDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialPedidosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
