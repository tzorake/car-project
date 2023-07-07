import { Element } from "./Element.mjs";

export class ElementContainer extends Element
{
    constructor({ widgets = [] })
    {
        super(arguments[0]);
        
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
};