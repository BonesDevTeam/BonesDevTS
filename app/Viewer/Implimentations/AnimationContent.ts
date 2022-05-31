import IAnimationContent from "../Interfaces/IAnimationContent.js";
import AnimationSprite from "./AnimationSprite.js";

export default class AnimationContent
    extends AnimationSprite
    implements IAnimationContent
{
    protected _id: string;
    public constructor(
        img: HTMLImageElement,
        width: number,
        height: number,
        startX: number,
        startY: number,
        frames: number = 1,
        framesHold: number = 1,
        id: string
    ) {
        super(img, width, height, startX, startY, frames, framesHold);
        this._id = id;        
    }
    public get id(): string {
        return this._id;
    }
}
