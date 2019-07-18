import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeES from "@angular/common/locales/es";

registerLocaleData(localeES, "es");
import {
  UsuarioService,
  SidebarService,
  TransaccionService,
  CuentaService,
  PrestamoService,
  MathService,
  LoginGuardGuard,
  LogoutGuard
} from './services.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    SidebarService,
    CuentaService,
    TransaccionService,
    PrestamoService,
    MathService,
    LoginGuardGuard,
    LogoutGuard
  ]
})
export class ServiceModule { }
