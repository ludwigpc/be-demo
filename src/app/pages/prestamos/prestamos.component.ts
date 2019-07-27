import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../services/prestamo/prestamo.service';
import { Prestamo } from '../../models/prestamo.model';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styles: []
})
export class PrestamosComponent implements OnInit {

  prestamos: Prestamo [] = [];
  cargando: boolean = true;
  totalPrestamos: number;

  constructor(
    public _prestamoService: PrestamoService,
    public router: Router
  ) { }

  ngOnInit() {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.cargando = true;
    this._prestamoService.cargarPrestamos()
        .subscribe( (resp: any) => {
          this.totalPrestamos = resp.length;
          this.prestamos = resp;
          this.cargando = false;
          this.formatearTabla();
        });
  }

  formatearTabla() {

    $('#tablaP').DataTable({
      dom: 'Bfrtip',
      buttons: [
          'excel', 'pdf', 'print'
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
      },
      data: this.prestamos,
      columns: [
        { data: 'estado' },
        { data: 'cuenta' },
        { data: 'tipo' },
        {
          data: 'monto',
          render: $.fn.dataTable.render.number( ',', '.', 2, '$' )
        },
        {
          data: 'saldo',
          render: $.fn.dataTable.render.number( ',', '.', 2, '$' )
        },
        {
          data: 'cuota',
          render: $.fn.dataTable.render.number( ',', '.', 2, '$' )
        },
        { data: 'fechaProximoPago' }
      ],
      ordering: false,
      rowCallback: (row: Node, data: any[] | Prestamo, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.someClickHandler(data);
        });
        return row;
      }
      });
  }

  someClickHandler(info: any): void {
    this._prestamoService.prestamo = info;
    this.router.navigate(['/prestamo']);
  }

  
}
