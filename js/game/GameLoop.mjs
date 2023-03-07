import { GameMenu } from "../menu/GameMenu.mjs";
import { GameMenuBackground } from "../menu/GameMenuBackground.mjs";
import { GameUtils } from "./GameUtils.mjs";

class GameLoopState
{
    constructor()
    {
        this.start    = null;
        this.previous = null;
        this.done     = false;
    }
};

export class GameLoop
{
    #step = function() 
    {
        const step = function(timestamp) 
        {
            const state = this.state;

            if (state.start === null) 
            {
                state.start = timestamp;
            }

            if (state.previous !== null)
            {
                const dt = (timestamp - state.previous) / GameUtils.SECOND_TO_MILLISECONDS;

                const menu = this.menu;
                menu.update(dt);
                menu.render(dt);
            }

            state.previous = timestamp;

            if (!state.done)
            {
                window.requestAnimationFrame(step);
            }
        }.bind(this);

        window.requestAnimationFrame(step);
    }.bind(this);

    constructor() 
    {
        this.state = new GameLoopState();
        this.menu = new GameMenu({ 
            parent: this
        });
    }

    run()
    {
        this.menu.connect();

        const controller = GameUtils.CONTROLLER;
        controller.connect();

        window.requestAnimationFrame(this.#step);
    }
};