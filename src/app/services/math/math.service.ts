import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() { }

  redondear(valor: number) {
    return Math.round(valor * Math.pow(10, 2)) / Math.pow(10, 2);
  }
}
