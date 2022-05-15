import { SizedObject, XYObject } from "../../Global/Types.js";
import IGameState from "../../Model/Interfaces/IGameState.js";
import ICachedImages from "../Interfaces/ICachedImages.js";
import IMapGrid from "../Interfaces/IMapGrid.js";
import CachedImages from "./CachedImages.js";

export default class MapGrid implements IMapGrid {
    public srartCell: XYObject;
    public startPixel: XYObject;
    public cellSize: number;
    public cellToShowCount: XYObject;
    private __gameState: IGameState;
    public constructor(
        gameState: IGameState,
        srartCell: XYObject,
        startPixel: XYObject,
        canvasSize: SizedObject,
        cellToShowCount: XYObject
    ) {
        this.__gameState = gameState;
        this.srartCell = srartCell;
        this.startPixel = startPixel;
        this.cellSize = Math.min(
            Math.floor(canvasSize.width / cellToShowCount.x),
            Math.floor(canvasSize.height / cellToShowCount.y)
        );
        this.cellToShowCount = cellToShowCount;
    }
    public getCell(xCoord: number, yCoord: number): XYObject {
        const deltax: number = xCoord - this.startPixel.x;
        const deltay: number = yCoord - this.startPixel.y;
        return {
            x: Math.floor(deltax / this.cellSize),
            y: Math.floor(deltay / this.cellSize),
        };
    }

    public getMapCanvas(
        canvasSize: SizedObject,
        cachedImages: ICachedImages
    ): HTMLCanvasElement {
        const { x: nx, y: ny } = this.cellToShowCount;
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
        const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;

        for (let i = 0; i < nx; i++) {
            for (let k = 0; k < ny; k++) {
                console.log(i, k, this.cellSize);
                ctx.strokeRect(
                    i * this.cellSize,
                    k * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
                const skins: string[] = this.__gameState.getCellSkins(i, k);
                if (skins.length) {
                    skins.forEach((skinName) => {
                        const img: HTMLImageElement =
                            cachedImages.getImage(skinName);
                        console.log("loaded");
                        ctx.drawImage(
                            img,
                            i * this.cellSize + this.cellSize / 4,
                            k * this.cellSize + this.cellSize / 4,
                            this.cellSize / 2,
                            this.cellSize / 2
                        );
                    });
                }
            }
        }
        this.__gameState.updating = false;
        canvas.onload = () => console.log("loaded");
        return canvas;
    }
}
