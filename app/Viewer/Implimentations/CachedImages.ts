import ICachedImages from "../Interfaces/ICachedImages";

export default class CachedImages implements ICachedImages {
    private __images: { [id: string]: HTMLImageElement };
    private __urls: { [id: string]: string };
    private static preStr: string = "./assets/";
    constructor() {
        this.__images = {};
        this.__urls = {};
    }

    public async addImage(id: string, src: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.__images[id]) {
                resolve();
            }
            const img: HTMLImageElement = new Image();
            img.src = `${CachedImages.preStr}${src}`;
            img.onload = () => {
                this.__images[id] = img;
                resolve();
            };
        });
    }

    public getImage(id: string): HTMLImageElement {
        return this.__images[id];
    }

    public addURL(id: string, src: string): void {
        this.__urls[id] = `${CachedImages.preStr}${src}`;
    }

    public getURL(id: string): string {
        return this.__urls[id];
    }
}
