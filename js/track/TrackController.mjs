import { GameObjectController } from "../game/GameObjectController.mjs";
import { GameUtils } from "../game/GameUtils.mjs";
import { Vector2D } from "../math/Vector2D.mjs";
import { TrackControlPoint } from "./TrackControlPoint.mjs";

export class TrackController extends GameObjectController
{
    #mouseDown;
    #mouseUp;
    #mouseDragged;

    constructor(gameObject)
    {
        super(gameObject);

        this.#mouseDown = event => {
            const world = gameObject.world;
            const camera = world.camera;
            const offset = camera.offset;
            const point = new Vector2D(Math.floor(event.clientX / GameUtils.SCALE), Math.floor(event.clientY / GameUtils.SCALE)).sub(offset);

            gameObject.points.push(new TrackControlPoint(point.x, point.y))
        };

        this.#mouseUp = event => {
            
        };

        this.#mouseDragged = event => {
            
        };
    }

    connect()
    {
        const canvas = GameUtils.CANVAS;

        canvas.addEventListener('mousedown', this.#mouseDown);
        canvas.addEventListener('mouseup', this.#mouseUp);
        canvas.addEventListener('mousemove', this.#mouseDragged);
    }

    disconnect()
    {
        const canvas = GameUtils.CANVAS;

        canvas.removeEventListener('mousedown', this.#mouseDown);
        canvas.removeEventListener('mouseup', this.#mouseUp);
        canvas.removeEventListener('mousemove', this.#mouseDragged);
    }

    update(dt)
    {
        
    }
}