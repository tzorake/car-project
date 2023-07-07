import { Painter } from "../../drawing/Painter.mjs";

export class Element
{
    constructor({
        x = 0.0,
        y = 0.0,
        width = 0.0,
        height = 0.0,
        style = {},
        parent = null,
    }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.style = style;
        this.parent = parent;
        this.painter = new Painter();

        this.layout = null;
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
        if (this.layout != null) {
            this.layout.update();
        }
    }

    paint()
    {
        const x = this.x + (this.parent != null ? this.parent.x : 0);
        const y = this.y + (this.parent != null ? this.parent.y : 0);

        this.painter
            .push()
            .setStroke('rgba(0, 0, 0, 1.0)')
            .setFill('rgba(0, 0, 0, 0.0)')
            .drawRect(x, y, this.width, this.height)
            .drawLine(x, y, x + this.width, y + this.height)
            .drawLine(x + this.width, y, x, y + this.height)
            .pop();
        
        if (this.layout != null) {
            this.layout.paint();
        }
    }

    setLayout(layout)
    {
        layout.parent = this;
        this.layout = layout;
    }
}