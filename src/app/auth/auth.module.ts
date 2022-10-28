import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { MainComponent } from './pages/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'crypto-js/lib-typedarrays';
import { Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { CookieModule  } from 'ngx-cookie';
import { AppComponent } from '../app.component';


// Amplify.configure(awsconfig);
Auth.configure({
  Auth: {
    // mandatorySignIn: true,
    identityPoolId: environment.AWS_IDENTITY_POOL_ID,
    region: environment.AWS_REGION,
    userPoolId: environment.AWS_USER_POOL_ID,
    userPoolWebClientId: environment.AWS_CLIENT_ID,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: environment.cognitoUri,
      scope: [
        'email', 'openid', 'aws.cognito.signin.user.admin', 'portal_Vendedor/json.read'
      ],
      redirectSignIn: environment.redirectUri,
      redirectSignOut: environment.redirecSignOutUri,
      responseType: 'code'
    },
    options: {
      AdvancedSecurityDataCollectionFlag: true
    },
    federationTarget: 'COGNITO_USER_AND_IDENTITY_POOLS',
    aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  }
});

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CookieModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AuthModule { }
