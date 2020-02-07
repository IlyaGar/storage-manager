import { ProblemList } from './problem-list';
import { NPCBody } from './npc-body';
import { ZPCBody } from './zpc-body';

export class RazgAnswer{
    constructor(       
        public Completely: Array<string>,
        public CompletelyCount: number,
        public Partially: Array<string>,
        public PartiallyCount: number,
        public NotSent: Array<string>,
        public NotSentCount: number,
        public BadSent: Array<ProblemList>,
        public NPCList: Array<NPCBody>,
        public ZPCList: Array<ZPCBody>,
    ){}
}