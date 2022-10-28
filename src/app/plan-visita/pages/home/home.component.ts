import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CognitoService } from '../../services/cognito.service';
import { ChannelTokenService } from '../../services/channel-token.service';
import { CookieService } from 'ngx-cookie';
import { SpinnerService } from '../../services/spinner.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private cognitoService: CognitoService,
    private channelTokenService: ChannelTokenService,
    private router: Router,
    private cookieService: CookieService,
    private spinnerSvc: SpinnerService
  ) {
  }
  public isAdmin = false;


  ngOnInit(): void {
    this.loadToken();
    this.channelTokenService.adminSubject.subscribe((data) => {
      setTimeout(() => this.isAdmin = data );
    });
  }
  onLogout(): void {
    this.cognitoService.logout();
  }

  private loadToken(): void {
    this.spinnerSvc.show();
    this.activatedRoute.queryParams.subscribe(async (params) => {
      const tokenCooked = this.cookieService.get('_token') ? this.cookieService.get('_token') : undefined;
      if (tokenCooked === undefined) {
        const codigo = params.code;
        (await (this.cognitoService.getToken(codigo))).subscribe((data: any) => {
          this.cookieService.put('_token', data.idToken);
          localStorage.setItem('EMAIL', data.email);
          localStorage.setItem('GROUP', data.group);
          this.isAdmin = data.group.includes('admin-group');
          this.channelTokenService.consumeVendedor();
          this.router.navigateByUrl('/plan-visita/mostrar');
        });
      } else {
        this.spinnerSvc.show();
        this.router.navigateByUrl('/plan-visita/mostrar');
      }
    });
  }

}
