import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../../services/cuenta/cuenta.service';
import { Cuenta } from '../../models/cuenta.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  cuentas: Cuenta [] = [];
  totalCuentas: number = 0;
  totalSaldo: number = 0;
  cargando: boolean = true;
  bgBox: string [] = ['bg-info', 'bg-success', 'bg-primary'];
  cont: number =0;

  constructor(
    public _cuentaService: CuentaService,
  ) { }

  ngOnInit() {
    this.cargarCuentas();
  }

  cargarCuentas() {
    this.cargando = true;
    this._cuentaService.cargarCuentas()
        .subscribe( (resp: any) => {
          // console.log( resp );
          this.totalCuentas = resp.length;
          this.cuentas = resp;
          // console.log(this.cuentas);
          // console.log(this.totalCuentas);
          this.sumarSaldo();
          this.cargando = false;
        });
  }

  sumarSaldo() {
    this.cuentas.forEach(cuenta => {

      this.totalSaldo += cuenta.sdisp;

    });
  }

}
