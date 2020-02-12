import { AnyBody } from './any-body';

export class ZPCBody{
    constructor(       
        public zPC_NAME: string,
        public aNY_DATA1: string,
        public aNY_DATA2: string,
        public aNY_DATA3: string,
        public body: Array<AnyBody>,

        public style?: string,
    ){}
}