export class Task{
    constructor(       
        public status: string,
        public name: string,
        public percent: number,
        public process: string,
        public description: string,
    ){}
}