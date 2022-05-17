import { XYObject } from "../../../Global/Types";
import ICharacterGame from "../../Characters/Interfaces/ICharacterGame";

export default interface IGameState {
    getCellSkins: (x: number, y: number) => string[];
    moveCharacter: (character: ICharacterGame, x: number, y: number) => void;
    background: string;
    updating: boolean;
    cellsCount: XYObject;
}
