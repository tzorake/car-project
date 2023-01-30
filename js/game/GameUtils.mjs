const BODY = document.querySelector('body');
const CANVAS = document.querySelector('.container .game-canvas');
const CONTEXT = CANVAS.getContext('2d');
const SCALE = 10;


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

    static BACKGROUND(color) 
    {
        const canvas = GameUtils.CANVAS;
        const context = GameUtils.CONTEXT;

        context.fillStyle = color;
        context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    }
}