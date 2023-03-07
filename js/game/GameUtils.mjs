import { Vector2 } from "../math/Vector2.mjs";
import { GlobalGameController } from "./GlobalGameController.mjs";

const BODY = document.querySelector('body');
const CANVAS = document.querySelector('.container .game-canvas');
const CONTEXT = CANVAS.getContext('2d');
const SCALE = 10;
const CONTROLLER = new GlobalGameController();
const SECOND_TO_MILLISECONDS = 1000;

export class GameUtils
{
    static SETUP_CANVAS()
    {
        CANVAS.width = BODY.clientWidth;
        CANVAS.height = BODY.clientHeight;
        CANVAS.style.width = `${BODY.clientWidth}px`;
        CANVAS.style.height = `${BODY.clientHeight}px`;

        const dpi = window.devicePixelRatio;
        CONTEXT.scale(dpi, dpi);
        CONTEXT.imageSmoothingEnabled = false;
    }

    static get CANVAS()
    {
        return CANVAS;
    }

    static get CONTEXT()
    {
        return CONTEXT;
    }

    static get SCALE()
    {
        return SCALE;
    }

    static get CONTROLLER()
    {
        return CONTROLLER;
    }

    static get SECOND_TO_MILLISECONDS()
    {
        return SECOND_TO_MILLISECONDS;
    }

    static get DEBUG()
    {
        return false;
    }

    static get DIMENSION()
    {
        return new Vector2(CANVAS.clientWidth, CANVAS.clientHeight);
    }

    static BEGIN_PATH()
    {
        CONTEXT.beginPath();
    }

    static CLOSE_PATH()
    {
        CONTEXT.closePath();
    }

    static MOVE_TO(x, y)
    {
        CONTEXT.moveTo(x, y); 
    }

    static LINE_TO(x, y)
    {
        CONTEXT.lineTo(x, y); 
    }



    static LINE(x0, y0, x1, y1)
    {
        GameUtils.SAVE();
        GameUtils.MOVE_TO(x0, y0); 
        GameUtils.LINE_TO(x1, y1);
        GameUtils.RESTORE();
    }

    static CIRCLE(x, y, r)
    {
        CONTEXT.arc(x, y, r, 0.0, 2*Math.PI);
    }

    static RECT(x, y, w, h)
    {
        CONTEXT.rect(x, y, w, h);
    }

    static TEXT(text, x, y)
    {
        CONTEXT.fillText(text, x, y);
        CONTEXT.strokeText(text, x, y);
    }

    static BACKGROUND(color) 
    {
        GameUtils.SAVE();
        CONTEXT.fillStyle = color;
        CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
        GameUtils.RESTORE();
    }



    static SAVE()
    {
        CONTEXT.save();
    }

    static RESTORE()
    {
        CONTEXT.restore();
    }

    static FILL(path)
    {   
        if (path)
        {
            CONTEXT.fill(path);
        }
        else
        {
            CONTEXT.fill();
        }
    }

    static STROKE()
    {
        CONTEXT.stroke();
    }



    static FILL_STYLE(color)
    {
        CONTEXT.fillStyle = color;
    }

    static STROKE_STYLE(color)
    {
        CONTEXT.strokeStyle = color;
    }

    static LINE_WIDTH(width)
    {
        CONTEXT.lineWidth = width;
    }

    static FILTER(filter)
    {
        CONTEXT.filter = filter;
    }

    static FONT(font)
    {
        CONTEXT.font = font;
    }

    static TEXT_ALIGN(align)
    {
        CONTEXT.textAlign = align;
    }

    static TEXT_BASELINE(baseline)
    {
        CONTEXT.textBaseline = baseline;
    }

    static CREATE_LINEAR_GRADIENT(x0, y0, x1, y1, colors)
    {
        // colors = [{offset, color}, ... , {offset, color}]
        const gradient = CONTEXT.createLinearGradient(x0, y0, x1, y1);
        colors.forEach(color => {
            gradient.addColorStop(color.offset, color.color);
        });
        return gradient;
    }

    static MEASURE_TEXT(text, styles)
    {
        GameUtils.SAVE();
        const { font } = styles;
        GameUtils.FONT(font);
        const textMetrics = CONTEXT.measureText(text);
        GameUtils.RESTORE();

        return textMetrics;
    }
}