import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  recuerdame: boolean = false;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.user = localStorage.getItem('user') || '';
    if( this.user.length > 1 ){
      this.recuerdame = true;
    }
  }


  ingresar( forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    //let usuario = new Usuario(null, null, null, forma.value.usuario, forma.value.password);
    let usuario = {usuario: forma.value.usuario, clave: forma.value.password};
    //console.log(usuario);


    //this._usuarioService.login(forma.value.usuario, forma.value.password, forma.value.recuerdame)
    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe( correcto => {
        if( correcto ) {
          this.router.navigate(['/dashboard']);
        }else{
          console.log(correcto);
        }
        
      });
      //.subscribe( correcto => this.router.navigate(['/dashboard']));
    
  }

}
