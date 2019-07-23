import { Pipe, PipeTransform } from '@angular/core';
import { URL_SOCIO } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string): any  {

  let url = URL_SOCIO + 'cliente/';

  if ( !img ) {
      return 'assets/images/users/noimage.jpg';
    }

  if ( img) {
     return url + img;
   } else {
    return 'assets/images/users/noimage.jpg';
  }

}

}
