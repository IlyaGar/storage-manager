import { Process } from './process';
import { ExecutorTask } from './executor';

export class NewTask{
    constructor(       
        public token: string,
        public process : Array<Process>,
        public baselist: Array<string>,
        public executor: ExecutorTask,
        public method: string, 
    ){}
}