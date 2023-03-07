import { GameUtils } from "../game/GameUtils.mjs";
import { EventListenerType } from "../game/GlobalGameController.mjs";
import { Color } from "../math/Color.mjs";
import { Font } from "../math/Font.mjs";
import { MathFunction } from "../math/MathFunction.mjs";
import { Vector2 } from "../math/Vector2.mjs";
import { GameUIComponent } from "./base/GameUIComponent.mjs";
import { GameUIComponentState } from "./base/GameUIComponentState.mjs";
import { GameUIComponentStyle } from "./base/GameUIComponentStyle.mjs";

export class GameMenuCard extends GameUIComponent
{
    constructor({ text = '', center = Vector2.ZERO, dimension = Vector2.ZERO, style = GameUIComponentStyle.EMPTY, callbacks = {}, parent = null })
    {
        super({ center, dimension, style, callbacks, parent });
        
        this.text = text;

        this.expansion = 0.5;
        this.duration = 0.25;
    }

    update(dt)
    {
        if (this.state === GameUIComponentState.HOVERED)
        {
            this.animation += dt;
        }
        else
        {
            this.animation -= dt;
        }

        this.animation = MathFunction.clamp(this.animation, 0.0, this.duration);
    }

    render(dt)
    {
        const center = this.center;
        const animation = this.animation;
        const expansion = this.expansion;
        const dimension = this.dimension.multiplyScalar(1.0 + expansion*animation);
        const style = this.style;
        const text = this.text;

        const { fillStyle, strokeStyle, lineWidth, textStyle } = style;

        const customStroke = new Color(249, 8, 10, 1.0);
        const customLineWidth = 2;

        GameUtils.SAVE();
        GameUtils.FILL_STYLE(fillStyle.rgba);
        GameUtils.STROKE_STYLE(this.state === GameUIComponentState.DEFAULT ? strokeStyle.rgba : customStroke.rgba);
        GameUtils.LINE_WIDTH(this.state === GameUIComponentState.DEFAULT ? lineWidth.rgba : customLineWidth);
        GameUtils.BEGIN_PATH();
        GameUtils.RECT(center.x - dimension.x / 2, center.y - dimension.y / 2, dimension.x, dimension.y);
        GameUtils.FILL();
        GameUtils.STROKE();
        GameUtils.RESTORE();

        {
            const { fillStyle, strokeStyle, lineWidth, font, textAlign, textBaseline } = textStyle;

            const customFont = new Font(font.size * (1.0 + expansion*animation), font.family);

            GameUtils.SAVE();
            GameUtils.STROKE_STYLE(strokeStyle.rgba);
            GameUtils.FILL_STYLE(fillStyle.rgba);
            GameUtils.LINE_WIDTH(lineWidth);
            GameUtils.FONT(customFont.font);
            GameUtils.TEXT_ALIGN(textAlign);
            GameUtils.TEXT_BASELINE(textBaseline);
            GameUtils.TEXT(text, center.x, center.y);
            GameUtils.RESTORE();
        }
    }

    connect()
    {
        if (this.mouseMove)
        {
            GameUtils.CONTROLLER.addCallback(EventListenerType.MOUSEMOVE, this.mouseMove);
        }
    }

    disconnect()
    {
        if (this.mouseMove)
        {
            GameUtils.CONTROLLER.removeCallback(EventListenerType.MOUSEMOVE, this.mouseMove);
        }
    }
};