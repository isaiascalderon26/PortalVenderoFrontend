import { PrecioPomocionComponent } from './pages/precio-pomocion/precio-pomocion.component';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { GestionComponent } from './pages/gestion-vendedor/components/gestion/gestion.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { CreditoComponent } from './pages/credito/credito.component';
import { HistorialPedidosComponent } from './pages/historial-pedidos/historial-pedidos.component';
import { IndicadoresComponent } from './pages/indicadores/indicadores.component';
import { ListaComponent } from './pages/lista/lista.component';
import { MsalGuard } from '../auth/guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { GestionVendedorComponent } from './pages/gestion-vendedor/gestion-vendedor.component';
import { ComponentsclienteRemunerativoComponent } from './pages/gestion-vendedor/components/reports/cliente-remunerativo/cliente-remunerativo.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { MarketingComponent } from './pages/marketing/marketing.component';
import { HistorialPedidosDetalleComponent } from './pages/historial-pedidos-detalle/historial-pedidos-detalle.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [MsalGuard],
    canActivateChild: [MsalGuard],
    children: [
      { path: 'buscar', component: BuscarComponent },
      { path: 'mostrar', component: MostrarComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'gestion-vendedor', component: GestionVendedorComponent },
      { path: 'cliente/:kunnr', component: ClienteComponent },
      { path: 'credito', component: CreditoComponent },
      { path: 'historial-pedidos', component: HistorialPedidosComponent },
      { path: 'indicadores', component: IndicadoresComponent },
      { path: 'lista/:kunnr', component: ListaComponent },
      { path: 'cliente-remunerativo', component: ComponentsclienteRemunerativoComponent },
      { path: 'gestion', component: GestionComponent },
      { path: 'administration', component: AdministrationComponent },
      { path: 'marketing', component: MarketingComponent },
      { path: 'promotion/:kunnr', component: PrecioPomocionComponent },
      { path: 'historial-pedido-detalle/:cliente/:pedido', component: HistorialPedidosDetalleComponent },
      { path: '', redirectTo: 'mostrar', pathMatch: 'full'  },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanVisitaRoutingModule {}
