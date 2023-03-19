import { GameUtils } from "../game/GameUtils.mjs";
import { Color } from "../math/Color.mjs";
import { GameUIComponent } from "./base/GameUIComponent.mjs";
import { GameUIComponentStyle } from "./base/GameUIComponentStyle.mjs";

export class GameMenuBackground extends GameUIComponent
{
    constructor({ center = Vector2.ZERO, dimension  = Vector2.ZERO, parent = null })
    {
        super({ center, dimension, parent });

        this.style = new GameUIComponentStyle({
            fillStyle: new Color(123, 237, 195, 1.0)
        });
    }

    update(dt)
    {

    }

    render(dt)
    {
        const center = this.center;
        const dimension = this.dimension;
        const style = this.style;

        const { fillStyle, strokeStyle, lineWidth } = style;

        GameUtils.SAVE();
        GameUtils.STROKE_STYLE(strokeStyle.rgba);
        GameUtils.FILL_STYLE(fillStyle.rgba);
        GameUtils.LINE_WIDTH(lineWidth);
        GameUtils.BEGIN_PATH();
        GameUtils.RECT(center.x - dimension.x / 2, center.y - dimension.y / 2, dimension.x, dimension.y);
        GameUtils.FILL();
        GameUtils.RESTORE();
    }
};