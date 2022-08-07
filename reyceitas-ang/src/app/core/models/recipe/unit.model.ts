export interface Unit {
    _id: string;
    name: string;
    abbreviation: string;
    type: UnitType;
}

export enum UnitType {
    UNIT,
    VOLUME,
    WEIGHT
}