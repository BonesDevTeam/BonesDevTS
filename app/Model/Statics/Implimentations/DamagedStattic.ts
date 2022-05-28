import IDamagedStatic from "../Interfaces/IDamagedStatic";
import IStaticJson from "../Interfaces/IStaticJson";
import Static from "./Static.js";

export default abstract class DamagedStatic
    extends Static
    implements IDamagedStatic
{
    protected _initHp: number;
    protected _hp: number;

    protected constructor(props: IDamagedStatic, defaultSettings: IStaticJson) {
        super(props, defaultSettings);
        this._initHp = defaultSettings.initHp;
        this._hp = props.hp || defaultSettings.initHp;
    }

    public abstract demage(demage: number): string;
    public abstract get skinName(): string;

    public get initHp(): number {
        return this._hp;
    }

    public get hp(): number {
        return this._hp;
    }
}
