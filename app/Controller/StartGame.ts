import ISave from "./Interfaces/ISave";
import ICharacter from "../Model/Characters/Interfaces/ICharacter";
import ICharacterGame from "../Model/Characters/Interfaces/ICharacterGame";
import ICharacterJson from "../Model/Characters/Interfaces/ICharacterJson";
import IGameState from "../Model/GameState/Interfaces/IGameState";
import IStatic from "../Model/Statics/Interfaces/IStatic";
import IStaticJson from "../Model/Statics/Interfaces/IStaticJson";
import ICachedImages from "../Viewer/Interfaces/ICachedImages";
import ISkinJson from "../Viewer/Interfaces/ISkinJson";

import FileManager from "../Global/FileManager.js";
import asyncForEach from "../Global/Functions.js";
import Character from "../Model/Characters/Implimentations/Character.js";
import GameState from "../Model/GameState/Implimentations/GameState.js";
import StaticFactory from "./Implimentations/StaticFactory.js";

export default class StartGame {
    static async start(
        mapName: string,
        cachedImages: ICachedImages
    ): Promise<IGameState> {
        const map: ISave = await FileManager.get(
            `../../assets/Maps/${mapName}.json`
        );
        await cachedImages.addImage(
            "airPoof",
            "../../assets/Animation/AirPoof.png"
        );
        await cachedImages.addImage(
            "RumFlip",
            "../../assets/Animation/RumFlip.png"
        );

        await cachedImages.addImage("rocket", "rocket.png");

        const gameState: IGameState = new GameState(
            map.width,
            map.height,
            map.environment
        );
        cachedImages.addURL(
            gameState.background,
            `../../assets/Maps/Backgrounds/${gameState.background}.png`
        );
        await StartGame.initContent(map, gameState, cachedImages);
        await StartGame.initPlayers(map, gameState, cachedImages);
        return gameState;
    }

    private static async initContent(
        map: ISave,
        gameState: IGameState,
        cachedImages: ICachedImages
    ): Promise<void> {
        await asyncForEach<IStatic>(map.content, async (s, i, players) => {
            const staticBase: IStaticJson = await FileManager.get(
                `../../assets/Statics/${s.name}.json`
            );
            staticBase.skin = await FileManager.get(
                `../../assets/Statics/Skins/${staticBase.name}.json`
            );
            let staticGame: IStatic = <IStatic>(
                StaticFactory.createStatic(s, staticBase)
            );
            const skins: ISkinJson = await FileManager.get(
                `../../assets/Statics/Skins/${staticGame.name}.json`
            );

            for (let skinName in skins) {
                await cachedImages.addImage(
                    staticGame.skin.name,
                    `Statics/images/${staticBase.name}/${skins[skinName].name}.png`
                );
            }
            gameState.addContent(staticGame);
        });
    }

    private static async initPlayers(
        map: ISave,
        gameState: IGameState,
        cachedImages: ICachedImages
    ): Promise<void> {
        await asyncForEach<ICharacter>(
            map.players,
            async (player, i, players) => {
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
                const skinName: string = skin[playerBase.name].name;
                await cachedImages.addImage(
                    playerGame.skin.name,
                    `Characters/images/${playerBase.className}/${skinName}.png`
                );
                gameState.moveCharacter(playerGame, player.x, player.y);
            }
        );
    }
}
