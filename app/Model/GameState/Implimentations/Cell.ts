import { Skin } from "../../../Global/Types";
import ICharacter from "../../Characters/Interfaces/ICharacter";
import ICell from "../Interfaces/ICell";
import ICellContent from "../Interfaces/ICellContent";

export default class Cell implements ICell {
    private __x: number;
    private __y: number;
    private __character: ICharacter | null;
    private __content: ICellContent[];
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
    get layers(): Array<{[id:string]:Skin}> {
        const layers: Array<{[id:string]:Skin}> = [{}, {}, {}]
        this.__content.forEach((s) => {
            layers[0][s.id] = s.skin
        });
        if (this.__character) {
            layers[1][this.__character.id]= this.__character.skin
        }
        return layers;
    }

    public addContent(s: ICellContent): void {
        this.__content.push(s);
    }
}
