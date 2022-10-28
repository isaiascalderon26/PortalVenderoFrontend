import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface formDataInterface {
  username: string;
  name: string;
  [key: string]: string;
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  public miFormulario: FormGroup = this.fb.group({
    name: ['Isaias', [Validators.required, Validators.name]],
    username: [
      'icalderon@koandina.cl',
      [Validators.required, Validators.email],
    ],
    rut: ['25780249-3', [Validators.required, Validators.minLength(6)]],
    codigoV: ['123456789', [Validators.required, Validators.required]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    password2: ['123456', [Validators.required, Validators.minLength(6)]],
  });
  constructor(private fb: FormBuilder) {}

  crearUsuario() {}
}
