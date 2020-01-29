import { MotiveType } from './motivation-type';

export class MotiveAnsw{
    constructor(       
        public user: string,
        public mt: Array<MotiveType>,
    ){}
}