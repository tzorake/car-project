const BODY = document.querySelector('body');
const CANVAS = document.querySelector('.container .game-canvas');
const CONTEXT = CANVAS.getContext('2d');



export class GameUtils
{
    constructor()
    {

    }

    static setup()
    {
        // CANVAS.setAttribute('width',  `${BODY.clientWidth}px`);
        // CANVAS.setAttribute('height', `${BODY.clientHeight}px`);
        // CONTEXT.imageSmoothingEnabled = false;
    
        CANVAS.width = BODY.clientWidth;
        CANVAS.height = BODY.clientHeight;
        CANVAS.style.width = `${BODY.clientWidth}px`;
        CANVAS.style.height = `${BODY.clientHeight}px`;
        const dpi = window.devicePixelRatio;
        CANVAS.getContext('2d').scale(dpi, dpi);
    }

    static get CANVAS()
    {
        return CANVAS;
    }

    static get CONTEXT()
    {
        return CONTEXT;
    }

    static BACKGROUND(color) 
    {
        const canvas = GameUtils.CANVAS;
        const context = GameUtils.CONTEXT;

        context.fillStyle = color;
        context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    }
}