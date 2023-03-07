import { Color } from "../../math/Color.mjs";

export class GameUIComponentStyle
{
    constructor({ fillStyle = new Color(), strokeStyle = new Color(), lineWidth = 1.0 })
    {
        this.fillStyle   = fillStyle;
        this.strokeStyle = strokeStyle;
        this.lineWidth   = lineWidth;
    }

    static get EMPTY()
    {
        return new GameUIComponentStyle({});
    }
};