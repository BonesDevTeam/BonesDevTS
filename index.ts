import StartGame from "./app/Controller/StartGame.js";
import IGameState from "./app/Model/GameState/Interfaces/IGameState.js";
import CachedImages from "./app/Viewer/Implimentations/CachedImages.js";
import DrawCanvas from "./app/Viewer/Implimentations/DrawCanvas.js";
import ICachedImages from "./app/Viewer/Interfaces/ICachedImages.js";

window.addEventListener("load", async () => {
    const cachedImages: ICachedImages = new CachedImages();
    await cachedImages.addImage(
        "gunnerDefault",
        "./assets/Characters/images/player/gunnerDefault.png"
    );
    await cachedImages.addImage("rocket", "../../../assets/rocket.png");
    await cachedImages.addURL("Ship", "../../../assets/Ship.png");
    const gameState: IGameState = await StartGame.start("EmptyMap");
    const div: HTMLDivElement = <HTMLDivElement>(
        document.getElementById("fieldWrapper")
    );
    div.style.background = `url('${cachedImages.getURL(
        gameState.background
    )}')`;
    DrawCanvas.init(gameState, cachedImages);
    window.requestAnimationFrame(
        DrawCanvas.upddateCanvas.bind(null, gameState, gameState.cellsCount.x, gameState.cellsCount.y)
    );
});
