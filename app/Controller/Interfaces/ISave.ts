import ICharacter from "../../Model/Characters/Interfaces/ICharacter";
import IStatic from "../../Model/Statics/Interfaces/IStatic";

export default interface ISave {
    environment: string;
    height: number;
    width: number;
    content: Array<IStatic>;
    players: Array<ICharacter>;
}
