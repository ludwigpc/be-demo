export class Transaccion {

    constructor(
        public fecha: string,
        public hora: string,
        public transaccion: string,
        public monto: number,
        public saldoContable: number,
        public saldoDisponible: number,
        public _id: string
    ) { }
}
