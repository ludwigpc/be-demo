import { Component, OnInit } from '@angular/core';
import { Poliza } from '../../models/poliza.model';
import { InversionesService } from '../../services/inversiones/inversiones.service';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.component.html',
  styles: []
})
export class InversionesComponent implements OnInit {

  polizas: Poliza [] = [];
  cargando: boolean = true;
  totalPolizas: number;
  totalSaldoGenerado: number = 0;

  constructor(
    public _inversionService: InversionesService
  ) { }

  ngOnInit() {
    this.cargarPolizas();
  }

  cargarPolizas() {
    this.cargando = true;
    this._inversionService.cargarPolizas()
        .subscribe( (resp: any) => {
          this.totalPolizas = resp.length;
          this.polizas = resp;
          this.sumarSaldoGenerado();
          this.cargando = false;
        });
  }

  sumarSaldoGenerado() {
    this.polizas.forEach(poliza => {
      this.totalSaldoGenerado += parseFloat(poliza.interesGenerado);

    });
  }

}
