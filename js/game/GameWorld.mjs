export class GameWorld
{
    #objects

    constructor(objects)
    {
        this.#objects = objects.slice();
    }

    get objects()
    {
        return this.#objects;
    }

    appendObject(object)
    {
        this.objects.push(object);
    }

    update(dt)
    {
        const objects = this.objects;
        objects.forEach(object => {
            object.update(dt);
        });
    }

    render()
    {
        const objects = this.objects;
        objects.forEach(object => {
            object.render();
        });
    }
};