import { HtmlElements } from "../../utils/HtmlElements.mjs";
import { ElementContainer } from "./ElementContainer.mjs";
import { MainMenu } from "./MainMenu.mjs";

const canvas = HtmlElements.CANVAS;

export class Canvas extends ElementContainer {
    constructor(args) {
        super(args);

        this.x = 0;
        this.y = 0;
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
        this.parent = null;

        this.addWidget(new MainMenu({ 
            x: 0, 
            y: 0, 
            width: this.width, 
            height: this.height, 
            parent: this 
        }));
    }

    update() {
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

    paint() {
        this.painter
            .setStroke('rgba(0, 0, 0, 0.0)')
            .setFill('rgba(255, 255, 255, 1.0)')
            .drawRect(this.x, this.y, this.width, this.height);

        super.paint();
    }
};