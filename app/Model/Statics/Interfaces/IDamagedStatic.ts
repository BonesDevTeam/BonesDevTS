import IStatic from "./IStatic";

export default interface IDamagedStatic extends IStatic {
    readonly hp: number;
    readonly initHp: number;
    damage(damage: number): string
}
