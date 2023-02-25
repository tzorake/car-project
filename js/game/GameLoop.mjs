import { DebugGameObject } from "../debug/DebugGameObject.mjs";
import { GameMenu } from "../menu/GameMenu.mjs";
import { GameMenuTransition } from "../menu/GameMenuTransition.mjs";
import { Track } from "../track/Track.mjs";
import { GameUtils } from "./GameUtils.mjs";
import { GameWorld } from "./GameWorld.mjs";
import { Player } from "./Player.mjs";

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

    constructor() 
    {
        this.startTimeStamp = null;
        this.previousTimeStamp = null;
        this.done = false;

        const canvas = GameUtils.CANVAS;
        const scale = GameUtils.SCALE;

        this.menu = new GameMenu({ parent: this });
        this.world = new GameWorld({ 
            objects: {
                player: new Player(),
                enemies: [
                    new DebugGameObject({ x: 10.0, y: 10.0, height: 5.0, width: 5.0 })
                ],
                track: new Track({ x: 0.0, y: 0.0, width: canvas.width / scale, height: canvas.height / scale }), 
            }, 
            parent: this 
        });
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