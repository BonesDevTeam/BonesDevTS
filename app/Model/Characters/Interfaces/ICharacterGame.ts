import { XYObject } from "../../../Global/Types";
import ICell from "../../GameState/Interfaces/ICell";
import ICharacter from "./ICharacter";

export default interface ICharacterGame extends ICharacter {
    setPosition(cell: XYObject): void;
    canMove(cell: ICell): boolean;
}
