import { GameUtils } from "../game/GameUtils.mjs";
import { EventListenerType } from "../game/GlobalGameController.mjs";
import { MathFunction } from "../math/MathFunction.mjs";
import { Vector2D } from "../math/Vector2D.mjs";
import { GameMenuElementState, rect, label } from "./GameMenuHelper.mjs";

export class GameMenuCard
{
    constructor({ text, cx, cy, styles, callbacks, parent })
    {
        this.cx = cx;
        this.cy = cy;
        this.w = GameMenuCard.SCALE.x;
        this.h = GameMenuCard.SCALE.y;

        this.animation = 0.0;
        this.duration = 4.0;

        this.text = text;
        this.styles = styles;
        this.state = GameMenuElementState.DEFAULT;
        this.fontSize = GameMenuCard.FONT_SIZE;
        this.parent = parent;

        if (callbacks)
        {
            const { mouseMove, mouseDown } = callbacks;
            if (mouseMove)
            {
                this.mouseMove = mouseMove.bind(this);
            }
            if (mouseDown)
            {
                this.mouseDown = mouseDown.bind(this);
            }
        }
    }

    connect()
    {
        if (this.mouseMove)
        {
            GameUtils.CONTROLLER.addCallback(EventListenerType.MOUSEMOVE, this.mouseMove);
        }
        if (this.mouseDown)
        {
            GameUtils.CONTROLLER.addCallback(EventListenerType.MOUSEDOWN, this.mouseDown);
        }
    }

    disconnect()
    {
        if (this.mouseMove)
        {
            GameUtils.CONTROLLER.removeCallback(EventListenerType.MOUSEMOVE, this.mouseMove);
        }
    }

    update(dt)
    {
        const scalar = 4.0;
        this.w = this.state === GameMenuElementState.EXPANDING ? 
            MathFunction.lerp(this.w, GameMenuCard.SCALE.x*GameMenuCard.SCALE_EXPANSION, scalar*dt):
            MathFunction.lerp(this.w, GameMenuCard.SCALE.x, scalar*dt);
        this.h = this.state === GameMenuElementState.EXPANDING ? 
            MathFunction.lerp(this.h, GameMenuCard.SCALE.y*GameMenuCard.SCALE_EXPANSION, scalar*dt) :
            MathFunction.lerp(this.h, GameMenuCard.SCALE.y, scalar*dt);
        this.fontSize = this.state === GameMenuElementState.EXPANDING ?
            MathFunction.lerp(this.fontSize, GameMenuCard.FONT_SIZE*GameMenuCard.SCALE_EXPANSION, scalar*dt) : 
            MathFunction.lerp(this.fontSize, GameMenuCard.FONT_SIZE, scalar*dt);

        if (this.state === GameMenuElementState.EXPANDING)
        {
            this.animation += dt;
            this.animation = MathFunction.clamp(this.animation, 0.0, 1.0);

            this.w = MathFunction.lerp(this.w, GameMenuCard.SCALE.x*GameMenuCard.SCALE_EXPANSION, this.animation / this.duration);
            this.h = MathFunction.lerp(this.h, GameMenuCard.SCALE.y*GameMenuCard.SCALE_EXPANSION, this.animation / this.duration);
            this.fontSize = MathFunction.lerp(this.fontSize, GameMenuCard.FONT_SIZE*GameMenuCard.SCALE_EXPANSION, this.animation / this.duration);
        }
        else
        {
            this.animation -= dt;
            this.animation = MathFunction.clamp(this.animation, 0.0, 1.0);

            this.w = MathFunction.lerp(this.w, GameMenuCard.SCALE.x, this.animation / this.duration);
            this.h = MathFunction.lerp(this.h, GameMenuCard.SCALE.y, this.animation / this.duration);
            this.fontSize = MathFunction.lerp(this.fontSize, GameMenuCard.FONT_SIZE, this.animation / this.duration);
        }
    }

    render(dt)
    {
        const text = this.text;
        const cx = this.cx;
        const cy = this.cy;
        const w = this.w;
        const h = this.h;
        const x  = Math.floor(cx - w/2);
        const y = Math.floor(cy - h/2);
        const styles = this.state === GameMenuElementState.EXPANDING ? this.STYLE_2 : this.STYLE_1;
        const fontSize = this.fontSize;

        rect(x, y, w, h, styles);
        label(text, x, y, w, h, { font: `${fontSize}px Roboto`, fillStyle: 'rgba(255, 255, 255, 0.75)' });
    }

    static get SCALE()
    {
        return new Vector2D(250, 400);
    }

    static get MARGIN()
    {
        return new Vector2D(100, 60);
    }

    static get FONT_SIZE()
    {
        return 24;
    }

    get STYLE_1()
    {
        const cx = this.cx;
        const cy = this.cy;
        const w = this.w;
        const h = this.h;
        const x  = Math.floor(cx - w/2);
        const y = Math.floor(cy - h/2);
        return {
            fillStyle: 'rgba(0, 0, 0, 0.75)',
            strokeStyle: 'rgba(0, 0, 0, 0.0)',//GameUtils.CREATE_LINEAR_GRADIENT(x, y, x, y + h, [{offset: 0.0, color: '#DADCE3'}, {offset: 0.5, color: '#CED0D6'}, {offset: 1.0, color: '#B0B2B8'}]),
            lineWidth: 2
        };
    }

    get STYLE_2()
    {
        return {
            fillStyle: 'rgba(0, 0, 0, 0.75)',
            strokeStyle: 'rgba(249, 8, 10, 1.0)',
            lineWidth: 4
        };
    }

    static get SCALE_EXPANSION()
    {
        return 1.2;
    }
};