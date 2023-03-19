import { GameUtils } from "../game/GameUtils.mjs";
import { Color } from "../math/Color.mjs";
import { Font } from "../math/Font.mjs";
import { Vector2 } from "../math/Vector2.mjs";
import { GameUIComponent } from "./base/GameUIComponent.mjs";
import { GameUIComponentState } from "./base/GameUIComponentState.mjs";
import { GameUIComponentStyle } from "./base/GameUIComponentStyle.mjs";
import { GameUITextStyle } from "./base/GameUITextStyle.mjs";

export class GameMenuTab extends GameUIComponent
{
    constructor({ text = '', center = Vector2.ZERO, dimension  = Vector2.ZERO, state = GameUIComponentState.DEFAULT, callbacks = {}, parent = null })
    {
        super({ center, dimension, callbacks, parent });

        this.text = text;
        this.state = state;

        this.style = new GameUIComponentStyle({
            fillStyle: new Color(0, 0, 0, 0.75),
            strokeStyle: new Color(0, 0, 0, 0.0),
            textStyle: new GameUITextStyle({
                fillStyle: new Color(255, 255, 255, 0.75),
                strokeStyle: new Color(0, 0, 0, 0.0),
                font: new Font(16, 'Roboto')
            })
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
        const text = this.text;

        const { fillStyle, strokeStyle, lineWidth, textStyle } = style;

        const customFill = new Color(249, 8, 10, 1.0);

        GameUtils.SAVE();
        GameUtils.FILL_STYLE(this.state === GameUIComponentState.DEFAULT ? fillStyle.rgba : customFill.rgba);
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
};