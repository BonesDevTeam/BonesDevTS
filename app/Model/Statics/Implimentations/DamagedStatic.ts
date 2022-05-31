import { Skin } from "../../../Global/Types";
import IDamagedStatic from "../Interfaces/IDamagedStatic";
import IStaticJson from "../Interfaces/IStaticJson";
import Static from "./Static.js";

export default abstract class DamagedStatic
    extends Static
    implements IDamagedStatic
{
    protected _initHp: number;
    protected _hp: number;

    protected constructor(props: IDamagedStatic, defaultSettings: IStaticJson, id:string) {
        super(props, defaultSettings, id);
        this._initHp = defaultSettings.initHp;
        this._hp = props.hp || defaultSettings.initHp;
    }

    public abstract damage(damage: number): string;
    // public abstract get skin(): Skin;

    public get initHp(): number {
        return this._hp;
    }

    public get hp(): number {
        return this._hp;
    }
}
