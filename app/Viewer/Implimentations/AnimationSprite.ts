import IAnimationSprite from "../Interfaces/IAnimationSprite";

export default class AnimationSprite implements IAnimationSprite {
    protected _img: HTMLImageElement;
    protected _width: number;
    protected _height: number;
    protected _startTime: number;
    protected _x: number;
    protected _y: number;
    protected _frames: number;
    protected _framesCurrent: number;
    protected _framesHold: number;
    protected _framesElapsed: number;
    public constructor(
        img: HTMLImageElement,
        width: number,
        height: number,
        x: number,
        y: number,
        frames: number = 1,
        framesHold: number = 1
    ) {
        this._img = img;
        this._width = width;
        this._height = height;
        this._startTime = 0;
        this._x = x;
        this._y = y;
        this._frames = frames;
        this._framesHold = framesHold;
        this._framesCurrent = 0;
        this._framesElapsed = 0;
    }

    public get img(): HTMLImageElement {
        return this._img;
    }

    public update(): void {
        this._startTime++;
        if (this._framesElapsed < this._framesHold - 1) {
            this._framesElapsed++;
        } else {
            this._framesElapsed = 0;
            if (this._framesCurrent < this._frames - 1) {
                this._framesCurrent++;
            } else {
                this._framesCurrent = 0;
            }
        }
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

    public get sx(): number {
        return this.swidth * this._framesCurrent;
    }

    public get sy(): number {
        return 0;
    }

    public get swidth(): number {
        return this._img.width / this._frames;
    }

    public get sheight(): number {
        return this._img.height;
    }
}
