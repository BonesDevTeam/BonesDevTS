import { SizedObject, XYObject } from "../../Global/Types";
import IAnimationSprite from "./IAnimationSprite";
import ICachedImages from "./ICachedImages";

export default interface IMapGrid {
    srartCell: XYObject;
    startPixel: XYObject;
    finishPixel: XYObject;
    cellSize: number;
    cellToShowCount: XYObject;
    getGrid(canvasSize: SizedObject): HTMLCanvasElement;
    getContenet(cachedImages: ICachedImages): HTMLCanvasElement;
    getCell(xCoord: number, yCoord: number): XYObject;
}
