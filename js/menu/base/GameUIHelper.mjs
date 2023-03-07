import { GameUtils } from "../../game/GameUtils.mjs";

export const rect = function(x, y, w, h, styles)
{
    const { fillStyle, strokeStyle, lineWidth } = styles;

    GameUtils.SAVE();

    GameUtils.BEGIN_PATH();
    GameUtils.FILL_STYLE(fillStyle);
    GameUtils.STROKE_STYLE(strokeStyle);
    GameUtils.LINE_WIDTH(lineWidth);

    GameUtils.RECT(x, y, w, h);
    GameUtils.FILL();
    GameUtils.STROKE();

    GameUtils.RESTORE();
}

export const label = function(text, x, y, w, h, styles)
{
    const { font, fillStyle } = styles;

    const metrics = GameUtils.MEASURE_TEXT(text, styles);
    const fontHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    GameUtils.SAVE();

    GameUtils.FONT(font);
    GameUtils.FILL_STYLE(fillStyle);
    
    GameUtils.TEXT(text, x - metrics.width / 2 + w / 2, y + fontHeight / 2 + h / 2);

    GameUtils.RESTORE();
}

export const within = function(x, y, x0, y0, x1, y1)
{
    return x >= x0 && x < x1 && y >= y0 && y < y1; 
}