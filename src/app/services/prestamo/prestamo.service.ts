import { Injectable } from '@angular/core';
import { Prestamo } from '../../models/prestamo.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_WS } from '../../config/config';
//import { MathService } from '../../../../be-demo/src/app/services/math/math.service';
import { formatDate } from '@angular/common';
import { Cuota } from '../../models/cuota.model';
import { UsuarioService } from '../../../../be-demo/src/app/services/usuario/usuario.service';

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
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPrestamos() {
    this.prestamos = [];
    let url =URL_WS + '/prestamo/porCliente';
    let body = new URLSearchParams();
    body.set('idCliente', this._usuarioService.usuario.id);//id
    body.set('mbAlfa', this._usuarioService.usuario.id);//id
    body.set('mbBeta', this._usuarioService.usuario.clave);//clave
    body.set('mbTeta', '6');
    body.set('mbOmega', '1');

    return this.http.post( url, body.toString(), this.httpOptions)
        .map( (resp: any) => {
          //console.log(resp);
          this.filtrarPrestamos(resp);
          return this.prestamos;
        });
  }

  filtrarPrestamos(lista: any[]) {

    lista.forEach(element => {
      const listaCuotas: any[] = element.listaTablaAmortizacion;
      let cuotas: Cuota [] = [];

      listaCuotas.forEach(cuota => {
        cuota = new Cuota(cuota.bePrestamoAmortizacionPK.cuota, cuota.saldoDeuda.toFixed(2), cuota.interes.toFixed(2),
          cuota.pago, cuota.abonoCapital.toFixed(2), cuota.fecha, cuota.interesMora, cuota.multaMora, cuota.pagoAdicional.toFixed(2),
          cuota.pagoReal.toFixed(2), cuota.saldo.toFixed(2));
        cuotas.push(cuota);

      });

      const date = formatDate(new Date(element.fechaHoraDesembolso), 'dd/MM/yyyy', 'es-ES');
      this.prestamo = new Prestamo(element.estado, element.beCuenta.beTipoCuenta.tipoCuenta, element.beTipoPrestamo.tipoPrestamo,
        element.monto.toFixed(2), element.saldoPendiente.toFixed(2), element.listaTablaAmortizacion[0].pagoReal.toFixed(2),
        cuotas, date, element.idPrestamo);

      this.prestamos.push(this.prestamo);
    });
  }
}
