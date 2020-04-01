export class ErrorLogRequest{
    constructor(
        public token: string,
        public from_date: string,
        public to_date: string,
    ){}
}