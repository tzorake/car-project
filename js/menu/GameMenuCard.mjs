import { GameUtils } from "../game/GameUtils.mjs";
import { Vector2 } from "../math/Vector2.mjs";
import { GameUIComponent } from "./base/GameUIComponent.mjs";
import { GameUIComponentStyle } from "./base/GameUIComponentStyle.mjs";

export class GameMenuCard extends GameUIComponent
{
    constructor({ center = Vector2.ZERO, dimension  = Vector2.ZERO, style = GameUIComponentStyle.EMPTY, parent = null })
    {
        super({ center, dimension, style, parent });
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

    connect()
    {

    }

    disconnect()
    {

    }
};