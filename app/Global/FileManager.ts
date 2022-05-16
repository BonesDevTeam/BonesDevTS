export default class FileManager {
    static async get<T>(url:string): Promise<T>{
        return new Promise<T>(async (resolve, reject) => {
            const response: Response = await fetch(url);
            const json: T = await response.json();
            resolve(json)
        })
    }
}