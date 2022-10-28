import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
declare var gtag;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vendedores';
  constructor(router: Router) {
    const navEndEvents = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );
    navEndEvents.subscribe((event: NavigationEnd) => {
      gtag('config', 'G-PGFJ4P5CSK', {
        page_path: event.urlAfterRedirects
      });
    });
  }

  public ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

}
