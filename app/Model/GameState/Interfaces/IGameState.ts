import { Skin, XYObject } from "../../../Global/Types";
import ICharacterGame from "../../Characters/Interfaces/ICharacterGame";
import ICellConten from "./ICellContent";



export default interface IGameState {
    getCellSkins: (x: number, y: number) => Array<Array<Skin>>;
    moveCharacter: (character: ICharacterGame, x: number, y: number) => void;
    background: string;
    updating: boolean;
    cellsCount: XYObject;
    addContent(s: ICellConten): void
}
