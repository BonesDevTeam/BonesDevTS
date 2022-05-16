import { SizedObject, XYObject } from "../../Global/Types.js";
import IGameState from "../../Model/GameState/Interfaces/IGameState.js";
import ICachedImages from "../Interfaces/ICachedImages.js";
import IMapGrid from "../Interfaces/IMapGrid.js";

export default class MapGrid implements IMapGrid {
    public srartCell: XYObject;
    public startPixel: XYObject;
    public finishPixel: XYObject;
    public cellSize: number;
    public cellToShowCount: XYObject;
    private __gameState: IGameState;
    public constructor(
        gameState: IGameState,
        srartCell: XYObject,
        startPixel: XYObject,
        finishPixel: XYObject,
        canvasSize: SizedObject,
        cellToShowCount: XYObject
    ) {
        this.__gameState = gameState;
        this.srartCell = srartCell;
        this.startPixel = startPixel;
        this.finishPixel = finishPixel;
        this.cellSize = Math.min(
            Math.floor(
                (this.finishPixel.x - this.startPixel.x) / cellToShowCount.x
            ),
            Math.floor(
                (this.finishPixel.y - this.startPixel.y) / cellToShowCount.y
            )
        );
        console.log(this.cellSize);

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
        // this.cellSize = Math.floor()

        for (let i = 0; i < nx; i++) {
            for (let k = 0; k < ny; k++) {
                ctx.strokeRect(
                    i * this.cellSize + this.startPixel.x,
                    k * this.cellSize + this.startPixel.y,
                    this.cellSize,
                    this.cellSize
                );
            }
        }
        for (let i = 0; i < nx; i++) {
            for (let k = 0; k < ny; k++) {
                const skins: string[] = this.__gameState.getCellSkins(i, k);
                if (skins.length) {
                    skins.forEach((skinName) => {
                        const img: HTMLImageElement =
                            cachedImages.getImage(skinName);
                        console.dir(img);
                        ctx.drawImage(
                            img,
                            Math.floor(
                                i * this.cellSize -
                                    this.cellSize / 4 +
                                    this.startPixel.x
                            ),
                            Math.floor(
                                k * this.cellSize -
                                    this.cellSize / 1.5 +
                                    this.startPixel.y
                            ),
                            Math.floor(this.cellSize * 1.5),
                            Math.floor(this.cellSize * 1.5)
                        );
                    });
                }
            }
        }
        this.__gameState.updating = false;
        return canvas;
    }
}
