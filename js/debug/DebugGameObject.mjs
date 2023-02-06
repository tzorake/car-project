import { GameObject } from "../game/GameObject.mjs";
import { GameObjectRenderer } from "../game/GameObjectRenderer.mjs";
import { Rectangle } from "../math/Rectangle.mjs";
import { DebugInfo } from "./DebugInfo.mjs";

export class DebugGameObject extends GameObject
{
    #debugWidget = null;

    constructor(x, y, length, width)
    {
        super(x, y, length, width);

        this.renderer = new GameObjectRenderer(this);
        this.setProperty('focusable', true);

        this.#debugWidget = new DebugInfo(this, ['position'], new Rectangle(295, 10, 275, 200));
    }

    update(dt)
    {
        this.#debugWidget.update();
    }
}