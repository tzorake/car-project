import { DrawingConstants } from "../../drawing/DrawingConstants.mjs";
import { Element } from "./Element.mjs";

export class Button extends Element
{
    constructor(args)
    {
        super(args);

        this.text = args.text;

        this.parentOldWidth = this.parent != null ? this.parent.width : undefined;
        this.parentOldHeight = this.parent != null ? this.parent.height : undefined;
    }

    update()
    {
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
    }

    paint()
    {
        this.painter
            .setStroke('rgba(0, 0, 0, 1.0)')
            .setFill('rgba(0, 0, 0, 0.55)')
            .drawRect(this.x, this.y, this.width, this.height)
            .setStroke('rgba(0, 0, 0, 0.0)')
            .setFill('rgba(255, 0, 0, 1.0)')
            .textSize(20)
            .textAlign(DrawingConstants.CENTER, DrawingConstants.CENTER)
            .drawText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
};