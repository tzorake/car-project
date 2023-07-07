import { Layout } from "./Layout.mjs";

export class VerticalLayout extends Layout
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

            widget.y = widgets.slice(0, index).reduce((cur, w) => cur + w.height, 0);
        });
        this.width = Math.max(...widgets.map(w => w.width));
        this.height = parent != null ? parent.height : widgets.reduce((cur, w) => cur + w.height, 0);
    
        widgets.forEach(widget => {
            widget.x += this.width / 2.0 - widget.width / 2.0;
        });

        if (parent != null) {
            const heightSum = widgets.reduce((cur, w) => cur + w.height, 0);

            widgets.forEach(widget => {
                widget.y += parent.height / 2.0 - heightSum / 2.0;
            });
        }
        
        super.update();
    }

    paint()
    {
        this.painter
            .push()
            .setStroke('rgba(0, 0, 0, 0.0)')
            .setFill('rgba(0, 0, 255, 0.25)')
            .drawRect(this.x, this.y, this.width, this.height)
            // .setStroke('rgba(0, 0, 0, 1.0)')
            // .setFill('rgba(0, 0, 0, 0.0)')
            // .drawRect(this.x, this.y, this.width, this.height)
            // .drawLine(this.x, this.y, this.x + this.width, this.y + this.height)
            // .drawLine(this.x + this.width, this.y, this.x, this.y + this.height)
            .pop();

        super.paint();
    }
};