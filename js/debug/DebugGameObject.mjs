import { GameObject } from "../game/GameObject.mjs";
import { GameObjectRenderer } from "../game/GameObjectRenderer.mjs";
import { Rectangle } from "../math/Rectangle.mjs";
import { DebugInfo } from "./DebugInfo.mjs";

export class DebugGameObject extends GameObject
{
    #debugWidget = null;

    constructor({ x, y, width, height })
    {
        super({ x, y, width, height });

        this.renderer = new GameObjectRenderer({ parent: this });
        
        this.setProperty('focusable', true);

        this.#debugWidget = new DebugInfo({
            props: ['position'], 
            rect: new Rectangle(295, 10, 275, 200), 
            parent: this
        });
    }

    update(dt)
    {
        this.#debugWidget.update();
    }
}