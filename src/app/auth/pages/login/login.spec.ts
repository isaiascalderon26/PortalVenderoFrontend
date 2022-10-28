import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('Validar URL', () => {
    const url = component['urlQA'];
    expect(url).not.toBeNull();
  });

  // it('URL NULL', () => {
  //   const url = component['urlQA'];
  //   expect(url).toBeNull();
  // });
});

// describe('LoginComponent', () => {
//   let componente: LoginComponent;
//   //const servicio = new AuthService(null);

//   beforeEach(() => {
//     componente = new LoginComponent(); //se colocaria el servicio
//   });

//   it('Init: debe cargar la URL rescatada del env', () => {
//     /* const vendedores = ['vendedor1', 'vendedor2', 'vendedor3'];

//     spyOn(servicio, 'getSession').and.callFake(() => {
//       return Observable.from([vendedores]);
//     }); */

//     componente.ngOnInit();

//     expect(componente.ngOnInit.length).toBeGreaterThan(0);
//   });

//   /*  Ejemplo para poder consumir servicios

//   it ('Debe de llamar al servicio para poder verrr el plan visita', () => {

//     const espia = spyOn( servicio, 'agregarMedico').and.callFake( planVisita => {
//         return Observable.empty();
//     })

//     componente.ngOnInit();

//     expect( espia).toHaveBeenCalled(); */

//   // Ejemplo para poder gatillar el plan visita, clientes y el historial de pedidos

//   it('Debe tener un perfil de vendedor con ruta asignada y email', () => {
//     const vendedor = {
//       cod_user: 6019167,
//       nombre_user: 'CÉSAR CARRASCO',
//       rut_user: 14007037 - 8,
//       ruta: 'CA31',
//     };
//   });
// });
