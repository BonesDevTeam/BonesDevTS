import DamagedStatic from "../Implimentations/DamagedStatic.js";
import IDamagedStatic from "../Interfaces/IDamagedStatic.js";
import IStaticJson from "../Interfaces/IStaticJson.js";

export default class Wall extends DamagedStatic {
    public constructor(props: IDamagedStatic, defaultSettings: IStaticJson, id:string) {
        super(props, defaultSettings, id);
    }
    
    public damage(damage: number): string {
        throw new Error("Method not implemented.");
    }
}
