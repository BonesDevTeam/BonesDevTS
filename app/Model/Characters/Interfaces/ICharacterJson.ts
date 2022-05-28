type BodyParts = { head: number; body: number; arms: number; legs: number };

export default interface ICharacterJson {
    className: string;
    name: string;
    movementPointsValues: { min: number; max: number };
    MaxHpBodyPart: BodyParts;
    defListInit: BodyParts;
    initInventory: Array<string>;
    pointsToDoActionInit: number;
    pointsToMoveInit: number;
    maxInventorySize: number;
    lives: number;
    cooldownKey: number;
    maxCooldownKey: number;
    size: number;
    aligin: string;
}
