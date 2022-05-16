import { XYObject } from "../../../Global/Types";
import ICharacter from "../../Characters/Interfaces/ICharacter";

export default interface IGameState {
    getCellSkins: (x: number, y: number) => string[];
    moveCharacter: (character: ICharacter, x: number, y: number) => void;
    background: string;
    updating: boolean;
    cellsCount: XYObject;
}
