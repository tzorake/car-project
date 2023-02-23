import { GameCamera, GameCameraMode } from "./GameCamera.mjs";
import { GameUtils } from "./GameUtils.mjs";

export class GameWorld
{
    #objects;

    constructor(objects)
    {
        this.objects = objects;
        this.objects.forEach(object => {
            object.world = this;
        });
    }

    get objects()
    {
        return this.#objects;
    }

    set objects(value)
    {
        this.#objects = value;
    }

    get camera()
    {
        const camera = this.objects.filter(item => item instanceof GameCamera)[0];

        return camera
    }

    appendObject(object)
    {
        this.objects.push(object);
    }

    update(dt)
    {
        const objects = this.objects;
        objects.forEach(object => {
            const camera = this.camera;

            if (camera)
            {
                camera.update(dt);
            }

            object.update(dt);
        });
    }

    render(dt)
    {
        const objects = this.objects;

        GameUtils.BACKGROUND('rgba(32, 33, 36, 1.0)');

        objects.forEach(object => {
            object.render(dt);
        });
    }
};