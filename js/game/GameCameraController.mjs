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
    #debugWidget = null;

    #keyDown = event => {
        throw new Error('GameObjectController.keyDown(event) : The method is not implemented yet!');
    };
    #keyUp = event => {
        throw new Error('GameObjectController.keyUp(event) : The method is not implemented yet!');
    }

    constructor({ parent })
    {
        super({ parent });

        this.actions = new Action();
        this.state = new State();

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

        if (GameUtils.DEBUG)
        {
            this.#debugWidget = new DebugInfo({
                props: ['actions', 'state'],
                rect: new Rectangle(10, 640, 275, 200), 
                parent: this
            });
        }
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
        const actions = this.actions;
        const state = this.state;

        const camera = this.parent;

        const world = camera.world;
        const player = world.player;

        const track = world.track;
        const car = player.car;
        const enemies = world.enemies;

        const pool = [car].concat(enemies);

        if (state.index < 0)
        {
            state.index = pool.findIndex(item => item.getProperty('focusable'));
            camera.target = pool[state.index];
        }

        const focusable = pool.filter(item => item.getProperty('focusable'));

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

        if (GameUtils.DEBUG)
        {
            this.#debugWidget.update();
        }
    }
}