import ICachedImages from "../Interfaces/ICachedImages";

export default class CachedImages implements ICachedImages {
    private __images: { [id: string]: HTMLImageElement };
    constructor() {
        this.__images = {};
    }

    public async addImage(id: string, src: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const img: HTMLImageElement = new Image();
            img.src = src;
            img.onload = () => {
                this.__images[id] = img;
                resolve();
            };
        });
    }

    public getImage(id: string): HTMLImageElement {
        return this.__images[id];
    }
}
