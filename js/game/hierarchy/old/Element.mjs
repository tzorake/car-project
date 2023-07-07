import { Painter } from "../../drawing/Painter.mjs";

export class Element
{
    constructor({ x = 0.0, y = 0.0, width = 0.0, height = 0.0, style = {}, parent = null })
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
        this.style = style;
        this.parent = parent;
        this.painter = new Painter();
    }

    topLeft()
    {
        return [this.x, this.y];
    }

    bottomRight()
    {
        return [this.x + this.width, this.y + this.height];
    }

    update()
    {
        throw new Error('Element.update() is not implemented yet!');
    }

    paint()
    {
        throw new Error('Element.update() is not implemented yet!');
    }
}