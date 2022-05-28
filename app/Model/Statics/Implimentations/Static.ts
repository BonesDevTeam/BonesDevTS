import IStatic from "../Interfaces/IStatic";
import IStaticJson from "../Interfaces/IStaticJson";

export default abstract class Static implements IStatic {
    protected _name: string
    protected _x: number;
    protected _y: number;
    protected _skinName: string;
    protected _size: number
    public aligin: string;

    protected constructor(props: IStatic, defaultSettings: IStaticJson) {
        this._x = props.x;
        this._y = props.y;
        this._skinName = props.skinName || defaultSettings.defaultSkin
        this._name = props.name
        this._size = defaultSettings.size
        this.aligin = defaultSettings.aligin
    }

    public abstract get skinName(): string;

    public get name():string {
        return this._name
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

    public get size(): number {
        return this._size
    }
}
