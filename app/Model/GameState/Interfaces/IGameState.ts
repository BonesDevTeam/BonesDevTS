import { Skin, XYObject } from "../../../Global/Types";
import ICharacterGame from "../../Characters/Interfaces/ICharacterGame";
import ICellContent from "./ICellContent";

export default interface IGameState {
    getCellSkins(x: number, y: number): Array<{ [id: string]: Skin }>;
    moveCharacter: (character: ICharacterGame, x: number, y: number) => void;
    background: string;
    updating: boolean;
    cellsCount: XYObject;
    addContent(s: ICellContent): void;
}
