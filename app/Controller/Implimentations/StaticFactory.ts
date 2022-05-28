import IDamagedStatic from "../../Model/Statics/Interfaces/IDamagedStatic.js";
import IStatic from "../../Model/Statics/Interfaces/IStatic.js";
import IStaticJson from "../../Model/Statics/Interfaces/IStaticJson.js";
import Wall from "../../Model/Statics/Wall/Wall.js";

export default abstract class StaticFactory {
    static createStatic(
        props: IStatic,
        staticBase: IStaticJson
    ): IStatic | null {
        let s: IStatic | null = null;
        switch (staticBase.className) {
            case "Wall":
                s = new Wall(<IDamagedStatic>props, staticBase);
                break;
        }
        return s;
    }
}
