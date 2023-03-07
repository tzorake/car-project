import { Color } from "../../math/Color.mjs";
import { Font } from "../../math/Font.mjs";

export const TextAlignment = {};
TextAlignment.LEFT   = 'left';
TextAlignment.RIGHT  = 'right';
TextAlignment.CENTER = 'center';
TextAlignment.START  = 'start';
TextAlignment.END    = 'end';

export const TextBaseline = {};
TextBaseline.TOP         = 'top';
TextBaseline.HANGING     = 'hanging';
TextBaseline.MIDDLE      = 'middle';
TextBaseline.ALPHABETIC  = 'alphabetic';
TextBaseline.IDEOGRAPHIC = 'ideographic';
TextBaseline.BOTTOM      = 'bottom';

export class GameUITextStyle
{
    constructor({ fillStyle = new Color(), strokeStyle = new Color(), lineWidth = 1.0, font = new Font(14, 'Roboto'), textAlign = TextAlignment.CENTER, textBaseline = TextBaseline.MIDDLE })
    {
        this.fillStyle    = fillStyle;
        this.strokeStyle  = strokeStyle;
        this.lineWidth    = lineWidth;
        this.font         = font;
        this.textAlign    = textAlign;
        this.textBaseline = textBaseline;
    }

    static get EMPTY()
    {
        return new GameUITextStyle({});
    }
};