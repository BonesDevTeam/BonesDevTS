import IGameState from "../../Model/GameState/Interfaces/IGameState.js";
import IAnimationSprite from "../Interfaces/IAnimationSprite.js";
import ICachedImages from "../Interfaces/ICachedImages.js";
import IMapGrid from "../Interfaces/IMapGrid.js";
import MapGrid from "./MapGrid.js";
import MoveableSprite from "./MoveableSprite.js";

export default class DrawCanvas {
    private static animationSprites: IAnimationSprite[] = [];
    private static statics: IAnimationSprite[] = [];
    private static canvas: HTMLCanvasElement;
    private static canvasAnimation: HTMLCanvasElement;
    private static virtualCanvas: HTMLCanvasElement =
        document.createElement("canvas");
    private static div: HTMLDivElement;
    private static mapGrid: IMapGrid;
    private static cachedImages: ICachedImages;

    public static init(
        gameState: IGameState,
        cachedImages: ICachedImages
    ): void {
        DrawCanvas.cachedImages = cachedImages;
        DrawCanvas.canvas = <HTMLCanvasElement>(
            document.getElementById("canvas")
        );
        DrawCanvas.canvasAnimation = <HTMLCanvasElement>(
            document.getElementById("canvasAnimation")
        );
        const canvas: HTMLCanvasElement = DrawCanvas.canvas;
        DrawCanvas.div = <HTMLDivElement>DrawCanvas.canvas.closest("div");
        DrawCanvas.__updateCanvasSizes(gameState);
        DrawCanvas.mapGrid = new MapGrid(
            gameState,
            { x: 0, y: 0 },
            { x: 600, y: 400 },
            { x: 2400, y: 1600 },
            DrawCanvas.canvas,
            gameState.cellsCount
        );

        function click(e: MouseEvent) {
            // DrawCanvas.addAnimationSprite(
            //     new AnimationSprite(
            //         cachedImages.getImage("rocket"),
            //         150,
            //         100,
            //         e.offsetX,
            //         e.offsetYS
            //     )
            // );

            DrawCanvas.addAnimationSprite(
                new MoveableSprite(
                    cachedImages.getImage("RumFlip"),
                    200,
                    200,
                    e.offsetX,
                    e.offsetY,
                    7,
                    4
                )
            );
        }
        canvas.addEventListener("click", click);
    }

    private static __updateCanvasSizes(gameState: IGameState): void {
        const div: HTMLDivElement = DrawCanvas.div;
        if (
            div.clientWidth !== DrawCanvas.canvas.width ||
            DrawCanvas.canvas.height !== div.clientHeight
        ) {
            DrawCanvas.canvas.width = div.clientWidth;
            DrawCanvas.canvas.height = div.clientHeight;
            DrawCanvas.canvasAnimation.width = div.clientWidth;
            DrawCanvas.canvasAnimation.height = div.clientHeight;
            DrawCanvas.virtualCanvas.width = div.clientWidth;
            DrawCanvas.virtualCanvas.height = div.clientHeight;
            gameState.updating = true;
        }
    }

    public static updateCanvas(
        gameState: IGameState,
        nx: number,
        ny: number
    ): void {
        DrawCanvas.__updateCanvasSizes(gameState);
        DrawCanvas.updateMap(gameState, nx, ny);
        DrawCanvas.updateAnimation();
        window.requestAnimationFrame(
            DrawCanvas.updateCanvas.bind(null, gameState, nx, ny)
        );
    }

    private static clearMap(backGround?: string): void {
        const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
            DrawCanvas.canvas.getContext("2d")
        );
        ctx.clearRect(0, 0, DrawCanvas.canvas.width, DrawCanvas.canvas.height);

        // if (backGround) {
        //     const img: HTMLImageElement = new Image();
        //     img.src = backGround;
        //     ctx.drawImage(
        //         img,
        //         0,
        //         0,
        //         DrawCanvas.canvas.width,
        //         DrawCanvas.canvas.height
        //     );
        // }
    }

    private static updateMap(
        gameState: IGameState,
        nx: number,
        ny: number
    ): void {
        const canvas: HTMLCanvasElement = DrawCanvas.canvas;
        const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
            canvas.getContext("2d")
        );
        DrawCanvas.clearMap(gameState.background);
        const grid: HTMLCanvasElement = DrawCanvas.mapGrid.getGrid(
            DrawCanvas.canvas
        );
        const content: HTMLCanvasElement = DrawCanvas.mapGrid.getContenet(
            this.cachedImages
        );
        ctx.drawImage(grid, 0, 0);
        ctx.drawImage(content, 0, 0);
    }

    static updateAnimation(): void {
        let ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
            DrawCanvas.virtualCanvas.getContext("2d")
        );
        ctx.clearRect(
            0,
            0,
            DrawCanvas.virtualCanvas.width,
            DrawCanvas.virtualCanvas.height
        );
        DrawCanvas.animationSprites.forEach((sprite) => {
            sprite.update();
            if (
                !(
                    sprite.x < DrawCanvas.virtualCanvas.width &&
                    sprite.y < DrawCanvas.virtualCanvas.height &&
                    sprite.x > 0 &&
                    sprite.y > 0
                )
            ) {
                setTimeout(() => {
                    DrawCanvas.deleteAnimationSprite(sprite);
                }, 0);
                return;
            }
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
        ctx = <CanvasRenderingContext2D>(
            DrawCanvas.canvasAnimation.getContext("2d")
        );
        ctx.clearRect(
            0,
            0,
            DrawCanvas.virtualCanvas.width,
            DrawCanvas.virtualCanvas.height
        );
        ctx.drawImage(DrawCanvas.virtualCanvas, 0, 0);
    }

    public static addAnimationSprite(sprite: IAnimationSprite): void {
        DrawCanvas.animationSprites.push(sprite);
    }

    public static deleteAnimationSprite(sprite: IAnimationSprite): void {
        DrawCanvas.animationSprites.splice(
            DrawCanvas.animationSprites.indexOf(sprite),
            1
        );
    }
}
