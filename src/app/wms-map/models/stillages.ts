import { StillageItem } from './stillage-item';

export class Stillages{
    constructor(
        public stillageItem: Array<Array<StillageItem>>,
        public y: number,
        public x: number,
    ){}
}