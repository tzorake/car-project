import { GameMenu } from "../menu/GameMenu.mjs";
import { GameMenuTransition } from "../menu/GameMenuTransition.mjs";
import { GameUtils } from "./GameUtils.mjs";
import { GameWorld } from "./GameWorld.mjs";

export class GameLoop
{
    #step = function() 
    {
        const step = function(timestamp) 
        {
            if (this.startTimeStamp === null) 
            {
                this.startTimeStamp = timestamp;
            }

            if (this.previousTimeStamp != null && timestamp != null) 
            {
                const dt = (timestamp - this.previousTimeStamp) / GameUtils.SECOND_TO_MILLISECONDS;

                if (this.menuConnected)
                {
                    this.menu.update(dt);
                    this.menu.render(dt);
                }

                if (this.worldConnected)
                {
                    this.world.update(dt);
                    this.world.render(dt);
                }

                this.transition.update(dt);
                this.transition.render(dt);
            }

            this.previousTimeStamp = timestamp;

            if (!this.done) 
            {
                window.requestAnimationFrame(step);
            }
        }.bind(this);

        window.requestAnimationFrame(step);
    }.bind(this);

    constructor(objects) 
    {
        this.startTimeStamp = null;
        this.previousTimeStamp = null;
        this.done = false;

        this.menu = new GameMenu({ parent: this });
        this.world = new GameWorld({ objects: objects, parent: this });
        this.transition = new GameMenuTransition({ parent: this });

        const controller = GameUtils.CONTROLLER;
        controller.connect();

        this.menu.connect();
        this.menuConnected = true;

        this.worldConnected = false;
    }

    run()
    {
        window.requestAnimationFrame(this.#step);
    }
};