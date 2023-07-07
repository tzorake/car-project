export class GameWorld
{
    constructor(args)
    {
        this.entities = [];
    }

    update()
    {
        this.entities.forEach(entity => {
            entity.update();
        });
    }

    paint()
    {
        this.entities.forEach(entity => {
            entity.paint();
        });
    }
};