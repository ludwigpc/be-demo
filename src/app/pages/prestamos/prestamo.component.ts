import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../services/prestamo/prestamo.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styles: []
})
export class PrestamoComponent implements OnInit {

  estado: boolean = false;

  constructor(
    public _prestamoService: PrestamoService,
    public router: Router
  ) { }

  ngOnInit() {
    if (!this._prestamoService.prestamo) {
      this.router.navigate(['/prestamos']);
      return;
    }
    this.estado = true;
    this.formatearTabla();
  }


  formatearTabla() {

    $('#tablaT').DataTable({
      dom: 'Bfrtip',
      buttons: [
          'excel', 'pdf', 'print'
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
      },
      data: this._prestamoService.prestamo.tblAmortizacion,
      columns: [
        { data: 'nroCuota'},
        { data: 'saldoDeuda', render: $.fn.dataTable.render.number( ',', '.', 2, '$' )},
        { data: 'pago',render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
        { data: 'abonoCapital',render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
        { data: 'interes',render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
        { data: 'saldo',render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
        { data: 'pagoReal',render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) }
      ],
      ordering: false
      });
  }

}
