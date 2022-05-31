import { Skin, XYObject } from "../../../Global/Types.js";
import ICharacterGame from "../../Characters/Interfaces/ICharacterGame.js";
import ICell from "../Interfaces/ICell.js";
import ICellContent from "../Interfaces/ICellContent.js";
import IGameState from "../Interfaces/IGameState.js";
import Cell from "./Cell.js";

export default class GameState implements IGameState {
    private __width: number;
    private __height: number;
    private __cells: { [id: string]: ICell };
    private __background: string;
    private __updating: boolean;
    public constructor(width: number, height: number, background: string) {
        this.__width = width;
        this.__height = height;
        this.__cells = {};
        this.__createCells();
        this.__background = background;
        this.__updating = true;
    }

    public get updating(): boolean {
        return this.__updating;
    }

    public set updating(updating) {
        this.__updating = updating;
    }

    public __createCells(): void {
        for (let row = 0; row < this.__height; row++) {
            for (let column = 0; column < this.__width; column++) {
                const cell = new Cell(column, row);
                this.__cells[cell.id] = cell;
            }
        }
    }

    public getCellSkins(x: number, y: number): Array<{[id:string]:Skin}> {
        const id: string = Cell.tranformCoordinatesToId(x, y);
        return this.__cells[id].layers;
    }

    public moveCharacter(
        character: ICharacterGame,
        x: number,
        y: number
    ): void {
        const id: string = Cell.tranformCoordinatesToId(x, y);
        this.__cells[id].character = character;
        character.setPosition({ x, y });
    }

    public get background(): string {
        return this.__background;
    }

    public get cellsCount(): XYObject {
        return {
            x: this.__width,
            y: this.__height,
        };
    }

    public addContent(s: ICellContent): void {
        const id: string = Cell.tranformCoordinatesToId(s.x, s.y);
        this.__cells[id].addContent(s);
    }
}
