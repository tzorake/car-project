export class GameObjectController
{
    constructor({ parent })
    {
        // https://stephendoddtech.com/blog/game-design/keyboard-input-player-controller-2d
        // https://stephendoddtech.com/blog/game-design/keyboard-event-game-input-map
        this.parent = parent;
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