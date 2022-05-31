import IDamagedStatic from "./Interfaces/IDamagedStatic";
import IStaticJson from "./Interfaces/IStaticJson";

import Static from "./Implimentations/Static.js";

export default class Fire extends Static {
    public constructor(
        props: IDamagedStatic,
        defaultSettings: IStaticJson,
        id: string
    ) {
        super(props, defaultSettings, id);
    }

    public damage(damage: number): string {
        throw new Error("Method not implemented.");
    }
}
