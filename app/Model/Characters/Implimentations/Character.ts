import { XYObject } from "../../../Global/Types";
import ICell from "../../GameState/Interfaces/ICell";
import ICharacter from "../Interfaces/ICharacter";
import ICharacterGame from "../Interfaces/ICharacterGame";
import ICharacterJson from "../Interfaces/ICharacterJson";
import ICharacterSave from "../Interfaces/ICharacterSave";

export default class Character implements ICharacterGame {
    protected _skinName: string;
    protected _defaultSettings: ICharacterJson
    public x: number;
    public y: number;
    public hp: number;
    public movePoint: number;
    public name
    public constructor(props: ICharacterSave, defaultSettings: ICharacterJson) {
        this._skinName = props.skinName;
        this.x = props.x;
        this.y = props.y;
        this.hp = props.hp;
        this.movePoint = props.movePoint;
        this.name = props.name
        this._defaultSettings = defaultSettings
    }

    public get skinName(): string{
        return `${this.name}${this._skinName}`
    }

    public set skinName(skinName: string) {
        this._skinName = skinName
    }

    public setPosition(cell: XYObject): void {
        this.x = cell.x
        this.y = cell.y
    }
    public canMove(cell: ICell): boolean {
        throw new Error("Method not implemented.");
    }
}
