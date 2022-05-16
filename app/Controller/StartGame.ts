import FileManager from "../Global/FileManager.js";
import GameState from "../Model/GameState/Implimentations/GameState.js";
import IGameState from "../Model/GameState/Interfaces/IGameState.js";
import ICachedImages from "../Viewer/Interfaces/ICachedImages.js";
import ISave from "./Interfaces/ISave.js";

export default class StartGame {
    static async start(
        mapName: string,
        cachedImages: ICachedImages
    ): Promise<IGameState> {
        return new Promise<IGameState>(async (resolve, reject) => {
            await cachedImages.addImage(
                "gunnerDefault",
                "Characters/images/player/gunnerDefault.png"
            );
            await cachedImages.addImage("rocket", "rocket.png");
            cachedImages.addURL("Ship", "Ship.png");
            const map: ISave = await FileManager.get(`../../assets/Maps/${mapName}.json`)

            const gameState: IGameState = new GameState(
                map.width,
                map.height,
                map.environment
            );
            map.players.forEach((player) => {
                gameState.moveCharacter(
                    player,
                    player.position.x,
                    player.position.y
                );
            });
            resolve(gameState);
        });
    }
}
