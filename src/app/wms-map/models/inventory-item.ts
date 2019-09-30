import { StillageItem } from './stillage-item';

export class InventoryItem{
    constructor(
        public stillageItem: StillageItem,
        public name: string,
    ){}
}