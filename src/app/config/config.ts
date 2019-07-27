import { HttpHeaders } from '@angular/common/http';

export const URL_SERVICIOS = 'http://localhost:3000';
export const URL_WS = 'http://sam.bancoestudiantil.com:8080/kira/lego';
export const URL_SOCIO = 'http://socio.bancoestudiantil.com/sam/uploads/';
export const GOOGLE_API_KEY = 'AIzaSyDez51RP2BODsu8LUgDM_fB2ZwKI7FR5tY';
export const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })};