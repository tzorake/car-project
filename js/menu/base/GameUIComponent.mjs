import { Vector2 } from "../../math/Vector2.mjs";
import { GameUIComponentState } from "./GameUIComponentState.mjs";
import { GameUIComponentStyle } from "./GameUIComponentStyle.mjs";

export class GameUIComponent
{
    constructor({ center = Vector2.ZERO, dimension  = Vector2.ZERO, style = GameUIComponentStyle.EMPTY, callbacks = {}, parent = null })
    {
        this.parent = parent;

        this.center = center;
        this.dimension = dimension;
        this.style = style;

        if (callbacks)
        {
            const { mouseMove, mouseUp, mouseDown } = callbacks;
            
            if (mouseMove)
            {
                this.mouseMove = mouseMove.bind(this);
            }

            if (mouseUp)
            {
                this.mouseUp = mouseUp.bind(this);
            }

            if (mouseDown)
            {
                this.mouseDown = mouseDown.bind(this);
            }
        }

        this.state = GameUIComponentState.DEFAULT;
        this.animation = 0.0;
        this.duration = 1.0;
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