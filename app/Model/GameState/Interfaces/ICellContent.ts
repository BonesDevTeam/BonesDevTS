import { Skin } from "../../../Global/Types";

export default interface ICellContent {
    readonly id: string;
    name: string;
    skin: Skin;
    x: number;
    y: number;
}
