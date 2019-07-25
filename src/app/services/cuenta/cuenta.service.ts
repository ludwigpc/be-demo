import { Injectable } from '@angular/core';
import { Cuenta } from '../../models/cuenta.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_WS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { MathService } from '../math/math.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  cuenta: Cuenta;
  cuentas: Cuenta [] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })};

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _mathService: MathService
  ) { }

  cargarCuentas() {
    this.cuentas = [];
    let url =URL_WS + '/cuenta/obtenerOcupadoPorCliente';
    let body = new URLSearchParams();

    body.set('idCliente', this._usuarioService.usuario.id);//id
    body.set('mbAlfa', this._usuarioService.usuario.id);//id
    body.set('mbBeta', this._usuarioService.usuario.clave);//clave

    body.set('mbTeta', '6');
    body.set('mbOmega', '1');

    return this.http.post( url, body.toString(), this.httpOptions)
        .map( (resp: any) => {
          // console.log(resp);
          this.filtrarCuentas(resp);
          return this.cuentas;
        });
  }

  filtrarCuentas(lista: any[]) {

    lista.forEach(element => {
      let sCont = 0;
      let sDisp = 0;
      if (element.saldoContable) {
        sCont = element.saldoContable;
      }
      if (element.saldoDisponible) {
        sDisp = element.saldoDisponible;
      }
      this.cuenta = new Cuenta(element.cuenta, element.beTipoCuenta.tipoCuenta, sCont.toFixed(2),
      sDisp.toFixed(2),
        element.idCuenta);
      this.cuentas.push(this.cuenta);
    });
  }
}
