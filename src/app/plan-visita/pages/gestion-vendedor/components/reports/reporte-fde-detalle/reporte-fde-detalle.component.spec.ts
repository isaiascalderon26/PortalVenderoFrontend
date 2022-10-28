import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteFdeDetalleComponent } from './reporte-fde-detalle.component';

describe('ReporteFdeDetalleComponent', () => {
  let component: ReporteFdeDetalleComponent;
  let fixture: ComponentFixture<ReporteFdeDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteFdeDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteFdeDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 
