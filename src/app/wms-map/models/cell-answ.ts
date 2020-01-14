import { CellBody } from './cell-body';

export class CellAnsw{
    constructor(
        public cell: string,
        public body: Array<CellBody>,
    ){}
}