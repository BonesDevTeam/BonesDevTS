import GameState from "./app/Model/Implimentations/GameState.js";
import IGameState from "./app/Model/Interfaces/IGameState.js";
import CachedImages from "./app/Viewer/Implimentations/CachedImages.js";
import DrawCanvas from "./app/Viewer/Implimentations/DrawCanvas.js";
import ICachedImages from "./app/Viewer/Interfaces/ICachedImages.js";

window.addEventListener("load", async () => {
    const cachedImages: ICachedImages = new CachedImages();
    await cachedImages.addImage("gunnerDefault", "./assets/gunnerDefault.png");
    await cachedImages.addImage("rocket", "../../../assets/rocket.png");
    const gameState: IGameState = new GameState(
        10,
        10,
        "../../assets/Ship.png"
    );
    const div: HTMLDivElement = <HTMLDivElement>(
        document.getElementById("fieldWrapper")
    );
    div.style.background = `url('${gameState.background}')`;
    gameState.moveCharacter({ skinName: "gunnerDefault" }, 2, 4);
    DrawCanvas.init(gameState, cachedImages);
    window.requestAnimationFrame(
        DrawCanvas.upddateCanvas.bind(null, gameState, 10, 10)
    );
});
