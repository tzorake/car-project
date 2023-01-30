import { TypeChecker } from "../math/TypeChecker.mjs";

const SECOND_TO_MILLISECONDS = 1000;

export class GameLoop
{
    #startTimeStamp = null;
    #previousTimeStamp = null;
    #done = false;

    #world = null;

    #step = function() 
    {
        const step = function(timestamp) 
        {
            if (this.startTimeStamp === null) 
            {
                this.startTimeStamp = timestamp;
            }

            if (this.previousTimeStamp !== null) 
            {
                const dt = (timestamp - this.previousTimeStamp) / SECOND_TO_MILLISECONDS;

                this.world.update(dt);
                this.world.render();
            }

            this.previousTimeStamp = timestamp;

            if (!this.done) 
            {
                window.requestAnimationFrame(step);
            }
        }.bind(this);

        window.requestAnimationFrame(step);
    }.bind(this);

    constructor(world) 
    {
        if (!TypeChecker.isGameWorld(world))
        {
            throw new Error('GameLoop.constructor(world) : `world` has to be `GameWorld` type!');
        }

        this.#world = world;
    }

    get startTimeStamp() 
    {
        return this.#startTimeStamp;
    }

    set startTimeStamp(value) 
    {
        this.#startTimeStamp = value;
    }

    get previousTimeStamp() 
    {
        return this.#previousTimeStamp;
    }

    set previousTimeStamp(value) 
    {
        this.#previousTimeStamp = value;
    }

    get done() 
    {
        return this.#done;
    }

    set done(value) 
    {
        this.#done = value;
    }

    get world()
    {
        return this.#world;
    }

    start() 
    {
        if (!this.world)
        {
            throw new Error('GameLoop.start() : `world` has to be set before using the method!');
        }

        window.requestAnimationFrame(this.#step);
    }
};