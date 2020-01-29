export class Motivation{
    constructor(       
        public id: string,
        public doc: string,
        public docAll: string,
        public position: string,
        public positionAll: string,
        public ktu: string,
        public motivationItems: Array<MotivationItem>,
    ){}
}

export class MotivationItem{
    constructor(       
        public id: string,
        public person: string,
        public count: string,
        public positionPersent: string,
        public otbor: MotivationDocItem,
        public priem: MotivationDocItem,
        public rotac: MotivationDocItem,
    ){}
}

export class MotivationDocItem{
    constructor(       
        public id: string,
        public doc: string,
        public position: string,
        public count: string,
    ){}
}