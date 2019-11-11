export class AnswerDoc{
    constructor(       
        public docid: string,
        public docdate : string,
        public docloc : string,
        public highlighted?: boolean,
    ){}
}