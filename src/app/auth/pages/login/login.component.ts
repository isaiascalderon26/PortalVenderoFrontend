import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import 'crypto-js/lib-typedarrays';
import awsconfig from 'src/app/auth/aws-exports';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public normalLogin = true;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private cookieService: CookieService,
              private router: Router,
    ) {}

  ngOnInit(): void {
    Auth.configure({oauth: awsconfig.oauth});
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onLoginClick(): void {
    const tokenCooked = this.cookieService.get('_token') ? this.cookieService.get('_token') : undefined;
    if (tokenCooked === undefined) {
      Auth.federatedSignIn();
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  public showNewLogin(value: boolean): void{
    this.normalLogin = value;
  }

  async onSubmit(): Promise<void>{
    const user = this.form.value.username;
    const password = this.form.value.password;
    const usuario = await Auth.signIn(user, password);
    await Auth.currentSession()
    .then((sesion) => {

    })
    .catch((errorSession) => {
      console.error('onSubmit - Error en Session:', errorSession);
    });
  }
}
