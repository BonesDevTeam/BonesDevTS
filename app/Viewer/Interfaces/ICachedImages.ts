export default interface ICachedImages {
    addImage: (id: string, src: string) => Promise<void>;
    getImage: (id: string) => HTMLImageElement;
}
