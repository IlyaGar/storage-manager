export class ESkladGroup{
    constructor(       
        public token: string,
        public id: number,
        public name: string,
        public root_order: boolean,
        public root_sklad: boolean,
        public root_user: boolean,
    ){}
}