import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { InversionesComponent } from './inversiones/inversiones.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { PrestamoComponent } from './prestamos/prestamo.component';


const pagesRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent,
            //canActivate: [LoginGuardGuard],
            data: {
                titulo: 'Posición Consolidada', descripcion: 'inicio'
            }
        },
    { path: 'prestamos', component: PrestamosComponent, data: {titulo: 'Prestamos'}},
    { path: 'inversiones', component: InversionesComponent, data: {titulo: 'Inversiones'}},
    { path: 'cotizador-prestamos', component: CotizadorComponent, data: {titulo: 'Cotizador de prestamos'}},
    { path: 'cuenta', component: CuentaComponent, data: {titulo: 'Mi Cuenta'}},
    { path: 'transacciones/:id', component: TransaccionesComponent, data: {titulo: 'Transacciones'}},
    { path: 'prestamo', component: PrestamoComponent, data: {titulo: 'Prestamo'}},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'}

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);