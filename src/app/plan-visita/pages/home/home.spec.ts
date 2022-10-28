import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CognitoService } from '../../services/cognito.service';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { of, Observable } from 'rxjs';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let location: Location;
  let router: Router;
  let activateRouter: ActivatedRoute;
  let cognitoService: CognitoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AuthService, CognitoService],
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    cognitoService = TestBed.inject(CognitoService);
    httpMock = TestBed.inject(HttpTestingController);
    activateRouter = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Cerrar la sesion del usuariio', () => {
    //component.onLogout();
  });

  it('OnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();
  });

  let token;
  it('Firts Token', () => {
    const params = (activateRouter.queryParams = of({ code: 'token' }));
    params.subscribe((param) => {
      const tokenLocal = localStorage.getItem('TOKEN');

      if (!tokenLocal) {
        token = param.code;
      }
      expect(tokenLocal).toBeNull();
    });
  });

  it('exist Token', async () => {
    const data = {
      email: 'icalderon@koandina.com',
    };

    if (token) {
      (await cognitoService.getToken(token)).subscribe((response) => {
        expect(response['email']).not.toBeNull();
      });

      const url =
        'https://sso-portalvendedores-qa.auth.us-east-1.amazoncognito.com/oauth2/token/';

      const request =
        url +
        '?grant_type=authorization_code&client_id=2cncnek7vv7cevp3m5u5jv98de&redirect_uri=https://gestion-qa.miandina.cl/plan-visita/mostrar&code=' +
        token;

      const req = httpMock.expectOne(request);
      expect(req.request.method).toBe('POST');
      req.flush(data);
    }
  });

  it('auth value', () => {
    // const attributes = Object.keys(component.auth).length;
    // expect(attributes).toEqual(0);
  });
});
