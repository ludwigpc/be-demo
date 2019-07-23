import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Cuota } from '../../models/cuota.model';
import { NgForm } from '@angular/forms';
import { MathService } from '../../services/services.index';
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
  @ViewChild ('monto', {static: true}) monto: ElementRef;
  @ViewChild ('numPagos', {static: true}) numPagos: ElementRef;

  constructor(
    //public _mathServices: MathService
  ) { }

  ngOnInit() {
  }

  generarAmortizacion(f: NgForm) {
    if ( f.invalid || this.monto.nativeElement.value < 50) {
      return;
    }
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
      let saldoDeuda = monto;
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
        { data: 'saldoDeuda' },
        { data: 'interes' },
        { data: 'pago' }
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
    this.numPagos.nativeElement.value = numPagos;
  }
  onChangesPrestamo( newValue: any ) {
    this.tipoPrestamo = newValue;
    let monto = 0;
    switch (newValue) {
      case '1':
        monto = 500;
        break;
      case '2':
        monto = 5000;
        break;
      case '3':
        monto = 50;
        break;
      case '4':
        monto = 500;
        break;
      default:
        monto = 0;
        break;
    }
    this.monto.nativeElement.value = monto;
    this.onChangesPeriodicidad(this.periodicidad);
  }

 
}
