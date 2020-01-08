import { DocBody } from './doc-body';

export class PrintAnsw{
    constructor(       
        public doc_name: string,
        public doc_bodys: Array<DocBody>,
    ){}
}