import { Skin } from "../../../Global/Types.js";
import ICharacter from "../../Characters/Interfaces/ICharacter.js";
import IStatic from "../../Statics/Interfaces/IStatic.js";
import ICell from "../Interfaces/ICell.js";
import ICellConten from "../Interfaces/ICellContent.js";

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
    get layers(): Array<Array<Skin>> {
        const layers: Array<Array<Skin>> = [[], [], []];
        const skins: Skin[] = this.__content.map((s) => {
            return { name: s.skinName, scale: s.size, aligin: s.aligin };
        });
        layers[0] = skins;
        if (this.__character) {
            layers[1].push({
                name: this.__character.skinName,
                scale: this.__character.size,
                aligin: this.__character.aligin,
            });
        }
        return layers;
    }

    public addContent(s: ICellConten): void {
        this.__content.push(s);
    }
}
