import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TransaccionService } from '../../services/transaccion/transaccion.service';
import { Transaccion } from '../../models/transaccion.model';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styles: []
})
export class TransaccionesComponent implements OnInit {

  transacciones: Transaccion [] = [];
  cargando: boolean = true;
  totalTransacciones: number = 0;
  @ViewChild ('infcuenta', {static: true}) infcuenta: ElementRef;


  constructor(
    public _transaccionService: TransaccionService,
    public activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe ( params => {

      let id = params['id'];//(id) porque en el pages.routes tiene ese nombre (transacciones/:id)

      if ( id !== 'nuevo' ) {
        this.cargarTransacciones( id );

      }
    });
  }

  ngOnInit() {
    // console.log(this.infcuenta);
  }

  cargarTransacciones( id: string ) {
    this.cargando = true;
    this._transaccionService.cargarTransacciones( id )
        .subscribe( (resp: any) => {
          // console.log( resp );
          if(resp){

            this.totalTransacciones = resp.length;
            this.transacciones = resp;
            // console.log(this.totalCuentas);
            this.cargando = false;
            this.formatearTabla();
            
            this.infcuenta.nativeElement.innerHTML = this._transaccionService.tipoCuenta + ': ' + this._transaccionService.nroCuenta;
          }else{
            this.cargando = false;
            this.infcuenta.nativeElement.innerHTML = 'Sin transacciones';
          }
        });

  }

  formatearTabla() {

    $('#tablaT').DataTable({
      dom: 'Bfrtip',
      buttons: [
          // 'copy', 'csv', 'excel', 'pdf', 'print'
          'excel', 'pdf', 'print'
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
      },
      data: this.transacciones,
      columns: [
        { data: 'fecha' },
        { data: 'hora' },
        { data: 'transaccion' },
        { data: 'monto' },
        { data: 'saldoContable' },
        { data: 'saldoDisponible' }
      ],
      ordering: false
      });
  }

}
