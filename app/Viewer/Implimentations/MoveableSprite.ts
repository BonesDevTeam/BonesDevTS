import AnimationSprite from "./AnimationSprite.js";

type velocity = { x: number; y: number };
export default class MoveableSprite extends AnimationSprite {
    protected _velocity: velocity;
    public constructor(
        img: HTMLImageElement,
        width: number,
        height: number,
        startX: number,
        startY: number,
        frames?: number,
        framesHold?: number
    ) {
        super(img, width, height, startX, startY, frames, framesHold);
        this._velocity = { x: 0.2, y: 0 };
    }

    public update(): void {
        super.update()
        this._x += this.getVelocity(this._startTime).x;
        this._y += this.getVelocity(this._startTime).y;
    }

    public getVelocity(time: number): velocity {
        if (time < 30) {
            this._velocity = {
                x: 15,
                y: -10,
            };
        } else {
            this._velocity = {
                x: 15,
                y: 10,
            };
        }

        this._velocity = {
            x: 10,
            y: -10 + 0.0025 * time ** 2,
        };
        return this._velocity;
    }
}
