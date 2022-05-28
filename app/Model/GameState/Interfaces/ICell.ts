import { Skin } from "../../../Global/Types";
import ICharacter from "../../Characters/Interfaces/ICharacter";
import ICellConten from "./ICellContent";

export default interface ICell {
    readonly id: string;
    character: ICharacter | null;
    readonly layers: Array<Array<Skin>>;
    addContent(s: ICellConten): void
}
