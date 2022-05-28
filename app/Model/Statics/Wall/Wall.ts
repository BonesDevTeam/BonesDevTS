import DamagedStatic from "../Implimentations/DamagedStattic.js";
import IDamagedStatic from "../Interfaces/IDamagedStatic.js";
import IStaticJson from "../Interfaces/IStaticJson.js";

export default class Wall extends DamagedStatic {
    public constructor(props: IDamagedStatic, defaultSettings: IStaticJson) {
        super(props, defaultSettings);
    }

    public demage(demage: number): string {
        throw new Error("Method not implemented.");
    }

    public get skinName(): string {
        return this._skinName;
    }
}
