import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PAGES_ROUTES } from './pages.routes';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { InversionesComponent } from './inversiones/inversiones.component';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuentaComponent } from './cuenta/cuenta.component';
import { AgmCoreModule } from '@agm/core';
import { GOOGLE_API_KEY } from '../config/config';
import { TransaccionesComponent } from './transacciones/transacciones.component';


@NgModule({
    declarations: [
        //PagesComponent,
        DashboardComponent,
        PrestamosComponent,
        InversionesComponent,
        CotizadorComponent,
        CuentaComponent,
        TransaccionesComponent
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: GOOGLE_API_KEY
          })
    ]
})
export class PagesModule{ }