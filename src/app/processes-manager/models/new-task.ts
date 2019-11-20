import { Process } from './process';
import { ExecutorTask } from './executor';

export class NewTask{
    constructor(       
        public token: string,
        public process : Array<Process>,
        public base : Array<string>,
        public executor: ExecutorTask,
        public method: string, 
    ){}
}