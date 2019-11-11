export class WDocAnswer{
    constructor(       
        public docname: string,
        public docdate: string,
        public docfrom: string,
        public docto: string,
        public docbarcode: string,
        public docbody: Array<doctable>,
    ){}
}

export class doctable{
    constructor(  
        public num: string,
        public article: string,
        public name: string,
        public count: string,
        public mes: string,
        public goods_main: string,
        public goods_brak: string,
        public place: string,
    ){}
}