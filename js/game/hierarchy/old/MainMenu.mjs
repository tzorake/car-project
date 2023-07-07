import { Button } from "./Button.mjs";
import { Buttons } from "./Buttons.mjs";
import { ElementContainer } from "./ElementContainer.mjs";

export class MainMenu extends ElementContainer {
    constructor(args) {
        super(args);

        const buttonWidth = 250;
        const buttonHeight = 50;
        const buttonGap = 50;

        const buttons = new Buttons({ 
            widgets: [
                new Button({
                    x: this.width / 2 - buttonWidth / 2,
                    y: this.height / 2 - buttonHeight / 2 - 2*(buttonHeight + buttonGap),
                    width: buttonWidth,
                    height: buttonHeight,
                    text: 'Singleplayer',
                }),
                new Button({
                    x: this.width / 2 - buttonWidth / 2,
                    y: this.height / 2 - buttonHeight / 2 - (buttonHeight + buttonGap),
                    width: buttonWidth,
                    height: buttonHeight,
                    text: 'Multiplayer',
                }),
                new Button({
                    x: this.width / 2 - buttonWidth / 2,
                    y: this.height / 2 - buttonHeight / 2,
                    width: buttonWidth,
                    height: buttonHeight,
                    text: 'Options',
                }),
                new Button({
                    x: this.width / 2 - buttonWidth / 2,
                    y: this.height / 2 - buttonHeight / 2 + (buttonHeight + buttonGap),
                    width: buttonWidth,
                    height: buttonHeight,
                    text: 'Quit',
                })
            ], 
            parent: this 
        });
        this.addWidget(buttons);
    }

    update() {
        if (this.parent != null) {
            const newWidth = this.parent.width;
            const newHeight = this.parent.height;

            if (newWidth !== this.width) {
                this.width = newWidth;
            }

            if (newHeight !== this.height) {
                this.height = newHeight;
            }
        }

        super.update();
    }

    paint() {
        this.painter
            .setStroke('rgba(0, 0, 0, 0.0)')
            .setFill('rgba(255, 0, 0, 1.0)')
            .drawRect(this.x, this.y, this.width, this.height);

        super.paint();
    }
};