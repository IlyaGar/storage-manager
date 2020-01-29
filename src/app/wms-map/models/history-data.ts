export class HistData{
    constructor(
        public article: number,
        public barcode: string,
        public name: string,
        public count: string,
        public place: string,

        public doc_name: number,
        public doc_type: string,
        public doc_who: string,
        public doc_date: string,
      ){}
}