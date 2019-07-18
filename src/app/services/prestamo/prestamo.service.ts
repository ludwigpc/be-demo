import { Injectable } from '@angular/core';
import { Prestamo } from '../../models/prestamo.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_WS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  prestamo: Prestamo;
  prestamos: Prestamo [] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })};

  constructor(
    public http: HttpClient
  ) { }

  cargarPrestamos() {
    this.prestamos = [];
    let url =URL_WS + '/prestamo/porCliente';
    let body = new URLSearchParams();
    body.set('idCliente', '10');//id
    body.set('mbAlfa', '10');//id
    body.set('mbBeta', '5d0f1c7779cc4f4cc8b6d759332aa479');//clave
    // body.set('idCliente', this._usuarioService.usuario.id);//id
    // body.set('mbAlfa', this._usuarioService.usuario.id);//id
    // body.set('mbBeta', this._usuarioService.usuario.clave);//clave
    body.set('mbTeta', '6');
    body.set('mbOmega', '1');

    return this.http.post( url, body.toString(), this.httpOptions)
        .map( (resp: any) => {
          // this.totalHospitales=resp.total;
          // console.log(resp);
          this.filtrarPrestamos(resp);
          return this.prestamos;
        });
  }

  filtrarPrestamos(lista: any[]) {

    lista.forEach(element => {
      // console.log(element.cuenta);
      // this.prestamo = new Prestamo(element.cuenta, element.beTipoCuenta.tipoCuenta, element.saldoContable, element.saldoDisponible
      //   , element.idCuenta);
      console.log(this.prestamo);
      this.prestamos.push(this.prestamo);
      // console.log(this.cuentas);
    });
  }
}
