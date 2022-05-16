import ISprite from "./ISprite";

export default interface IAnimationSprite extends ISprite {
    update: (time: number) => void;
}
