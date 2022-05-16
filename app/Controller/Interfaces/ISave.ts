import { XYObject } from "../../Global/Types";
import ICharacter from "../../Model/Characters/Interfaces/ICharacter";

export default interface ISave {
    environment: string;
    height: number;
    width: number;
    players: Array<ICharacter>;
}
