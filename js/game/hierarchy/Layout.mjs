import { Painter } from "../../drawing/Painter.mjs";

export class Layout
{
    constructor({
        x = 0.0,
        y = 0.0,
        width = 0.0,
        height = 0.0,
        parent = null,
        widgets = [],
    }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.parent = parent;
        this.painter = new Painter();

        this.widgets = [];
        this.addWidgets(widgets);
    }

    update()
    {
        if (this.widgets != null) {
            this.widgets.forEach(widget => {
                widget.update();
            });
        }
    }

    paint()
    {
        if (this.widgets != null) {
            this.widgets.forEach(widget => {
                widget.paint();
            });
        }
    }

    addWidget(widget)
    {
        if (widget != null) {
            widget.parent = this;
            this.widgets.push(widget);
        }
    }

    addWidgets(widgets)
    {
        if (widgets != null) {
            widgets.forEach(widget => {
                this.addWidget(widget);
            });
        }
    }

    addLayout(layout)
    {
        if (layout != null) {
            this.widgets.push(layout);
        }
    }
};