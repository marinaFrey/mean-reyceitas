export interface Unit {
    name: string;
    type: UnitType;
}

export enum UnitType {
    UNIT,
    VOLUME,
    WEIGHT
}