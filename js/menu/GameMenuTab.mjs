import { Vector2 } from "../math/Vector2.mjs";
import { GameMenuElementState, label, rect } from "./GameMenuHelper.mjs";

export class GameMenuTab
{
    constructor({ text, cx, cy, initialState, styles, parent})
    {
        this.cx = cx;
        this.cy = cy;
        this.w = GameMenuTab.SCALE.x;
        this.h = GameMenuTab.SCALE.y;

        this.text = text;
        this.state = initialState ? initialState : GameMenuElementState.DEFAULT;
        this.styles = styles;
        this.group = [];
        this.parent = parent;
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
        const styles = this.state === GameMenuElementState.DEFAULT ? this.STYLE_1 : this.STYLE_2;
        rect(x, y, w, h, styles);
        label(text, x, y, w, h, { font: '16px Roboto', fillStyle: 'rgba(255, 255, 255, 0.75)' });
    }

    static get SCALE()
    {
        return new Vector2(100, 30);
    }

    static get MARGIN()
    {
        return new Vector2(0, 100);
    }

    get STYLE_1()
    {
        return {
            fillStyle: 'rgba(0, 0, 0, 0.75)',
            strokeStyle: 'rgba(0, 0, 0, 0.0)',
            lineWidth: 2
        };
    }

    get STYLE_2()
    {
        return {
            fillStyle: 'rgba(249, 8, 10, 1.0)',
            strokeStyle: 'rgba(0, 0, 0, 0.0)',
            lineWidth: 2
        };
    }
};