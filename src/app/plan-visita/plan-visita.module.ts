import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanVisitaRoutingModule } from './plan-visita-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { GestionVendedorComponent } from './pages/gestion-vendedor/gestion-vendedor.component';
import { GestionComponent } from './pages/gestion-vendedor/components/gestion/gestion.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { CreditoComponent } from './pages/credito/credito.component';
import { HistorialPedidosComponent } from './pages/historial-pedidos/historial-pedidos.component';
import { IndicadoresComponent } from './pages/indicadores/indicadores.component';
import { ListaComponent } from './pages/lista/lista.component';
import { ClienteTarjetaComponent } from './components/cliente-tarjeta/cliente-tarjeta.component';
import { VendedorTarjetaComponent } from './components/vendedor-tarjeta/vendedor-tarjeta.component';
import { SpinnerInterceptor } from 'src/app/shared/interceptors/spinner.interceptor';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { PagoPipe } from './pipes/pago.pipe';
import { MapsBoxComponent } from './components/maps-box/maps-box.component';
import { ClientesPlanVisitaComponent } from './components/clientes-plan-visita/clientes-plan-visita.component';
import { CookieModule } from 'ngx-cookie';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from '../app.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { ComponentsclienteRemunerativoComponent } from './pages/gestion-vendedor/components/reports/cliente-remunerativo/cliente-remunerativo.component';
import { ReporteFdeDetalleComponent } from './pages/gestion-vendedor/components/reports/reporte-fde-detalle/reporte-fde-detalle.component';
import { ReporteVolumenComponent } from './pages/gestion-vendedor/components/reports/reporte-volumen/reporte-volumen.component';
import { ReportVolGlobalComponent } from './pages/gestion-vendedor/components/reports/report-vol-global/report-vol-global.component';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Chart, registerables } from 'chart.js';
import { MarketingComponent } from './pages/marketing/marketing.component';
import { ReportVolParcialComponent } from './pages/gestion-vendedor/components/reports/report-vol-parcial/report-vol-parcial.component';
import { PrecioPomocionComponent, LowDetail, DetailDiscount } from './pages/precio-pomocion/precio-pomocion.component';
import { HistorialPedidosDetalleComponent } from './pages/historial-pedidos-detalle/historial-pedidos-detalle.component';

Chart.register(...registerables);
@NgModule({
  declarations: [
    BuscarComponent,
    MostrarComponent,
    HomeComponent,
    ClientesComponent,
    GestionVendedorComponent,
    GestionComponent,
    ClienteComponent,
    CreditoComponent,
    HistorialPedidosComponent,
    IndicadoresComponent,
    ListaComponent,
    ClienteTarjetaComponent,
    VendedorTarjetaComponent,
    PagoPipe,
    MapsBoxComponent,
    ClientesPlanVisitaComponent,
    ComponentsclienteRemunerativoComponent,
    ReporteVolumenComponent,
    ReportVolGlobalComponent,
    ReporteFdeDetalleComponent,
    AdministrationComponent,
    MarketingComponent,
    ReportVolParcialComponent,
    PrecioPomocionComponent,
    LowDetail,
    DetailDiscount,
    HistorialPedidosDetalleComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    PlanVisitaRoutingModule,
    MaterialModule,
    CookieModule.forRoot(),
    SpinnerModule,
    MatIconModule,
    MatTabsModule,
    MatRippleModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class PlanVisitaModule {}
