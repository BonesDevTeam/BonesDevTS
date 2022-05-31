import { Skin, XYObject } from "../../../Global/Types";
import ICell from "../../GameState/Interfaces/ICell";
import ICharacter from "../Interfaces/ICharacter";
import ICharacterGame from "../Interfaces/ICharacterGame";
import ICharacterJson from "../Interfaces/ICharacterJson";

export default class Character implements ICharacterGame {
    protected _defaultSettings: ICharacterJson;
    public x: number;
    public y: number;
    public hp: number;
    public movePoint: number;
    public name;
    // public size: number;
    // protected _align: string;
    protected _id: string;
    protected _skin: Skin
    public constructor(props: ICharacter, defaultSettings: ICharacterJson) {
        this.x = props.x;
        this.y = props.y;
        this.hp = props.hp;
        this.movePoint = props.movePoint;
        this.name = props.name;
        this._defaultSettings = defaultSettings;
        // this.size = props.size || defaultSettings.size;
        // this._align = defaultSettings.align
        this._id = props.id || Date.now().toString()
        this._skin = defaultSettings.skin      
        // this._skin.id = this._id
    }
    public get id(): string{
        return `player${this._id}`
    }

    public get skin(): Skin {
        return this._skin
    }

    public setPosition(cell: XYObject): void {
        this.x = cell.x;
        this.y = cell.y;
    }
    public canMove(cell: ICell): boolean {
        throw new Error("Method not implemented.");
    }

}
