import { HtmlElements } from "../utils/HtmlElements.mjs";
import { DrawingConstants } from "./DrawingConstants.mjs";

const styleEmpty = 'rgba(0,0,0,0)';

export class Painter 
{
    #textSize = 12;
    #textLeading = 15;
    #textFont = 'sans-serif';
    #textStyle = DrawingConstants.NORMAL;
    #textAlign = DrawingConstants.LEFT;
    #textBaseline = DrawingConstants.BASELINE;
    #textWrap = DrawingConstants.WORD;
    #doStroke = true;
    #doFill = true;
    #leadingSet = false;
    #strokeSet = false;
    #fillSet = false;

    constructor()
    {
        this.drawingContext = HtmlElements.CONTEXT;
    }

    textSize(...args) 
    {
        const s = args[0];
        if (typeof s === 'number') {
            this.#textSize = s;
            if (!this.#leadingSet) {
                this.#textLeading = s * DrawingConstants.DEFAULT_LEADMULT;
            }

            return this.#applyTextProperties();
        }

        return this.#textSize;
    };

    textLeading(...args)
    {
        const l = args[0];
        if (typeof l === 'number') {
            this.#leadingSet = true;
            this.#textLeading = l;
            return this;
        }

        return this.#textLeading;
    }

    textFont(...args)
    {
        const f = args[0];
        if (typeof f === 'string') {
            this.#textFont = f;
            return this;
        }

        return this.#textFont;
    }

    textStyle(...args)
    {
        const s = args[0];
        if (s) {
            if (s === DrawingConstants.NORMAL || s === DrawingConstants.ITALIC || s === DrawingConstants.BOLD || s === DrawingConstants.BOLDITALIC) {
                this.#textStyle = s;
            }

            return this.#applyTextProperties();
        }

        return this.#textStyle;
    };

    textAlign(...args)
    {
        const h = args[0];
        if (typeof h !== 'undefined') {
            this.#textAlign = h;

            const v = args[1];
            if (typeof v !== 'undefined') {
                this.#textBaseline = v;
            }

            return this.#applyTextProperties();
        }
        return {
            horizontal: this.#textAlign,
            vertical: this.#textBaseline
        };
    };

    #applyTextProperties()
    {
        this.drawingContext.font = `${this.#textStyle || 'normal'} ${this.#textSize || 12}px ${this.#textFont || 'sans-serif'}`;
        this.drawingContext.textAlign = this.#textAlign;
        if (this.#textBaseline === DrawingConstants.CENTER) {
            this.drawingContext.textBaseline = DrawingConstants.CTX_MIDDLE;
        }
        else {
            this.drawingContext.textBaseline = this.#textBaseline;
        }

        return this;
    }

    textWrap(...args)
    {
        const w = args[0];
        if (typeof w !== 'undefined') {
            this.#textWrap = w;

            return this;
        }
        
        return this.#textWrap;
    };

    strokeWeight(...args)
    {
        if (typeof args[0] === 'undefined' || args[0] === 0) {
            this.drawingContext.lineWidth = 0.0001;
        } else {
            this.drawingContext.lineWidth = w;
        }
        return this;
    };

    getStroke() 
    {
        return this.drawingContext.strokeStyle;
    }

    setStroke(s)
    {
        this.drawingContext.strokeStyle = s;
        this.#strokeSet = true;
        return this;
    }

    getFill()
    {
        return this.drawingContext.fillStyle;
    }

    setFill(s)
    {
        this.drawingContext.fillStyle = s;
        this.#fillSet = true;
        return this;
    }

    drawLine(x1, y1, x2, y2)
    {
        if (!this.#doStroke) {
            return this;
        } else if (this.getStroke() === styleEmpty) {
            return this;
        }

        this.drawingContext.beginPath();
        this.drawingContext.moveTo(x1, y1);
        this.drawingContext.lineTo(x2, y2);
        this.drawingContext.stroke();

        return this;
    }

    drawEllipse(...args) 
    {
        const ctx = this.drawingContext;
        const doFill = this.#doFill;
        const doStroke = this.#doStroke;
        const x = parseFloat(args[0]);
        const y = parseFloat(args[1]);
        const w = parseFloat(args[2]);
        const h = parseFloat(args[3]);
        if (doFill && !doStroke) {
            if (this.getFill() === styleEmpty) {
                return this;
            }
        } else if (!doFill && doStroke) {
            if (this.getStroke() === styleEmpty) {
                return this;
            }
        }
        const kappa = 0.5522847498;
        const ox = w / 2 * kappa;
        const oy = h / 2 * kappa;
        const xe = x + w;
        const ye = y + h;
        const xm = x + w / 2;
        const ym = y + h / 2;
        ctx.beginPath();
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        if (doFill) {
            ctx.fill();
        }
        if (doStroke) {
            ctx.stroke();
        }

        return this;
    }

    drawPoint(x, y)
    {
        const s = this.drawingContext.fillStyle;

        this.setFill(s);
        this.drawingContext.beginPath();
        this.drawingContext.arc(x, y, ctx.lineWidth / 2, 0, DrawingConstants.TWO_PI, false);
        this.drawingContext.fill();

        return this;
    }

    drawRect(...args)
    {
        const x = args[0];
        const y = args[1];
        const w = args[2];
        const h = args[3];
        let tl = args[4];
        let tr = args[5];
        let br = args[6];
        let bl = args[7];
        const ctx = this.drawingContext;
        const doFill = this.#doFill;
        const doStroke = this.#doStroke;
        if (doFill && !doStroke) {
            if (this.getFill() === styleEmpty) {
                return this;
            }
        }
        else if (!doFill && doStroke) {
            if (this.getStroke() === styleEmpty) {
                return this;
            }
        }
        ctx.beginPath();

        if (typeof tl === 'undefined') {
            ctx.rect(x, y, w, h);
        }
        else {
            if (typeof tr === 'undefined') {
                tr = tl;
            }
            if (typeof br === 'undefined') {
                br = tr;
            }
            if (typeof bl === 'undefined') {
                bl = br;
            }

            const absW = Math.abs(w);
            const absH = Math.abs(h);
            const hw = absW / 2;
            const hh = absH / 2;

            if (absW < 2 * tl) {
                tl = hw;
            }
            if (absH < 2 * tl) {
                tl = hh;
            }
            if (absW < 2 * tr) {
                tr = hw;
            }
            if (absH < 2 * tr) {
                tr = hh;
            }
            if (absW < 2 * br) {
                br = hw;
            }
            if (absH < 2 * br) {
                br = hh;
            }
            if (absW < 2 * bl) {
                bl = hw;
            }
            if (absH < 2 * bl) {
                bl = hh;
            }

            ctx.beginPath();
            ctx.moveTo(x + tl, y);
            ctx.arcTo(x + w, y, x + w, y + h, tr);
            ctx.arcTo(x + w, y + h, x, y + h, br);
            ctx.arcTo(x, y + h, x, y, bl);
            ctx.arcTo(x, y, x + w, y, tl);
            ctx.closePath();
        }
        if (this.#doFill) {
            ctx.fill();
        }
        if (this.#doStroke) {
            ctx.stroke();
        }

        return this;
    }

    drawText(str, x, y)
    {
        let lines;

        if (!(this.#doFill || this.#doStroke)) {
            return this;
        }

        if (typeof str === 'undefined') {
            return this;
        }
        else if (typeof str !== 'string') {
            str = str.toString();
        }

        str = str.replace(/(\t)/g, '  ');
        lines = str.split('\n');

        let offset = 0;
        if (this.#textBaseline === DrawingConstants.CENTER) {
            offset = (lines.length - 1) * this.textLeading() / 2;
        }
        else if (this.#textBaseline === DrawingConstants.BOTTOM) {
            offset = (lines.length - 1) * this.textLeading();
        }

        for (let i = 0; i < lines.length; i++) {
            this.#renderText(
                lines[i],
                x,
                y - offset,
            );
            y += this.textLeading();
        }

        return this;
    }

    #renderText(line, x, y)
    {
        this.push();

        if (this.#doStroke && this.#strokeSet) {
            this.drawingContext.strokeText(line, x, y);
        }

        if (this.#doFill) {
            if (!this.#fillSet) {
                this.setFill(DrawingConstants.DEFAULT_TEXT_FILL);
            }

            this.drawingContext.fillText(line, x, y);
        }

        this.pop();

        return this;
    };

    fontMetrics()
    {

    }

    push()
    {
        this.drawingContext.save();
        return this;
    }

    pop()
    {
        this.drawingContext.restore();
        return this;
    }
};