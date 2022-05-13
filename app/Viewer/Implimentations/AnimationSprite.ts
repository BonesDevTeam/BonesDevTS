import IAnimationSprite from "../Interfaces/IAnimationSprite";
type velocity = { x: number; y: number };
export default class AnimationSprite implements IAnimationSprite {
    private _img: string;
    private _width: number;
    private _height: number;
    private _startTime: number;
    private _x: number;
    private _y: number;
    private __velocity: velocity;
    public constructor(
        img: string,
        width: number,
        height: number,
        startTime: number,
        startX: number,
        startY: number
    ) {
        this._img = img;
        this._width = width;
        this._height = height;
        this._startTime = startTime;
        this._x = startX;
        this._y = startY;
        this.__velocity = { x: 0.2, y: 0 };
    }

    public get imgName(): string {
        return this._img;
    }

    public update(time: number): void {
        const deltaTime: number = time - this._startTime;
        this._startTime = time;
        this._x += this.getVelocity(deltaTime).x * deltaTime;
        this._y += this.getVelocity(deltaTime).y * deltaTime;
        this.resize(deltaTime);
    }

    public resize(time: Number): void {}

    public getVelocity(deltaTime: number): velocity {
        const g: number = 0.00001
        this.__velocity = {x: this.__velocity.x, y: this.__velocity.y + deltaTime*g}
        return this.__velocity;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public set width(width) {
        this._width = Math.floor(width);
    }

    public set height(height) {
        this._height = Math.floor(height);
    }
}
