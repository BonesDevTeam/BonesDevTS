import { SizedObject, Skin, XYObject } from "../../Global/Types.js";
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

        for (let k = 0; k < ny; k++) {
            for (let layerNumber = 0; layerNumber < 3; layerNumber++) {
                for (let i = 0; i < nx; i++) {
                    const skins: Skin[] = this.__gameState.getCellSkins(i, k)[
                        layerNumber
                    ];
                    if (skins.length) {
                        skins.forEach((skin) => {
                            const img: HTMLImageElement = cachedImages.getImage(
                                skin.name
                            );
                            let deltaX: number =
                                0.5 * (skin.scale - 1) * this.cellSize;
                            let deltaY: number =
                                (skin.scale - 1) * this.cellSize;
                            if (skin.aligin === "center") {
                                deltaY += 0.5 * this.cellSize;
                            }
                            if (skin.aligin === "bottom25") {
                                deltaY += 0.25 * this.cellSize;
                            }

                            ctx.drawImage(
                                img,
                                Math.floor(
                                    i * this.cellSize +
                                        this.startPixel.x -
                                        deltaX
                                ),
                                Math.floor(
                                    k * this.cellSize +
                                        this.startPixel.y -
                                        deltaY
                                ),
                                Math.floor(this.cellSize * skin.scale),
                                Math.floor(this.cellSize * skin.scale)
                            );
                        });
                    }
                }
            }
        }
        this.__gameState.updating = false;
        return canvas;
    }
}
