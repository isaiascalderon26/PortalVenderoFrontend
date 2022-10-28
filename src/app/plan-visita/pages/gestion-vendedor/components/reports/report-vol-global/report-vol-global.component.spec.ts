import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportVolGlobalComponent } from './report-vol-global.component';

describe('ReportVolGlobalComponent', () => {
  let component: ReportVolGlobalComponent;
  let fixture: ComponentFixture<ReportVolGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportVolGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportVolGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
