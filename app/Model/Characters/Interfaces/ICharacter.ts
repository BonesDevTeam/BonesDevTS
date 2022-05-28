import ICellConten from "../../GameState/Interfaces/ICellContent";

export default interface ICharacter extends ICellConten {
    hp: number
    movePoint: number;
}
