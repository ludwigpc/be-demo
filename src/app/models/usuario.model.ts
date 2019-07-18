export class Usuario{

    constructor(
        public dni: string,
        public nombre: string,
        public email: string,
        public img?: string,
        public celular?: string,
        public telefono?: string,
        public clave?: string,
        public direccion?: string,
        public referencia?: string,
        public genero?: boolean,
        public tippIdentificacion?: string,
        public fechaNacimiento?: string,
        public latitud?: number,
        public longitud?: number,
        public id?: string
    ) { }
}
