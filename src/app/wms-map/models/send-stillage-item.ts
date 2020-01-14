import { Celltem } from './cell-item';

export class SendStillageItem{
    constructor(
        // координаты
        public y: number,
        public x: number,
        // имя стеллажа
        public stillageName: string,
        // имя ряда
        public rowName: string,
        // имя ячейки
        public cellName: string,
        // тип стеллажа
        public element: string,
        // стиль ячейки
        public style: string,
        // начало ряда
        public imageUrl: string,
        // координаты имя ячейки
        public yxName: string,

        public isIt: boolean,

        public isVer: boolean,
        public isHor: boolean,
        
        public isBusy: boolean,

        public isBraceHor: boolean,
        public isBraceVer: boolean,

        // ячейки
        public cells: Celltem,
    ){}
}