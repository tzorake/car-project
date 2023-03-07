import { GameUtils } from "../game/GameUtils.mjs";
import { EventListenerType } from "../game/GlobalGameController.mjs";
import { Color } from "../math/Color.mjs";
import { Vector2 } from "../math/Vector2.mjs";
import { GameUIComponent } from "./base/GameUIComponent.mjs";
import { GameUIComponentState } from "./base/GameUIComponentState.mjs";
import { GameUIComponentStyle } from "./base/GameUIComponentStyle.mjs";

export class GameMenuTab extends GameUIComponent
{
    constructor({ text = '', center = Vector2.ZERO, dimension  = Vector2.ZERO, style = GameUIComponentStyle.EMPTY, state = GameUIComponentState.DEFAULT, callbacks = {}, parent = null })
    {
        super({ center, dimension, style, callbacks, parent });

        this.text = text;
        this.state = state;
    }

    update(dt)
    {

    }

    render(dt)
    {
        const center = this.center;
        const dimension = this.dimension;
        const style = this.style;
        const text = this.text;

        const { fillStyle, strokeStyle, lineWidth, textStyle } = style;

        const customFill = new Color(249, 8, 10, 1.0);

        GameUtils.SAVE();
        GameUtils.FILL_STYLE(this.state === GameUIComponentState.DEFAULT ? fillStyle.rgba : customFill.rgba);
        console.info(strokeStyle)
        GameUtils.STROKE_STYLE(strokeStyle.rgba);
        GameUtils.LINE_WIDTH(lineWidth);
        GameUtils.BEGIN_PATH();
        GameUtils.RECT(center.x - dimension.x / 2, center.y - dimension.y / 2, dimension.x, dimension.y);
        GameUtils.FILL();
        GameUtils.STROKE();
        GameUtils.RESTORE();

        {
            const { fillStyle, strokeStyle, lineWidth, font, textAlign, textBaseline } = textStyle;

            GameUtils.SAVE();
            GameUtils.STROKE_STYLE(strokeStyle.rgba);
            GameUtils.FILL_STYLE(fillStyle.rgba);
            GameUtils.LINE_WIDTH(lineWidth);
            GameUtils.FONT(font.font);
            GameUtils.TEXT_ALIGN(textAlign);
            GameUtils.TEXT_BASELINE(textBaseline);
            GameUtils.TEXT(text, center.x, center.y);
            GameUtils.RESTORE();
        }
    }

    connect()
    {
        if (this.mouseDown)
        {
            GameUtils.CONTROLLER.addCallback(EventListenerType.MOUSEDOWN, this.mouseDown);
        }
    }

    disconnect()
    {
        if (this.mouseDown)
        {
            GameUtils.CONTROLLER.removeCallback(EventListenerType.MOUSEDOWN, this.mouseDown);
        }
    }
};