import ICellContent from "../../GameState/Interfaces/ICellContent";

export default interface ICharacter extends ICellContent {
    hp: number
    movePoint: number;
}
