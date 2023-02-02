import { DebugInfo } from "../debug/DebugInfo.mjs";
import { GameObjectController } from "../game/GameObjectController.mjs";
import { MathFunction } from "../math/MathFunction.mjs";
import { Rectangle } from "../math/Rectangle.mjs";

let iota = -1;
export const DirectionState = {};
DirectionState.NEGATIVE = iota++;
DirectionState.ZERO = iota++;
DirectionState.POSITIVE = iota++;

iota = 0;
export const CarAction = {};
CarAction.THROTTLE = iota++;
CarAction.TURN_LEFT = iota++;
CarAction.REVERSE = iota++;
CarAction.TURN_RIGHT = iota++;
CarAction.BRAKE = iota++;

export const LERP_DELTA = 1e-3;
export const LERP_T = 5e-1;

class Direction
{
    constructor(vertical, horizontal) 
    {
        this.vertical = vertical | 0;
        this.horizontal = horizontal | 0;
    }

    toString()
    {
        return `{\n\tvertical: ${this.vertical.toFixed(2)},\n\thorizontal: ${this.horizontal.toFixed(2)}\n}`;
    }
}

class Action
{
    constructor()
    {
        this.keyPressed = {};
        this.keyPressed[CarAction.THROTTLE]   = false;
        this.keyPressed[CarAction.TURN_LEFT]  = false;
        this.keyPressed[CarAction.REVERSE]    = false;
        this.keyPressed[CarAction.TURN_RIGHT] = false;
        this.keyPressed[CarAction.BRAKE]      = false;
    }

    toString()
    {
        return `{\n\tTHROTTLE: ${this.keyPressed[CarAction.THROTTLE]}\n\tTURN_LEFT: ${this.keyPressed[CarAction.TURN_LEFT]}\n\tREVERSE: ${this.keyPressed[CarAction.REVERSE]}\n\tTURN_RIGHT: ${this.keyPressed[CarAction.TURN_RIGHT]}\n\tBRAKE: ${this.keyPressed[CarAction.BRAKE]}\n}`;
    }
}

const CarObjectKeyMapping = {};
CarObjectKeyMapping[CarAction.THROTTLE]   = ['KeyW', 'ArrowUp'];
CarObjectKeyMapping[CarAction.TURN_LEFT]  = ['KeyA', 'ArrowLeft']
CarObjectKeyMapping[CarAction.REVERSE]    = ['KeyS', 'ArrowDown']
CarObjectKeyMapping[CarAction.TURN_RIGHT] = ['KeyD', 'ArrowRight']
CarObjectKeyMapping[CarAction.BRAKE]      = ['Space']

export class CarObjectController extends GameObjectController
{
    #direction = new Direction();
    #actions = new Action();

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
            
            const throttle = CarObjectKeyMapping[CarAction.THROTTLE].find(key => key === keyCode)
            if (throttle) 
            {
                this.actions.keyPressed[CarAction.THROTTLE] = true;

                if (Math.abs(this.direction.horizontal - DirectionState.POSITIVE) > LERP_DELTA)
                {
                    this.direction.horizontal = MathFunction.lerp(this.direction.horizontal, DirectionState.POSITIVE, LERP_T);
                }
                else
                {
                    this.direction.horizontal = DirectionState.POSITIVE;
                }
            }

            const reverse = CarObjectKeyMapping[CarAction.REVERSE].find(key => key === keyCode)
            if (reverse) 
            {
                this.actions.keyPressed[CarAction.REVERSE] = true;
                
                if (Math.abs(this.direction.horizontal - DirectionState.NEGATIVE) > LERP_DELTA)
                {
                    this.direction.horizontal = MathFunction.lerp(this.direction.horizontal, DirectionState.NEGATIVE, LERP_T);
                }
                else
                {
                    this.direction.horizontal = DirectionState.NEGATIVE;
                }
            }

            const turnLeft = CarObjectKeyMapping[CarAction.TURN_LEFT].find(key => key === keyCode)
            if (turnLeft) 
            {
                this.actions.keyPressed[CarAction.TURN_LEFT] = true;

                if (Math.abs(this.direction.vertical - DirectionState.NEGATIVE) > LERP_DELTA)
                {
                    this.direction.vertical = MathFunction.lerp(this.direction.vertical, DirectionState.NEGATIVE, LERP_T);
                }
                else
                {
                    this.direction.vertical = DirectionState.NEGATIVE;
                }
            }
        
            const turnRight = CarObjectKeyMapping[CarAction.TURN_RIGHT].find(key => key === keyCode)
            if (turnRight) 
            {
                this.actions.keyPressed[CarAction.TURN_RIGHT] = true;

                if (Math.abs(this.direction.vertical - DirectionState.POSITIVE) > LERP_DELTA)
                {
                    this.direction.vertical = MathFunction.lerp(this.direction.vertical, DirectionState.POSITIVE, LERP_T);
                }
                else
                {
                    this.direction.vertical = DirectionState.POSITIVE;
                }
            }
        };
        this.#keyUp = event => {
            const keyCode = event.code;

            const throttle = CarObjectKeyMapping[CarAction.THROTTLE].find(key => key === keyCode)
            if (throttle) 
            {
                this.actions.keyPressed[CarAction.THROTTLE] = false;
            }

            const reverse = CarObjectKeyMapping[CarAction.REVERSE].find(key => key === keyCode)
            if (reverse) 
            {
                this.actions.keyPressed[CarAction.REVERSE] = false;
            }

            const turnLeft = CarObjectKeyMapping[CarAction.TURN_LEFT].find(key => key === keyCode)
            if (turnLeft) 
            {
                this.actions.keyPressed[CarAction.TURN_LEFT] = false;
            }
        
            const turnRight = CarObjectKeyMapping[CarAction.TURN_RIGHT].find(key => key === keyCode)
            if (turnRight) 
            {
                this.actions.keyPressed[CarAction.TURN_RIGHT] = false;
            }
        };

        this.#debugWidget = new DebugInfo(this, ['direction', 'actions'], new Rectangle(10, 220, 275, 200));
    }


    set keyDown(value)
    {
        if (!TypeChecker.isFunction(value))
        {
            throw new Error('GameObjectController.keyDown(value) : `keyDown` is not a function!');
        }
        
        this.#keyDown = value;
    }

    set keyUp(value)
    {
        if (!TypeChecker.isFunction(value))
        {
            throw new Error('GameObjectController.keyUp(value) : `keyUp` is not a function!');
        }

        this.#keyUp = value;
    }

    values()
    {
        return { direction : this.#direction, actions : this.#actions };
    }

    get direction()
    {
        return this.#direction;
    }

    set direction(value)
    {
        this.#direction = value;
        this.#debugWidget.update();
    }

    get actions()
    {
        return this.#actions;
    }

    set actions(value)
    {
        this.#actions = value;
        this.#debugWidget.update();
    }

    connect()
    {
        window.addEventListener('keydown', this.#keyDown);
        window.addEventListener('keyup', this.#keyUp);
    }

    disconnect()
    {
        window.removeEventListener('keydown', this.#keyDown);
        window.removeEventListener('keyup', this.#keyUp);
    }

    update(dt)
    {
        const direction = this.direction;
        const actions = this.actions;

        if ((!actions.keyPressed[CarAction.THROTTLE] && !actions.keyPressed[CarAction.REVERSE]) && 
             Math.abs(direction.horizontal - DirectionState.ZERO) > LERP_DELTA)
        {
            direction.horizontal = MathFunction.lerp(direction.horizontal, DirectionState.ZERO, 2.0*LERP_T);
        }

        if ((!actions.keyPressed[CarAction.TURN_LEFT] && !actions.keyPressed[CarAction.TURN_RIGHT]) && 
             Math.abs(direction.vertical - DirectionState.ZERO) > LERP_DELTA)
        {
            direction.vertical = MathFunction.lerp(direction.vertical, DirectionState.ZERO,  2.0*LERP_T);
        }

        direction.horizontal = Math.abs(direction.horizontal) < LERP_DELTA ? 0 : direction.horizontal;
        direction.vertical   = Math.abs(direction.vertical)   < LERP_DELTA ? 0 : direction.vertical;

        this.#debugWidget.update();
    }
};