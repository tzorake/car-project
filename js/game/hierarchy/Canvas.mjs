import { HtmlElements } from "../../utils/HtmlElements.mjs";
import { Element } from "./Element.mjs";
import { HorizontalLayout } from "./HorizontalLayout.mjs";
import { VerticalLayout } from "./VerticalLayout.mjs";

const canvas = HtmlElements.CANVAS;

export class Canvas extends Element
{
    constructor(args) 
    {
        super(args);

        const vl = new VerticalLayout({ 
            widgets: [
                new Element({ 
                    x: 0, 
                    y: 0, 
                    width: 100, 
                    height: 100,
                }),
                new Element({ 
                    x: 0, 
                    y: 0, 
                    width: 90, 
                    height: 80,
                }),
                new Element({ 
                    x: 50, 
                    y: 0, 
                    width: 150, 
                    height: 120,
                }),
            ],
            parent: this
        });

        const hl = new HorizontalLayout({
            parent: this
        });
        hl.addLayout(vl);

        this.setLayout(hl);
    }

    update()
    {
        const newWidth = canvas.clientWidth;
        const newHeight = canvas.clientHeight;

        if (newWidth !== this.width) {
            this.width = newWidth;
        }

        if (newHeight !== this.height) {
            this.height = newHeight;
        }

        super.update();
    }

    paint()
    {
        this.painter
            .push()
            .setStroke('rgba(0, 0, 0, 0.0)')
            .setFill('rgba(255, 255, 255, 1.0)')
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