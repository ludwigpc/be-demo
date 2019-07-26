import { Injectable } from '@angular/core';
import { Transaccion } from '../../models/transaccion.model';
import { URL_WS } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { UsuarioService } from '../usuario/usuario.service';
import { MathService } from '../math/math.service';



@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  transaccion: Transaccion;
  nroCuenta: string = "";
  tipoCuenta: string = "";
  transacciones: Transaccion [] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })};

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _mathService: MathService
  ) { }

  cargarTransacciones(idCuenta: string) {
    this.transacciones = [];
    let url =URL_WS + '/transaccion/porCuenta';
    let body = new URLSearchParams();

    body.set('idCuenta', idCuenta);//id
    body.set('mbAlfa', this._usuarioService.usuario.id);//id
    body.set('mbBeta', this._usuarioService.usuario.clave);//clave
    body.set('mbTeta', '6');
    body.set('mbOmega', '1');

    return this.http.post( url, body.toString(), this.httpOptions)
        .map( (resp: any) => {
          console.log('hola');
          console.log(resp);
          if(resp.length > 0) {
          this.nroCuenta = resp[0].beCuenta.cuenta;
          this.tipoCuenta= resp[0].beCuenta.beTipoCuenta.tipoCuenta;
          this.filtrarTransacciones(resp);
          return this.transacciones;
        }
        return false;
        });
  }

  filtrarTransacciones(lista: any[]) {

    let lista2 = lista.reverse();

    lista2.forEach(element => {
      const date = new Date(element.fechaHoraProceso);
      this.transaccion = new Transaccion(formatDate(date, 'd/M/yy', 'es-ES'), formatDate(date, 'h:mm a', 'es-ES'),
        element.beSubtipoTransaccion.beTipoTransaccion.tipoTransaccion, element.monto.toFixed(2),
        element.saldoContablePosterior.toFixed(2),
        element.saldoDisponiblePosterior.toFixed(2), element.idTransaccion);
      this.transacciones.push(this.transaccion);
    });
  }
}
