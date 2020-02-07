import { AnyBody } from './any-body';

export class NPCBody{
    constructor(       
        public NPC_NAME: string,
        public ANY_DATA1: string,
        public ANY_DATA2: string,
        public ANY_DATA3: string,
        public Body: Array<AnyBody>,
    ){}
}