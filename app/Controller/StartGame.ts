import GameState from "../Model/GameState/Implimentations/GameState.js";
import IGameState from "../Model/GameState/Interfaces/IGameState.js";
import ISave from "./Interfaces/ISave.js";

export default class StartGame {
    static async start(map: string): Promise<IGameState> {
        return new Promise<IGameState>(async (resolve, reject) => {
            const response: Response = await fetch(
                "../../assets/Maps/EmptyMap.json"
            );
            const map: ISave = await response.json();
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
