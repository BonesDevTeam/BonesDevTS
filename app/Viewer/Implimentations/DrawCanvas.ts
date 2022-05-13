import GameState from "../../Model/Implimentations/GameState";
import IAnimationSprite from "../Interfaces/IAnimationSprite";
import AnimationSprite from "./AnimationSprite.js";

export default class DrawCanvas {
    static animationSprites: IAnimationSprite[] = [];
    static canvas: HTMLCanvasElement;
    static canvasAnimation: HTMLCanvasElement;
    static virtualCanvas: HTMLCanvasElement = document.createElement("canvas");
    static div: HTMLDivElement;
    static size: number = 0;
    static time: number = 0;

    static init() {
        DrawCanvas.canvas = <HTMLCanvasElement>(
            document.getElementById("canvas")
        );
        DrawCanvas.canvasAnimation = <HTMLCanvasElement>(
            document.getElementById("canvasAnimation")
        );
        const canvas: HTMLCanvasElement = DrawCanvas.canvas;
        DrawCanvas.div = <HTMLDivElement>DrawCanvas.canvas.closest("div");
        function click(e: MouseEvent) {
            const { x, y } = canvas.getBoundingClientRect();
            let coords = {
                x: Math.floor((e.clientX - x) / DrawCanvas.size),
                y: Math.floor((e.clientY - y) / DrawCanvas.size),
            };
            console.log(coords);
            DrawCanvas.addAnimationSprite(
                new AnimationSprite(
                    "../../../assets/rocket.png",
                    150,
                    100,
                    DrawCanvas.time,
                    e.clientX,
                    e.clientY
                )
            );
        }
        canvas.addEventListener("click", click);
    }

    static upddateCanvas(
        gameState: IGameState,
        nx: number,
        ny: number,
        time: number = 0
    ): void {
        const div: HTMLDivElement = DrawCanvas.div;
        if (
            div.clientWidth !== DrawCanvas.canvas.width ||
            DrawCanvas.canvas.height !== div.clientHeight
        ) {
            console.log(div);
            DrawCanvas.canvas.width = div.clientWidth;
            DrawCanvas.canvasAnimation.width = div.clientWidth;
            DrawCanvas.virtualCanvas.width = div.clientWidth;
            DrawCanvas.canvas.height = div.clientHeight;
            DrawCanvas.canvasAnimation.height = div.clientHeight;
            DrawCanvas.virtualCanvas.height = div.clientHeight;
            gameState.updating = true;
        }
        DrawCanvas.time = time;
        DrawCanvas.upddateMap(gameState, nx, ny);
        DrawCanvas.updateAnimation(time);
        window.requestAnimationFrame(
            DrawCanvas.upddateCanvas.bind(null, gameState, nx, ny)
        );
    }

    static clearMap(backGround?: string): void {
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

    static upddateMap(gameState: IGameState, nx: number, ny: number): void {
        if (!gameState.updating) return;
        gameState.updating = false;
        const canvas: HTMLCanvasElement = DrawCanvas.canvas;
        const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
            canvas.getContext("2d")
        );

        // ctx.fillStyle = ;
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        DrawCanvas.clearMap(gameState.background);
        DrawCanvas.size = Math.min(
            Math.floor(DrawCanvas.canvas.width / nx),
            Math.floor(DrawCanvas.canvas.height / ny)
        );
        for (let i = 0; i < nx; i++) {
            for (let k = 0; k < ny; k++) {
                const size: number = DrawCanvas.size;
                ctx.strokeRect(i * size, k * size, size, size);
                const skins: string[] = gameState.getCellSkins(i, k);
                if (skins) {
                    skins.forEach((skinName) => {
                        const img: HTMLImageElement = new Image();
                        img.src = skinName;
                        ctx.drawImage(
                            img,
                            i * size + size / 4,
                            k * size + size / 4,
                            size / 2,
                            size / 2
                        );
                    });
                }
            }
        }
        // ctx.
    }
    static img: HTMLImageElement | null = null;
    static updateAnimation(time: number): void {
        let ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
            DrawCanvas.virtualCanvas.getContext("2d")
        );
        ctx.clearRect(
            0,
            0,
            DrawCanvas.virtualCanvas.width,
            DrawCanvas.virtualCanvas.height
        );
        const sizeCoef: number = 1;
        DrawCanvas.animationSprites.forEach((sprite) => {
            sprite.update(time);
            // (sprite.width *= sizeCoef), (sprite.height *= sizeCoef);
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
            if (!DrawCanvas.img) {
                DrawCanvas.img = new Image();
                DrawCanvas.img.src = sprite.imgName;
            }
            ctx.drawImage(
                DrawCanvas.img,
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

    static addAnimationSprite(sprite: IAnimationSprite): void {
        DrawCanvas.animationSprites.push(sprite);
    }

    static deleteAnimationSprite(sprite: IAnimationSprite): void {
        DrawCanvas.animationSprites.splice(
            DrawCanvas.animationSprites.indexOf(sprite),
            1
        );
    }
}
