import IStatic from "../../Model/Statics/Interfaces/IStatic";
import IStaticJson from "../../Model/Statics/Interfaces/IStaticJson";
import IDamagedStatic from "../../Model/Statics/Interfaces/IDamagedStatic";
import Wall from "../../Model/Statics/Wall/Wall.js";
import Fire from "../../Model/Statics/Fire.js";


export default abstract class StaticFactory {
    private static currentId = 0;
    static createStatic(
        props: IStatic,
        staticBase: IStaticJson
    ): IStatic | null {
        StaticFactory.currentId++;
        let s: IStatic | null = null;
        switch (staticBase.className) {
            case "Wall":
                s = new Wall(
                    <IDamagedStatic>props,
                    staticBase,
                    String(StaticFactory.currentId)
                );
                break;
            case "Fire":
                s = new Fire(
                    <IDamagedStatic>props,
                    staticBase,
                    String(StaticFactory.currentId)
                );
                break;
        }
        if (!s) throw new Error('Не получилось создать статик')
        return s;
    }
}
