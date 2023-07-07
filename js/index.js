import { QString } from "./utils/QString.mjs";
import { HtmlElements } from "./utils/HtmlElements.mjs";
import { GameLoop } from "./game/GameLoop.mjs";

const body = HtmlElements.BODY;
const canvas = HtmlElements.CANVAS;
const context = HtmlElements.CONTEXT;

function resize()
{
    canvas.width = body.clientWidth;
    canvas.height = body.clientHeight;
    canvas.style.width = new QString("%1px").arg(body.clientWidth).toString();
    canvas.style.height = new QString("%1px").arg(body.clientHeight).toString();

    const dpi = window.devicePixelRatio;
    context.scale(dpi, dpi);
    context.imageSmoothingEnabled = false;
}

resize();
window.addEventListener('resize', resize);

new GameLoop().start();