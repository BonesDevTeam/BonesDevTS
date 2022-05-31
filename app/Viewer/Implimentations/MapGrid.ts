import { SizedObject, Skin, XYObject } from "../../Global/Types.js";
import IGameState from "../../Model/GameState/Interfaces/IGameState.js";
import IAnimationContent from "../Interfaces/IAnimationContent.js";
import IAnimationSprite from "../Interfaces/IAnimationSprite.js";
import ICachedImages from "../Interfaces/ICachedImages.js";
import IMapGrid from "../Interfaces/IMapGrid.js";
import AnimationContent from "./AnimationContent.js";
import AnimationSprite from "./AnimationSprite.js";

export default class MapGrid implements IMapGrid {
    public srartCell: XYObject;
    public startPixel: XYObject;
    public finishPixel: XYObject;
    public cellSize: number;
    public cellToShowCount: XYObject;
    private __gameState: IGameState;
    private __grid: HTMLCanvasElement;
    private __virtualCanvas: HTMLCanvasElement;
    private __canvasSize: SizedObject;
    private __animationSprites: { [id: string]: IAnimationContent };
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
        this.__canvasSize = canvasSize;
        this.cellSize = Math.min(
            Math.floor(
                (this.finishPixel.x - this.startPixel.x) / cellToShowCount.x
            ),
            Math.floor(
                (this.finishPixel.y - this.startPixel.y) / cellToShowCount.y
            )
        );
        this.cellToShowCount = cellToShowCount;
        this.__grid = this.__createGrid(canvasSize);
        this.__virtualCanvas = document.createElement("canvas");
        this.__virtualCanvas.height = canvasSize.height;
        this.__virtualCanvas.width = canvasSize.width;
        this.__animationSprites = {};
    }
    public getCell(xCoord: number, yCoord: number): XYObject {
        const deltax: number = xCoord - this.startPixel.x;
        const deltay: number = yCoord - this.startPixel.y;
        return {
            x: Math.floor(deltax / this.cellSize),
            y: Math.floor(deltay / this.cellSize),
        };
    }

    private __createGrid(canvasSize: SizedObject): HTMLCanvasElement {
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
        return canvas;
    }

    public getGrid(canvasSize: SizedObject): HTMLCanvasElement {
        if (
            canvasSize.height !== this.__canvasSize.height ||
            canvasSize.width !== this.__canvasSize.width
        ) {
            this.__grid = this.__createGrid(canvasSize);
            this.__virtualCanvas.height = canvasSize.height;
            this.__virtualCanvas.width = canvasSize.width;
        }
        return this.__grid;
    }

    public getContenet(cachedImages: ICachedImages): HTMLCanvasElement {
        if (this.__gameState.updating) {
            let ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
                this.__virtualCanvas.getContext("2d")
            );
            ctx.clearRect(
                0,
                0,
                this.__virtualCanvas.width,
                this.__virtualCanvas.height
            );
            const { x: nx, y: ny } = this.cellToShowCount;
            for (let k = 0; k < ny; k++) {
                for (let layerNumber = 0; layerNumber < 3; layerNumber++) {
                    for (let i = 0; i < nx; i++) {
                        const skins: { [id: string]: Skin } =
                            this.__gameState.getCellSkins(i, k)[layerNumber];
                        Object.keys(skins).forEach((id) => {
                            let skin = skins[id];
                            const img: HTMLImageElement = cachedImages.getImage(
                                skin.name
                            );
                            let scale: number = skin.scale || 1;
                            let deltaX: number =
                                0.5 * (scale - 1) * this.cellSize;
                            let deltaY: number = (scale - 1) * this.cellSize;
                            if (skin.align === "center") {
                                deltaY += 0.5 * this.cellSize;
                            }
                            if (skin.align === "bottom25") {
                                deltaY += 0.25 * this.cellSize;
                            }
                            let x: number = Math.floor(
                                i * this.cellSize + this.startPixel.x - deltaX
                            );
                            let y: number = Math.floor(
                                k * this.cellSize + this.startPixel.y - deltaY
                            );
                            this.__addAnimationSprite(
                                new AnimationContent(
                                    img,
                                    Math.floor(this.cellSize * scale),
                                    Math.floor(this.cellSize * scale),
                                    x,
                                    y,
                                    skin.frames,
                                    skin.framesHold,
                                    id
                                )
                            );
                        });
                    }
                }
            }
            this.__gameState.updating = false;
        }
        this.__updateAnimation();
        return this.__virtualCanvas;
    }

    private __updateAnimation(): void {
        let ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
            this.__virtualCanvas.getContext("2d")
        );
        ctx.clearRect(
            0,
            0,
            this.__virtualCanvas.width,
            this.__virtualCanvas.height
        );
        Object.keys(this.__animationSprites).forEach((key) => {
            let sprite: IAnimationContent = this.__animationSprites[key];
            sprite.update();
            const img: HTMLImageElement = sprite.img;
            ctx.drawImage(
                img,
                sprite.sx,
                sprite.sy,
                sprite.swidth,
                sprite.sheight,
                sprite.x,
                sprite.y,
                sprite.width,
                sprite.height
            );
        });
    }

    private __addAnimationSprite(sprite: IAnimationContent): void {
        if (!this.__animationSprites[sprite.id])
            this.__animationSprites[sprite.id] = sprite;
    }

    private __deleteAnimationSpriteById(id: string): void {
        delete this.__animationSprites[id];
    }
}
