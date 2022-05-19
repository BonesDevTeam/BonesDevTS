import IAnimationSprite from "../Interfaces/IAnimationSprite";
type velocity = { x: number; y: number };
export default class AnimationSprite implements IAnimationSprite {
    private _img: HTMLImageElement;
    private _width: number;
    private _height: number;
    private _startTime: number;
    private _x: number;
    private _y: number;
    private __velocity: velocity;
    private __frames: number;
    private __framesCurrent: number;
    private __framesHold: number;
    private __framesElapsed: number;
    public constructor(
        img: HTMLImageElement,
        width: number,
        height: number,
        startX: number,
        startY: number,
        frames: number = 1,
        framesHold: number = 1
    ) {
        this._img = img;
        this._width = width;
        this._height = height;
        this._startTime = 0;
        this._x = startX;
        this._y = startY;
        this.__velocity = { x: 0.2, y: 0 };
        this.__frames = frames;
        this.__framesHold = framesHold;
        this.__framesCurrent = 0;
        this.__framesElapsed = 0;
    }

    public get img(): HTMLImageElement {
        return this._img;
    }

    public update(): void {
        this._startTime++
        if (this.__framesElapsed < this.__framesHold-1) {
            this.__framesElapsed++;
        } else {
            this.__framesElapsed = 0;
            if (this.__framesCurrent < this.__frames - 1) {
                this.__framesCurrent++;
            } else {
                this.__framesCurrent = 0;
            }
        }

        // this._startTime = time;
        this._x += this.getVelocity(this._startTime).x;
        this._y += this.getVelocity(this._startTime).y;
        this.resize();
    }

    public resize(): void {}

    public getVelocity(time:number): velocity {
        if (time<30){
            this.__velocity = {
                x: 15,
                y: -10
            };
        }
        else {
            this.__velocity = {
                x: 15,
                y: 10
            };
        }

        this.__velocity = {
            x: 10,
            y: (-10+ 0.0025*time**2),
        };
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

    public get sx(): number {
        return this.swidth * this.__framesCurrent;
    }

    public get sy(): number {
        return 0;
    }

    public get swidth(): number {       
        return this._img.width / this.__frames;
    }

    public get sheight(): number {
        return this._img.height;
    }
}
