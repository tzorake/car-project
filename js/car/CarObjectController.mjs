import { GameObjectController } from "../game/GameObjectController.mjs";

let iota = -1;
export const DirectionState = {};
DirectionState.NEGATIVE = iota++;
DirectionState.ZERO = iota++;
DirectionState.POSITIVE = iota++;

class Direction
{
    constructor(vertical = 0.0, horizontal = 0.0) 
    {
        this.vertical = vertical;
        this.horizontal = horizontal;
    }
}

const ActionState = {};
ActionState.FALSE = false;
ActionState.TRUE = true;

class Actions
{
    constructor()
    {
        this.brake = ActionState.FALSE;
    }
}

const CarObjectKeyMapping = {
    FORWARD    : ['KeyW', 'ArrowUp'],
    TURN_LEFT  : ['KeyA', 'ArrowLeft'],
    BACKWARD   : ['KeyS', 'ArrowDown'],
    TURN_RIGHT : ['KeyD', 'ArrowRight'],
    BRAKE      : ['Space']
};

export class CarObjectController extends GameObjectController
{
    #direction = new Direction();
    #actions = new Actions();

    constructor(gameObject)
    {
        super(gameObject);

        this.keyDown = event => {
        const keyCode = event.code;

        const forward = CarObjectKeyMapping.FORWARD.find(key => key === keyCode)
        if (forward) 
        {
          this.#direction.horizontal = DirectionState.POSITIVE;
        }
    
        const backward = CarObjectKeyMapping.BACKWARD.find(key => key === keyCode)
        if (backward) 
        {
            this.#direction.horizontal = DirectionState.NEGATIVE;
        }
    
        const turnLeft = CarObjectKeyMapping.TURN_LEFT.find(key => key === keyCode)
        if (turnLeft) 
        {
            this.#direction.vertical = DirectionState.NEGATIVE;
        }
    
        const turnRight = CarObjectKeyMapping.TURN_RIGHT.find(key => key === keyCode)
        if (turnRight) 
        {
            this.#direction.vertical = DirectionState.POSITIVE;
        }

        const brake = CarObjectKeyMapping.BRAKE.find(key => key === keyCode);
        if (brake)
        {
            this.#actions.brake = ActionState.TRUE;
        }
    };
    this.keyUp = event => {
        const keyCode = event.code;

        const forward = CarObjectKeyMapping.FORWARD.find(key => key === keyCode)
        if (forward) 
        {
          this.#direction.horizontal = DirectionState.ZERO;
        }
    
        const backward = CarObjectKeyMapping.BACKWARD.find(key => key === keyCode)
        if (backward) 
        {
            this.#direction.horizontal = DirectionState.ZERO;
        }
    
        const turnLeft = CarObjectKeyMapping.TURN_LEFT.find(key => key === keyCode)
        if (turnLeft) 
        {
            this.#direction.vertical = DirectionState.ZERO;
        }
    
        const turnRight = CarObjectKeyMapping.TURN_RIGHT.find(key => key === keyCode)
        if (turnRight) 
        {
            this.#direction.vertical = DirectionState.ZERO;
        }

        const brake = CarObjectKeyMapping.BRAKE.find(key => key === keyCode);
        if (brake)
        {
            this.#actions.brake = ActionState.FALSE;
        }
    };
    }

    values()
    {
        return { direction : this.#direction, actions : this.#actions };
    }
};

// key -> 