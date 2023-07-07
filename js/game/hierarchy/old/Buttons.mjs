import { ElementContainer } from "./ElementContainer.mjs";

export class Buttons extends ElementContainer
{
    constructor(args)
    {
        super(args);
    }

    refresh()
    {
        const widgets = this.widgets;
        if (widgets != null) {
            this.x = Math.min(...widgets.map(widget => widget.x));
            this.y = Math.min(...widgets.map(widget => widget.y));
            this.width = Math.max(...widgets.map(widget => Math.max(widget.x + widget.width - this.x, widget.width)));
            this.height = Math.max(...widgets.map(widget => Math.max(widget.y + widget.height - this.y, widget.height)));
        }
    }

    update()
    {
        this.refresh();

        if (this.parent != null) {
            const newWidth = this.parentOldWidth;
            const newHeight = this.parentOldHeight;

            console.info('widget', newWidth, newHeight);
    
            if (newWidth != null && newHeight != null) {
                if (newWidth !== this.parent.width) {
                    this.x = newWidth / 2 - this.width / 2;
                }
        
                if (newHeight !== this.parent.height) {
                    this.y = newHeight / 2 - this.height / 2;
                }
            }
    
            this.parentOldWidth = this.parent.width;
            this.parentOldHeight = this.parent.height;
        }

        // super.update();
    }

    paint()
    {
        this.painter
            .setStroke('rgba(0, 0, 0, 1.0)')
            .drawRect(this.x, this.y, this.width, this.height)
            .drawLine(this.x, this.y, this.x + this.width, this.y + this.height)
            .drawLine(this.x + this.width, this.y, this.x, this.y + this.height);
        
        super.paint();
    }

    addWidget(widget)
    {
        super.addWidget(widget);
    }
};