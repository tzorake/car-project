import { TypeChecker } from "../math/TypeChecker.mjs";

export class GameObjectController
{
    #gameObject;

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
        throw new Error('GameObjectController.connect() : The method is not implemented yet!');
    }

    disconnect()
    {
        throw new Error('GameObjectController.disconnect() : The method is not implemented yet!');
    }

    update(dt)
    {
        throw new Error('GameObjectController.update(dt) : The method is not implemented yet!');
    }
};