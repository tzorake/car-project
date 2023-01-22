import { TypeChecker } from "../math/TypeChecker.mjs";

export class GameObjectController
{
    #gameObject;

    #keyDown = event => {
        throw new Error('GameObjectController.keyDown(event) : The method is not implemented yet!');
    };
    #keyUp = event => {
        throw new Error('GameObjectController.keyUp(event) : The method is not implemented yet!');
    }

    constructor(gameObject)
    {
        // https://stephendoddtech.com/blog/game-design/keyboard-input-player-controller-2d
        // https://stephendoddtech.com/blog/game-design/keyboard-event-game-input-map

        if (!TypeChecker.isGameObject(gameObject))
        {
            throw new Error('GameObjectController.constructor(gameObject) : Passed object has to be inherited from `GameObject`!');
        }

        this.#gameObject = gameObject;
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
};