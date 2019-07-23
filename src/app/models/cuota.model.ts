export class Cuota {

    constructor(
        public nroCuota: number,
        public saldoDeuda: string,
        public interes: string,
        public pago: string,
        public abonoCapital?: string,
        public fecha?: string,
        public interesMora?: string,
        public multaMora?: string,
        public pagoAdicional?: string,
        public pagoReal?: string,
        public saldo?: string,
        //    public _id: string
    ) { }
}
