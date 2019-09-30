export class StillageItem{
    constructor(
        public y: number,
        public x: number,
        public stillageName: string,
        public rowName: string,
        public cellName: string,
        public element: string,
        public style: string,
        public imageUrl: string,
        public yxName: string,
        public isIt: boolean,
        public isVer: boolean,
        public isHor: boolean,
        public isBusy: boolean,
        public isBraceHor: boolean,
        public isBraceVer: boolean,
        public isStillageRowWithOutNameVer: boolean,
        public isStillageRowWithOutNameHor: boolean,
        public isStillageOneWithName: boolean,
        public isStillageOneWithOutName: boolean,
        public isSelectCellStillage: boolean,
    ){}
}