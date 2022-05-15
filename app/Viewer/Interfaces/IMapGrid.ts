import { SizedObject, XYObject } from "../../Global/Types";
import CachedImages from "../Implimentations/CachedImages";
import ICachedImages from "./ICachedImages";

export default interface IMapGrid {
    srartCell: XYObject;
    startPixel: XYObject;
    cellSize: number;
    cellToShowCount: XYObject;
    getMapCanvas: (canvasSize: SizedObject, cachedImages: ICachedImages) => HTMLCanvasElement;
    getCell: (xCoord: number, yCoord: number) => XYObject;
}
