import { XYObject } from "../../../Global/Types.js";
import ICharacter from "../../Characters/Interfaces/ICharacter.js";
import ICell from "../Interfaces/ICell.js";
import IGameState from "../Interfaces/IGameState.js";
import Cell from "./Cell.js";

export default class GameState implements IGameState {
    private __width: number;
    private __height: number;
    private __cells: { [id: string]: ICell };
    private __background: string;
    public updating;
    constructor(width: number, height: number, background: string) {
        this.__width = width;
        this.__height = height;
        this.__cells = {};
        this.__createCells();
        this.__background = background;
        this.updating = true;
    }

    __createCells(): void {
        for (let row = 0; row < this.__height; row++) {
            for (let column = 0; column < this.__width; column++) {
                const cell = new Cell(column, row);
                this.__cells[cell.id] = cell;
            }
        }
    }

    getCellSkins(x: number, y: number): string[] {
        const id: string = Cell.tranformCoordinatesToId(x, y);
        return this.__cells[id].skinsName;
    }

    moveCharacter(character: ICharacter, x: number, y: number): void {
        const id: string = Cell.tranformCoordinatesToId(x, y);
        this.__cells[id].character = character;
        character.position = { x, y };
    }

    get background(): string {
        return this.__background;
    }

    get cellsCount(): XYObject {
        return {
            x: this.__width,
            y: this.__height,
        };
    }
}
