import { GameCamera, GameCameraMode } from "./GameCamera.mjs";
import { GameUtils } from "./GameUtils.mjs";

export class GameWorld
{
    #objects

    constructor(objects)
    {
        this.#objects = objects.slice();
        this.camera = new GameCamera();
        this.camera.mode = GameCameraMode.FOLLOW;
        this.camera.target =this.#objects[1];

        this.objects.forEach(object => {
            object.world = this;
        });

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

            const controller = object.controller;
            const camera = this.camera;

            if (controller)
            {
                controller.update();
            }

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