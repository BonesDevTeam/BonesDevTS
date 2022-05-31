import { Skin } from "../../../Global/Types";
import ICharacter from "../../Characters/Interfaces/ICharacter";
import ICellContent from "./ICellContent";

export default interface ICell {
    readonly id: string;
    character: ICharacter | null;
    readonly layers: Array<{ [id: string]: Skin }>;
    addContent(s: ICellContent): void;
}
