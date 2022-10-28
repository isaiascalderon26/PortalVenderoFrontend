import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportVolParcialComponent } from './report-vol-parcial.component';

describe('ReportVolParcialComponent', () => {
  let component: ReportVolParcialComponent;
  let fixture: ComponentFixture<ReportVolParcialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportVolParcialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportVolParcialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
