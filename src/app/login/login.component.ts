import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/services.index';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  recuerdame: boolean = false;
  acceso: boolean = true;
  cargando: boolean = false;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.user = localStorage.getItem('user') || '';
    if( this.user.length > 1 ) {
      this.recuerdame = true;
    }
  }


  ingresar( forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    this.cargando = true;
    this.acceso = true;

    let usuario = {usuario: forma.value.usuario, clave: forma.value.password};

    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe( correcto => {
        if( correcto ) {
          this.router.navigate(['/dashboard']);
        }else{
          this.acceso = false;
          this.cargando = false;
        }
      });

  }

}
