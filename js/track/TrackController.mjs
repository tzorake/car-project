import { GameObjectController } from "../game/GameObjectController.mjs";
import { GameUtils } from "../game/GameUtils.mjs";
import { EventListenerType } from "../game/GlobalGameController.mjs";
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
        const controller = GameUtils.CONTROLLER;
        controller.addCallback(EventListenerType.MOUSEDOWN, this.#mouseDown);
        controller.addCallback(EventListenerType.MOUSEUP,   this.#mouseUp);
        controller.addCallback(EventListenerType.MOUSEMOVE, this.#mouseDragged);
    }

    disconnect()
    {
        const controller = GameUtils.CONTROLLER;
        controller.removeCallback(EventListenerType.MOUSEDOWN, this.#mouseDown);
        controller.removeCallback(EventListenerType.MOUSEUP,   this.#mouseUp);
        controller.removeCallback(EventListenerType.MOUSEMOVE, this.#mouseDragged);
    }

    update(dt)
    {
        
    }
}