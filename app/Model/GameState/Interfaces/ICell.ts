import ICharacter from "../../Characters/Interfaces/ICharacter";

export default interface ICell {
    readonly id: string;
    character: ICharacter | null;
    readonly skinsName: string[];
}
