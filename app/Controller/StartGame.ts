import FileManager from "../Global/FileManager.js";
import Character from "../Model/Characters/Implimentations/Character.js";
import ICharacterGame from "../Model/Characters/Interfaces/ICharacterGame.js";
import ICharacterJson from "../Model/Characters/Interfaces/ICharacterJson.js";
import GameState from "../Model/GameState/Implimentations/GameState.js";
import IGameState from "../Model/GameState/Interfaces/IGameState.js";
import ICachedImages from "../Viewer/Interfaces/ICachedImages.js";
import ISkinJson from "../Viewer/Interfaces/ISkinJson.js";
import ISave from "./Interfaces/ISave.js";

export default class StartGame {
    static async start(
        mapName: string,
        cachedImages: ICachedImages
    ): Promise<IGameState> {
        return new Promise<IGameState>(async (resolve, reject) => {
            const map: ISave = await FileManager.get(
                `../../assets/Maps/${mapName}.json`
            );
            const gameState: IGameState = new GameState(
                map.width,
                map.height,
                map.environment
            );

            await cachedImages.addImage("rocket", "rocket.png");
            cachedImages.addURL(
                gameState.background,
                `../../assets/Maps/Backgrounds/${gameState.background}.png`
            );

            StartGame.initPlayers(map, gameState, cachedImages);
            resolve(gameState);
        });
    }

    private static async initPlayers(
        map: ISave,
        gameState: IGameState,
        cachedImages: ICachedImages
    ): Promise<void> {
        map.players.forEach(async (player) => {
            const playerBase: ICharacterJson = await FileManager.get(
                `../../assets/Characters/${player.name}.json`
            );
            const playerGame: ICharacterGame = new Character(
                player,
                playerBase
            );
            const skin: ISkinJson = await FileManager.get(
                `../../assets/Characters/Skins/${playerBase.className}.json`
            );
            const skinName: string =
                skin[playerBase.name][player.skinName].name;
            await cachedImages.addImage(
                playerGame.skinName,
                `Characters/images/${playerBase.className}/${skinName}.png`
            );
            gameState.moveCharacter(playerGame, player.x, player.y);
        });
    }
}
