import { Layout } from "./Layout.mjs";

export class HorizontalLayout extends Layout
{
    constructor(args) 
    {
        super(args);
    }

    update()
    {
        const parent = this.parent;
        const widgets = this.widgets;

        widgets.forEach(widget => {
            widget.x = 0;
            widget.y = 0;
        });
        widgets.forEach((widget, index) => {
            if (index === 0) {
                return;
            }

            widget.x = widgets.slice(0, index).reduce((cur, w) => cur + w.width, 0);
        });
        this.width = parent != null ? parent.width : widgets.reduce((cur, w) => cur + w.width, 0);
        this.height = Math.max(...widgets.map(w => w.height));

        if (parent != null) {
            const widthSum = widgets.reduce((cur, w) => cur + w.width, 0);

            widgets.forEach(widget => {
                widget.x += parent.width / 2.0 - widthSum / 2.0;
            });
        }

        widgets.forEach(widget => {
            widget.y += this.height / 2.0 - widget.height / 2.0;
        });

        super.update();
    }

    paint()
    {
        const x = this.x + (this.parent != null ? this.parent.x : 0);
        const y = this.y + (this.parent != null ? this.parent.y : 0);

        this.painter
            .push()
            .setStroke('rgba(0, 0, 0, 0.0)')
            .setFill('rgba(255, 0, 0, 0.25)')
            .drawRect(x, y, this.width, this.height)
            // .setStroke('rgba(0, 0, 0, 1.0)')
            // .setFill('rgba(0, 0, 0, 0.0)')
            // .drawRect(x, y, this.width, this.height)
            // .drawLine(x, y, x + this.width, y + this.height)
            // .drawLine(x + this.width, y, x, y + this.height)
            .pop();

        super.paint();
    }
};