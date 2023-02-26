import { GameUtils } from "../game/GameUtils.mjs";
import { MathFunction } from "../math/MathFunction.mjs";
import { Vector2 } from "../math/Vector2.mjs";
import { rect } from "./GameMenuHelper.mjs";

let iota = 0;
export const TransitionState = {};
TransitionState.DEFAULT = iota++;
TransitionState.FORWARD_STARTED = iota++;
TransitionState.FORWARD_ENDED = iota++;
TransitionState.BACKWARD_STARTED = iota++;
TransitionState.BACKWARD_ENDED = iota++;
TransitionState.DELAY = iota++;

// --->  *  <--- forward
// <---  *  ---> backward

export class GameMenuTransition
{
    constructor({ parent })
    {
        this.parent = parent;

        this.w = GameMenuTransition.SCALE.x / 2;
        this.h = GameMenuTransition.SCALE.y / 2;

        this.animation = 0.0;
        this.duration = 1.0;

        this.state = TransitionState.BACKWARD_STARTED;
        this.callback = null;
    }

    update(dt)
    {
        if(this.state === TransitionState.FORWARD_STARTED)
        {
            this.animation += dt;
            this.animation = MathFunction.clamp(this.animation, 0.0, this.duration);

            this.w = MathFunction.lerp(this.w, GameMenuTransition.SCALE.x / 2, this.animation / this.duration);
            this.h = MathFunction.lerp(this.h, GameMenuTransition.SCALE.y / 2, this.animation / this.duration);

            this.w = MathFunction.clamp(this.w, 0.0, GameMenuTransition.SCALE.x / 2);
            this.h = MathFunction.clamp(this.h, 0.0, GameMenuTransition.SCALE.y / 2);

            if (this.animation === this.duration)
            {
                this.state = TransitionState.FORWARD_ENDED;
                this.animation = 0.0;

                if (this.callback)
                {
                    this.callback();
                    this.callback = null;
                }
            }
        }
        
        if (this.state === TransitionState.BACKWARD_STARTED)
        {
            this.animation += dt;
            this.animation = MathFunction.clamp(this.animation, 0.0, this.duration);

            this.w = MathFunction.lerp(this.w, 0.0, this.animation / this.duration);
            this.h = MathFunction.lerp(this.h, 0.0, this.animation / this.duration);

            this.w = MathFunction.clamp(this.w, 0.0, GameMenuTransition.SCALE.x / 2);
            this.h = MathFunction.clamp(this.h, 0.0, GameMenuTransition.SCALE.y / 2);

            if (this.animation === this.duration)
            {
                this.state = TransitionState.BACKWARD_ENDED;
                this.animation = 0.0;

                if (this.callback)
                {
                    this.callback();
                    this.callback = null;
                }
            }
        }

        if (this.state === TransitionState.DELAY)
        {
            this.animation += dt;

            this.animation = MathFunction.clamp(this.animation, 0.0, this.duration);

            if (this.animation === this.duration)
            {
                this.state = TransitionState.BACKWARD_ENDED;
                this.animation = 0.0;

                if (this.callback)
                {
                    this.callback();
                    this.callback = null;
                }
            }
        }
    }

    render(dt)
    {
        rect(0, 0, GameMenuTransition.SCALE.x, this.h, {
            fillStyle: 'rgba(0, 0, 0, 1.0)',
            strokeStyle: 'rgba(0, 0, 0, 0.0)'
        });

        rect(0, 0, this.w, GameMenuTransition.SCALE.y, {
            fillStyle: 'rgba(0, 0, 0, 1.0)',
            strokeStyle: 'rgba(0, 0, 0, 0.0)'
        });

        rect(0, GameMenuTransition.SCALE.y - this.h - 1, GameMenuTransition.SCALE.x, GameMenuTransition.SCALE.y, {
            fillStyle: 'rgba(0, 0, 0, 1.0)',
            strokeStyle: 'rgba(0, 0, 0, 0.0)'
        });

        rect(GameMenuTransition.SCALE.x - this.w - 1, 0, GameMenuTransition.SCALE.x, GameMenuTransition.SCALE.y, {
            fillStyle: 'rgba(0, 0, 0, 1.0)',
            strokeStyle: 'rgba(0, 0, 0, 0.0)'
        });
    }

    forward({ callback })
    {
        this.setState(TransitionState.FORWARD_STARTED, callback);
    }

    backward({ callback })
    {
        this.setState(TransitionState.BACKWARD_STARTED, callback);
    }

    setState(state, callback)
    {
        switch (state)
        {
            case TransitionState.DEFAULT:
            {

            } break;
            case TransitionState.FORWARD_STARTED:
            {
                if (this.state === TransitionState.DEFAULT || this.state === TransitionState.BACKWARD_ENDED)
                {
                    this.state = state;
                    this.callback = callback;
                }
            } break;
            case TransitionState.FORWARD_ENDED:
            {
                if (this.state === TransitionState.FORWARD_STARTED)
                {
                    this.state = state;
                }
            } break;
            case TransitionState.BACKWARD_STARTED:
            {
                if (this.state === TransitionState.FORWARD_ENDED)
                {
                    this.state = state;
                }
            } break;
            case TransitionState.BACKWARD_ENDED:
            {
                if (this.state === TransitionState.BACKWARD_STARTED)
                {
                    this.state = state;
                }
            } break;
        }
    }

    static get SCALE()
    {
        return new Vector2(GameUtils.CANVAS.width, GameUtils.CANVAS.height);
    }
};