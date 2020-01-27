export class AnswerDoc{
    constructor(       
        public docid: string,
        public docdate: string,
        public docloc: string,
        public doclabel: string,
        public highlighted?: boolean,
    ){}
}