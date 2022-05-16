export default interface ICachedImages {
    addImage: (id: string, src: string) => Promise<void>;
    getImage: (id: string) => HTMLImageElement;
    addURL: (id: string, src: string) => void;
    getURL: (id: string) => string;
}
