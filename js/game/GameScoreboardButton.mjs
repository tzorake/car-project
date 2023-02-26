import { Vector2 } from "../math/Vector2.mjs";
import { label, rect } from "../menu/GameMenuHelper.mjs";
import { GameUtils } from "./GameUtils.mjs";
import { EventListenerType } from "./GlobalGameController.mjs";

export class GameScoreboardButton 
{
    constructor({ text, cx, cy, styles, callbacks, parent })
    {
        this.parent = parent;

        this.text = text;

        this.cx = cx;
        this.cy = cy;
        this.w = GameScoreboardButton.SCALE.x;
        this.h = GameScoreboardButton.SCALE.y;

        if (styles)
        {
            const { rectStyle, labelStyle } = styles;
            this.rectStyle = rectStyle;
            this.labelStyle = labelStyle;
            console.info(rectStyle, labelStyle)
        }

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

    update(dt)
    {

    }

    render(dt)
    {
        const text = this.text;
        const cx = this.cx;
        const cy = this.cy;
        const w = this.w;
        const h = this.h;
        const x  = Math.floor(cx - w / 2);
        const y = Math.floor(cy - h / 2);

        rect(x, y, w, h, this.rectStyle); // { fillStyle: 'rgba(2, 247, 131, 0.75)', strokeStyle: 'rgba(0, 0, 0, 0.0)' }
        label(text, x, y, w, h, this.labelStyle); // { font: '14px Roboto', fillStyle: 'rgba(255, 255, 255, 0.75)' }
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

        if (this.mouseDown)
        {
            GameUtils.CONTROLLER.removeCallback(EventListenerType.MOUSEDOWN, this.mouseDown);
        }
    }

    static get SCALE()
    {
        return new Vector2(200, 50);
    }
};