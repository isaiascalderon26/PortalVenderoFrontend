import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { PrecioPomocionComponent } from './precio-pomocion.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AdapterService } from '../../services/adapter-b2b.service';

describe('index method', () => {
  let fixture: ComponentFixture<PrecioPomocionComponent>;
  let adapterService: AdapterService;
  let component: PrecioPomocionComponent;
  let activateRouter: ActivatedRoute;
  let httpMock: HttpTestingController;
  let router: Router;
  let dialogSpy: jasmine.Spy;
  let dialogResSpyObjet = jasmine.createSpyObj({
    afterClosed: of({
      hi: 'bye',
    }),
    close: null,
  });
  let dialogLowSpyObjet = jasmine.createSpyObj({
    afterClosed: of({
      hi: 'bye',
      name: 'isaias',
    }),
    close: null,
  });
  let dialog;
  let dialog2;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AdapterService],
    }).compileComponents();

    router = TestBed.get(Router);
    adapterService = TestBed.inject(AdapterService);
    httpMock = TestBed.inject(HttpTestingController);
    activateRouter = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(PrecioPomocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.inject(MatDialog);
    dialog2 = TestBed.inject(MatDialog);
    component.itemList = new Array();
  });

  it('OnInit promotionPrice', () => {
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('Init: Load the list of orders', () => {
    const discount = {
      data: [
        {
          cpgId: '001',
          countryId: 'CL',
          clientId: 1363,
          erpClientId: '0500882511',
          ' X-B2B-Transaction-Id':
            'e9b41f27-8e94-4df3-be65-dd3339561d234554774342',
          'X-B2B-Organization-Id': '3043',
          lambdaname: 'getdiscounts',
          clientDiscounts: [
            {
              discountId: 161,
              active: false,
              motive: 'prueba b2b',
            },
          ],
        },
      ],
    };

    spyOn(adapterService, 'getDiscount').and.returnValue(
      Promise.resolve(discount)
    );
    component.ngOnInit();
    fixture.detectChanges();
  });

 /*  it('Init: bulk method receives a boolean parameter must return true or false', () => {
    const resp = {
      checked: true,
    };
    component.bulk(true);
    expect(component.allComplete).toBeTruthy();

    resp.checked = false;
    component.bulk(false);
    expect(component.allComplete).toBeFalsy();
  }); */
  
  it('Init: clickeables method receives a boolean parameter must return true or false', () => {
    const valor =  [{
      valo1: true
    }]
    spyOn(adapterService, 'getDiscount').and.returnValue(
      Promise.resolve(valor)
    );
    component.motiveList = ['a', 'b', 'c'];
    component.itemList.push({ active: true, discountId: 3 });
    component.clickeables(false);
    expect(component.discount).toBeFalsy();
    component.clickeables(true);
    expect(component.discount).toBeTruthy();
  });

  it('Init: method Dialog', () => {
    component.itemList.push({ name: '' }, { name: 'any1' });
    const event = {
      checked: true,
    };

    const spy = spyOn(component.dialog, 'open').and.returnValue(
      dialogResSpyObjet
    );

    component.detailDiscount(0, event);
    expect(dialogResSpyObjet.afterClosed).toHaveBeenCalled();

    event.checked = false;
    spy.and.returnValue(dialogLowSpyObjet);
    component.detailDiscount(1, event);
    expect(dialogLowSpyObjet.afterClosed).toHaveBeenCalled();
  });
});
