import { DebugInfo } from "../debug/DebugInfo.mjs";
import { Rectangle } from "../math/Rectangle.mjs";
import { GameUtils } from "./GameUtils.mjs";
import { EventListenerType } from "./GlobalGameController.mjs";

import { GameObjectController } from "./GameObjectController.mjs";

let iota = 0;
export const GameCameraAction = {};
GameCameraAction.NEXT = iota++;

class State
{
    constructor()
    {
        this.index = -1;
        this.time = 0;
    }

    toString()
    {
        return `{\n\tindex: ${this.index}\n\ttime: ${this.time}\n}`;
    }
};

class Action
{
    constructor()
    {
        this.keyPressed = {};
        this.keyPressed[GameCameraAction.NEXT]   = false;
    }

    toString()
    {
        return `{\n\tNEXT: ${this.keyPressed[GameCameraAction.NEXT]}\n}`;
    }
};

const GameCameraActionKeyMapping = {};
GameCameraActionKeyMapping[GameCameraAction.NEXT] = ['KeyP'];

export class GameCameraController extends GameObjectController
{
    #actions = new Action();
    #state = new State();

    #debugWidget = null;

    #keyDown = event => {
        throw new Error('GameObjectController.keyDown(event) : The method is not implemented yet!');
    };
    #keyUp = event => {
        throw new Error('GameObjectController.keyUp(event) : The method is not implemented yet!');
    }

    constructor(gameObject)
    {
        super(gameObject);

        this.#keyDown = event => {
            const keyCode = event.code;
            
            const next = GameCameraActionKeyMapping[GameCameraAction.NEXT].find(key => key === keyCode)
            if (next) 
            {
                this.actions.keyPressed[GameCameraAction.NEXT] = true;
            }
            
        };
        this.#keyUp = event => {
            const keyCode = event.code;

            const next = GameCameraActionKeyMapping[GameCameraAction.NEXT].find(key => key === keyCode)
            if (next) 
            {
                this.actions.keyPressed[GameCameraAction.NEXT] = false;
            }
        };

        this.#debugWidget = new DebugInfo(this, ['actions', 'state'], new Rectangle(10, 640, 275, 200));
    }

    connect()
    {
        const controller = GameUtils.CONTROLLER;
        controller.addCallback(EventListenerType.KEYDOWN, this.#keyDown);
        controller.addCallback(EventListenerType.KEYUP,   this.#keyUp);
    }

    disconnect()
    {
        const controller = GameUtils.CONTROLLER;
        controller.removeCallback(EventListenerType.KEYDOWN, this.#keyDown);
        controller.removeCallback(EventListenerType.KEYUP,   this.#keyUp);
    }

    update(dt)
    {
        const camera = this.gameObject;
        const actions = this.actions;
        const state = this.state;
        const world = camera.world;
        const objects = world.objects;

        if (state.index < 0)
        {
            state.index = objects.findIndex(item => item.getProperty('focusable'));
            camera.target = objects[state.index];
        }

        const focusable = objects.filter(item => item.getProperty('focusable'));

        if (actions.keyPressed[GameCameraAction.NEXT] && state.time > 5.0)
        {
            state.index += 1;
            state.time = 0;

            if (state.index >= focusable.length)
            {
                state.index = 0;
            }

            camera.target = focusable[state.index];
        }
        
        if (state.time < 5.0)
        {
            state.time += dt;
        }

        this.#debugWidget.update();
    }

    get actions()
    {
        return this.#actions;
    }

    set actions(value)
    {
        this.#actions = value;
    }

    get state()
    {
        return this.#state;
    }

    set state(value)
    {
        this.#state = value;
    }
}