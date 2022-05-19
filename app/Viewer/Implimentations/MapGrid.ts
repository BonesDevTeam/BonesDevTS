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
        function drawStrockedRect(
            x: number,
            y: number,
            width: number,
            height: number,
            strocked: boolean
        ): void {
            ctx.fillRect(x, y, width, height);
            if (strocked) {
                ctx.strokeRect(x, y, width, height);
            }
        }
        const { x: nx, y: ny } = this.cellToShowCount;
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
        const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
        ctx.strokeStyle = "rgb(90,40,40)";
        ctx.lineWidth = 1;
        for (let i = 0; i < nx; i++) {
            for (let k = 0; k < ny; k++) {
                if (!((i + k) % 2)) continue;
                ctx.fillStyle = "rgb(100,60,40)";
                drawStrockedRect(
                    i * this.cellSize + this.startPixel.x,
                    k * this.cellSize + this.startPixel.y,
                    this.cellSize,
                    this.cellSize,
                    true
                );
            }
        }

        for (let i = 0; i < nx; i++) {
            for (let k = 0; k < ny; k++) {
                if ((i + k) % 2) continue;
                ctx.fillStyle = "rgb(90,55,35)";
                drawStrockedRect(
                    i * this.cellSize + this.startPixel.x,
                    k * this.cellSize + this.startPixel.y,
                    this.cellSize,
                    this.cellSize,
                    true
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
