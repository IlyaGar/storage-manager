import { ProblemList } from './problem-list';
import { NPCBody } from './npc-body';
import { ZPCBody } from './zpc-body';

export class RazgAnswer{
    constructor(       
        public completely: Array<string>,
        public completelyCount: number,
        public partially: Array<string>,
        public partiallyCount: number,
        public notSent: Array<string>,
        public notSentCount: number,
        public badSent: Array<ProblemList>,
        public nPCList: Array<NPCBody>,
        public zPCList: Array<ZPCBody>,
    ){}
}