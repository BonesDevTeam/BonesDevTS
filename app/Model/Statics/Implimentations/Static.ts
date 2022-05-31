import { Skin } from "../../../Global/Types";
import ISkinJson from "../../../Viewer/Interfaces/ISkinJson";
import IStatic from "../Interfaces/IStatic";
import IStaticJson from "../Interfaces/IStaticJson";

export default abstract class Static implements IStatic {
    protected _name: string;
    protected _x: number;
    protected _y: number;
    // protected _skinName: string;
    // protected _size: number
    // public align: string;
    public readonly id: string;
    // public skin: Skin;
    public skinName: string;
    protected _defaultSettings: IStaticJson;

    protected constructor(
        props: IStatic,
        defaultSettings: IStaticJson,
        id: string
    ) {
        this._x = props.x;
        this._y = props.y;
        // this._skinName = props.skinName || defaultSettings.defaultSkin
        this._name = props.name;

        this.id = id;
        this.skinName = props.skinName || defaultSettings.defaultSkinName;
        this._defaultSettings = defaultSettings;
    }

    public get skin(): Skin {
        return this._defaultSettings.skin[this.skinName];
    }

    public get name(): string {
        return this._name;
    }

    public get x(): number {
        return this._x;
    }

    public set x(x: number) {
        this._x = x;
    }

    public get y(): number {
        return this._y;
    }

    public set y(y: number) {
        this._y = y;
    }
}
