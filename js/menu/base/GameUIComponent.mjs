import { Vector2 } from "../../math/Vector2.mjs";
import { GameUIComponentStyle } from "./GameUIComponentStyle.mjs";

export class GameUIComponent
{
    constructor({ center = Vector2.ZERO, dimension  = Vector2.ZERO, style = GameUIComponentStyle.EMPTY, parent = null })
    {
        this.center = center;
        this.dimension = dimension;
        this.style = style;
        this.parent = parent;
    }

    update(dt)
    {
        throw new Error('GameUIComponent.update(dt) is not implemented yet.');
    }

    render(dt)
    {
        throw new Error('GameUIComponent.render(dt) is not implemented yet.');
    }

    connect()
    {
        throw new Error('GameUIComponent.connect() is not implemented yet.');
    }

    disconnect()
    {
        throw new Error('GameUIComponent.disconnect() is not implemented yet.');
    }
};