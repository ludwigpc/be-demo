import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Cuota } from '../../models/cuota.model';
import { NgForm } from '@angular/forms';
import { delay } from 'q';
declare var $: any;

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styles: []
})
export class CotizadorComponent implements OnInit {

  cuotas: Cuota[] = [];
  cuota: Cuota;
  cargando: boolean = false;
  tipoPrestamo: any;
  periodicidad: any = 1;
  totalInteres: any;
  montoMaximo: number = 0;
  errorMonto: boolean = false;
  infprestamo: boolean = true;
  errortipoPrestamo: boolean = false;
  @ViewChild ('monto', {static: true}) monto: ElementRef;
  @ViewChild ('numPagos', {static: true}) numPagos: ElementRef;
  @ViewChild ('periodicidad_cbx', {static: true}) periodicidad_cbx: ElementRef;
  @ViewChild ('tipoPrestamo_cbx', {static: true}) tipoPrestamo_cbx: ElementRef;

  constructor(
    
  ) { }

  ngOnInit() {
    this.tipoPrestamo_cbx.nativeElement.selectedIndex = 0;
    this.tipoPrestamo_cbx.nativeElement[0].selected = true;
    this.periodicidad_cbx.nativeElement.disabled = true;
    this.monto.nativeElement.disabled = true;
  }


  generarAmortizacion(f: NgForm) {
    if (this.tipoPrestamo==0 || !this.tipoPrestamo) {
      this.errortipoPrestamo = true;
      this.infprestamo = false;
      return;
    }
    this.errortipoPrestamo = false;
    this.cuotas = [];
    $("#tablaT").dataTable().fnDestroy();
    this.cargando = true;
    this.calcularCuotas(this.monto.nativeElement.value, this.numPagos.nativeElement.value);
    this.formatearTabla();
    this.cargando = false;
  }

  calcularCuotas(monto: any, numPagos: any) {
    let tasInt = 0.0254;
    let cuota =   monto * ( (Math.pow((1 + tasInt ), numPagos) * tasInt) / (Math.pow((1 + tasInt ), numPagos) - 1) );

    for (let index = 0; index < numPagos; index++) {
      let interes = monto * 0.0254;
      this.cuota = new Cuota((index + 1), (Math.round(monto * Math.pow(10, 2)) / Math.pow(10, 2))+'', interes.toFixed(2), cuota.toFixed(2));
      this.totalInteres += interes;
      monto = monto - (cuota - interes);
      this.cuotas.push(this.cuota);
    }
  }

  formatearTabla() {
    $('#tablaT').DataTable({
      dom: 'Bfrtip',
      buttons: [
          'excel', 'pdf', 'print'
      ],
      "searching": false,
      paging: false,
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
      },
      data: this.cuotas,
      columns: [
        { data: 'nroCuota' },
        {
          data: 'saldoDeuda',
          render: $.fn.dataTable.render.number( ',', '.', 2, '$' )
        },
        {
          data: 'interes',
          render: $.fn.dataTable.render.number( ',', '.', 2, '$' )
        },
        {
          data: 'pago',
          render: $.fn.dataTable.render.number( ',', '.', 2, '$' )
        }
      ],
      ordering: false
      });
  }

  onChangesPeriodicidad( newValue: number ) {
    this.periodicidad = newValue;
    let numPagos;
    switch (this.tipoPrestamo) {
      case '1':
          numPagos = (60 / newValue);
        break;
      case '2':
          numPagos = (1080 / newValue);
        break;
      case '3':
          numPagos = (30 / newValue);
        break;
      case '4':
          numPagos = (360 / newValue);
        break;
      default:
        numPagos  = 0;
        break;
    }
    this.numPagos.nativeElement.value = numPagos.toFixed(0);
  }
  onChangesPrestamo( newValue: any ) {
    this.tipoPrestamo = newValue;
    if (!this.tipoPrestamo) {
      this.infprestamo = false;
      this.errortipoPrestamo = true;
      return;
    }
    this.infprestamo = false;
    this.periodicidad_cbx.nativeElement.disabled = false;
    this.monto.nativeElement.disabled = false;
    // let monto = 0;
    switch (newValue) {
      case '1':
        // monto = 500;
        this.montoMaximo = 500;
        break;
      case '2':
        // monto = 5000;
        this.montoMaximo = 5000;
        break;
      case '3':
        // monto = 50;
        this.montoMaximo = 50;
        break;
      case '4':
        // monto = 500;
        this.montoMaximo = 500;
        break;
      default:
        // monto = 0;
        this.montoMaximo = 0;
        break;
    }
    // this.montoMaximo = monto;
    this.monto.nativeElement.value = this.montoMaximo;
    this.periodicidad_cbx.nativeElement.selectedIndex = 0;
    this.onChangesPeriodicidad(30);
  }

  onChangesMonto( newValue: any) {
    if (this.monto.nativeElement.value > this.montoMaximo) {
      this.errorMonto = true;
      this.monto.nativeElement.value = this.montoMaximo;
    } else {
      this.errorMonto = false;
    }
  }

 
}
