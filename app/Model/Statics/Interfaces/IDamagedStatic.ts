import IStatic from "./IStatic";

export default interface IDamagedStatic extends IStatic {
    readonly hp: number;
    readonly initHp: number;
    demage(demage: number): string
}
