import ICharacter from "../../Characters/Interfaces/ICharacter.js";
import ICell from "../Interfaces/ICell.js";

export default class Cell implements ICell {
    private __x: number;
    private __y: number;
    private __character: ICharacter | null;
    private __content: ICellConten[];
    constructor(x: number, y: number) {
        this.__x = x;
        this.__y = y;
        this.__character = null;
        this.__content = [];
    }

    static tranformCoordinatesToId(x: number, y: number): string {
        return `${x},${y}`;
    }

    get id(): string {
        return Cell.tranformCoordinatesToId(this.__x, this.__y);
    }

    get character(): ICharacter | null {
        return this.__character;
    }

    set character(character: ICharacter | null) {
        this.__character = character;
    }
    get skinsName(): string[] {
        const skins: string[] = this.__content.map((s) => s.skinName);
        if (this.__character) {
            skins.push(this.__character.skinName);
        }
        return skins;
    }
}
