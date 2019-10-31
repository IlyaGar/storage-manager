export class SkladGroup{
    constructor(       
        public token: string,
        public name: string,
        public root_order: boolean,
        public root_sklad: boolean,
        public root_user: boolean,
    ){}
}