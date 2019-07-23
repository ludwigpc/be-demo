import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Posición Consolidada', url: '/dashboard'},
        {titulo: 'Prestamos', url: '/prestamos'},
        {titulo: 'Inversiones', url: '/inversiones'},
        {titulo: 'Cotizador de prestamos', url: '/cotizador-prestamos'}
      ]
    }
  ];

  constructor() { }
}
