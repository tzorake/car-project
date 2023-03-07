import { Color } from "../../math/Color.mjs";
import { GameUITextStyle } from "./GameUITextStyle.mjs";

export class GameUIComponentStyle
{
    constructor({ fillStyle = new Color(), strokeStyle = new Color(), lineWidth = 1.0 , textStyle = GameUITextStyle.EMPTY })
    {
        this.fillStyle   = fillStyle;
        this.strokeStyle = strokeStyle;
        this.lineWidth   = lineWidth;
        this.textStyle   = textStyle;
    }

    static get EMPTY()
    {
        return new GameUIComponentStyle({});
    }
};