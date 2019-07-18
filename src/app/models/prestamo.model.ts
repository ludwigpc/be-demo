export class Prestamo {

    constructor(
        public estado: string,
        public cuenta: string,
        public tipo: string,
        public monto: string,
        public saldo: string,
        public cuota: string,
        public fechaProximoPago: string,
        public _id: string
    ) { }
}
