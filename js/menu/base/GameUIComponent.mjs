import { GameUtils } from "../../game/GameUtils.mjs";
import { Callback, EventListenerType } from "../../game/GlobalGameController.mjs";
import { MathFunction } from "../../math/MathFunction.mjs";
import { Vector2 } from "../../math/Vector2.mjs";
import { GameUIComponentState } from "./GameUIComponentState.mjs";
import { GameUIComponentStyle } from "./GameUIComponentStyle.mjs";

const CallbackNamePlacement = {};
CallbackNamePlacement[EventListenerType.MOUSEMOVE] = 'mouseMove';
CallbackNamePlacement[EventListenerType.MOUSEDOWN] = 'mouseDown';
CallbackNamePlacement[EventListenerType.MOUSEUP] = 'mouseUp';

export class GameUIComponent
{
    constructor({ center = Vector2.ZERO, dimension  = Vector2.ZERO, callbacks = {}, parent = null })
    {
        this.parent = parent;
        this.id = MathFunction.uuid();

        this.center = center;
        this.dimension = dimension;
        this.style = GameUIComponentStyle.EMPTY;
        this.callbacks = callbacks;

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

    // setCallback(type, callback)
    // {
    //     const contains = Object.entries(EventListenerType).map(item => item[1]).includes(type);
        
    //     if (contains)
    //     {
    //         const name = CallbackNamePlacement[type];
    //         this.callbacks[name] = callback;
    //     }
    // }

    connect()
    {
        // console.info(this.id, this.constructor.name);
        const id = this.id;
        const callbacks = this.callbacks;
        const controller = GameUtils.CONTROLLER;
        
        if (callbacks)
        {
            const { mouseMove, mouseUp, mouseDown } = callbacks;
            
            if (mouseMove)
            {
                const callback = mouseMove.bind(this);
                controller.addCallback(EventListenerType.MOUSEMOVE, id, callback);
            }

            if (mouseUp)
            {
                const callback = mouseUp.bind(this);
                controller.addCallback(EventListenerType.MOUSEUP, id, callback);
            }

            if (mouseDown)
            {
                const callback = mouseDown.bind(this);
                controller.addCallback(EventListenerType.MOUSEDOWN, id, callback);
            }
        }
    }

    disconnect()
    {
        const id = this.id;
        const callbacks = this.callbacks;
        const controller = GameUtils.CONTROLLER;
        
        if (callbacks)
        {
            const { mouseMove, mouseUp, mouseDown } = callbacks;
            
            if (mouseMove)
            {
                const callback = mouseMove.bind(this);
                controller.removeCallback(EventListenerType.MOUSEMOVE, id, callback);
            }

            if (mouseUp)
            {
                const callback = mouseUp.bind(this);
                controller.removeCallback(EventListenerType.MOUSEUP, id, callback);
            }

            if (mouseDown)
            {
                const callback = mouseDown.bind(this);
                controller.removeCallback(EventListenerType.MOUSEDOWN, id, callback);
            }
        }
    }
};