import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styles: []
})
export class CuentaComponent implements OnInit {

  usuario: Usuario;
  genero: string = 'FEMENINO';
  tipoIdentificacion: string = 'CÉDULA';
  lat: number = 0;
  lng: number = 0;
  zoom: number = 15;

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.lat = this.usuario.latitud;
    this.lng = this.usuario.longitud;
    if (this.usuario.genero) {
      this.genero = 'MASCULINO';
    }
    //console.log(this.usuario.tippIdentificacion);
    if (this.usuario.tippIdentificacion != '1'){
      this.tipoIdentificacion = "PASAPORTE";
    }
  }

}
