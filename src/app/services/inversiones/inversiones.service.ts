import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Poliza } from '../../models/poliza.model';
import { URL_WS, httpOptions } from '../../config/config';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InversionesService {
  
  poliza: Poliza;
  polizas: Poliza [] = [];

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPolizas() {
    this.polizas = [];
    let url =URL_WS + '/poliza/porCliente';
    let body = new URLSearchParams();

    body.set('idCliente', this._usuarioService.usuario.id);//id
    body.set('mbAlfa', this._usuarioService.usuario.id);//id
    body.set('mbBeta', this._usuarioService.usuario.clave);//clave
    body.set('mbTeta', '6');
    body.set('mbOmega', '1');

    return this.http.post( url, body.toString(), httpOptions)
        .map( (resp: any) => {
          this.filtrarPolizas(resp);
          return this.polizas;
        });
  }

  filtrarPolizas(lista: any[]) {

    lista.forEach(element => {

      const dateI = formatDate(new Date(element.fechaInicio), 'dd/MM/yyyy', 'es-ES');
      const dateF = formatDate(new Date(element.fechaHoraLiquido), 'dd/MM/yyyy', 'es-ES');
      this.poliza = new Poliza(dateI, dateF, element.plazo,
        element.monto.toFixed(2), element.interesGenerado.toFixed(2));

      this.polizas.push(this.poliza);
    });
  }
}
