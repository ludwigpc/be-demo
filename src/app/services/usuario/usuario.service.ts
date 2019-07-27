import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_WS, httpOptions } from '../../config/config';
import {Md5} from 'ts-md5/dist/md5';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { formatDate } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  nombrecorto: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
    if(this.usuario){

      this.nombrecorto = this.usuario.nombre.split(' ')[2] + ' ' + this.usuario.nombre.split(' ')[0];
    }
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage(token: string, usuario: Usuario) {

    //grabar en el localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }


  login ( usuario: any, recordar: boolean = false ) {

    if( recordar ) {
      localStorage.setItem('user', usuario.usuario);
    } else {
      localStorage.removeItem('user');
    }

    let url = URL_WS + '/cliente/autenticar';
    let pass = new Md5().appendStr('sam'+ usuario.clave).end();
    usuario.clave = new Md5().appendStr(pass+'meliodas').end();

    let body = new URLSearchParams();
    body.set('usuario', usuario.usuario);
    body.set('clave', usuario.clave);
    
    return this.http.post( url, body.toString(), httpOptions)
    .map( (resp: any) => {
      if (resp.success) {
        //grabar en el localStorage
        let user = resp.beCliente;
        const date = new Date(user.fechaNacimiento);
        let usuario = new Usuario(user.identificacion, user.persona, user.correo, user.imagen, user.celular, user.telefono,
          user.clave, user.direccion, user.referencia, user.genero, user.idTipoIdentificacion,
          formatDate(date, 'd/M/yyyy', 'es-ES'),
          user.latitud, user.longitud, user.idCliente);
          
        this.guardarStorage( resp.beCliente.secretoAutenticacion, usuario);
        //console.log( resp );
            return true;
      }else{
            return false;
      }
        })
        .catch( err => {
          console.log(err.error);
          //swal('Error al Iniciar Sesión', err.error.mensaje, 'error');
          return throwError( err );
          
        });
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }


}

