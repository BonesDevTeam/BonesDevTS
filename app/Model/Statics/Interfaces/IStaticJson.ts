import { Skin } from "../../../Global/Types";

export default interface IStaticJson {
    name: string;
    className: string;
    defaultSkinName: string;
    initHp: number;
    additionalPoints: number;
    skin: {[name:string]: Skin}
}
