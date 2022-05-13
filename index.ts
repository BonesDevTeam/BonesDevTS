import GameState from "./app/Model/Implimentations/GameState.js";
import DrawCanvas from "./app/Viewer/Implimentations/DrawCanvas.js";

const gameState: IGameState = new GameState(500, 500, "../../assets/Ship.png");
const div: HTMLDivElement = <HTMLDivElement>(
    document.getElementById("fieldWrapper")
);
div.style.background = `url('${gameState.background}')`;
gameState.moveCharacter({ skinName: "./assets/gunnerDefault.png" }, 1, 4);
DrawCanvas.init();
window.requestAnimationFrame(
    DrawCanvas.upddateCanvas.bind(null, gameState, 500, 500)
);
