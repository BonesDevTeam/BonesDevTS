import ICharacterSave from "../../Model/Characters/Interfaces/ICharacterSave";

export default interface ISave {
    environment: string;
    height: number;
    width: number;
    players: Array<ICharacterSave>;
}
