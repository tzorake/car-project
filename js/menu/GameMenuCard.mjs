import { GameUtils } from "../game/GameUtils.mjs";
import { Color } from "../math/Color.mjs";
import { Font } from "../math/Font.mjs";
import { MathFunction } from "../math/MathFunction.mjs";
import { Vector2 } from "../math/Vector2.mjs";
import { GameUIComponent } from "./base/GameUIComponent.mjs";
import { GameUIComponentState } from "./base/GameUIComponentState.mjs";
import { GameUIComponentStyle } from "./base/GameUIComponentStyle.mjs";
import { GameUITextStyle } from "./base/GameUITextStyle.mjs";

export class GameMenuCard extends GameUIComponent
{
    constructor({ text = '', center = Vector2.ZERO, dimension = Vector2.ZERO, callbacks = {}, parent = null })
    {
        super({ center, dimension, callbacks, parent });
        
        this.text = text;

        this.expansion = 0.5;
        this.duration = 0.25;

        this.style = new GameUIComponentStyle({
            fillStyle: new Color(0, 0, 0, 0.75),
            strokeStyle: new Color(0, 0, 0, 0.0),
            lineWidth: 2,
            textStyle: new GameUITextStyle({
                fillStyle: new Color(255, 255, 255, 0.75),
                strokeStyle: new Color(0, 0, 0, 0.0),
                font: new Font(24, 'Roboto')
            })
        });
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
};