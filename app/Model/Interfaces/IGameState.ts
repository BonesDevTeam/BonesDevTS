import { xyObject } from "../../Global/Types"

export default interface IGameState{
    getCellSkins: (x:number, y:number) => string[]
    moveCharacter: (character: ICharacter, x: number, y: number) => void,
    background: string,
    updating: boolean,
    cellsCount: xyObject
}