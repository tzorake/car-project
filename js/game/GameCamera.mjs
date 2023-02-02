import { DebugInfo } from "../debug/DebugInfo.mjs";
import { Rectangle } from "../math/Rectangle.mjs";
import { Vector2D } from "../math/Vector2D.mjs";
import { GameUtils } from "./GameUtils.mjs";

let iota = 0;
export const GameCameraMode = {};
GameCameraMode.FIXED = iota++;
GameCameraMode.FOLLOW = iota++;

export class GameCamera
{
    #position;
    #scale;
    #mode = GameCameraMode.FIXED;
    #target = null;

    #debugWidget = null;

    constructor()
    {
        const canvas = GameUtils.CANVAS;
        const scale = GameUtils.SCALE;
        
        this.#position = new Vector2D(0.0, 0.0);
        this.#scale = new Vector2D(canvas.width / scale, canvas.height / scale);
        this.#debugWidget = new DebugInfo(this, ['position', 'offset', 'mode'], new Rectangle(10, 430, 275, 200));
    }

    get position()
    {
        return this.#position;
    }

    set position(value)
    {
        this.#position = value;
    }

    get target()
    {
        return this.#target;
    }

    set target(value)
    {
        this.#target = value;
    }

    get scale()
    {
        return this.#scale;
    }

    get mode()
    {
        return this.#mode;
    }

    set mode(value)
    {
        this.#mode = value;
    }

    get offset()
    {
        return new Vector2D(
            this.scale.x/2 - this.position.x, 
            this.scale.y/2 - this.position.y
        );
    }

    update(dt)
    {
        switch (this.mode)
        {
            case GameCameraMode.FIXED:
            {

            } break;

            case GameCameraMode.FOLLOW:
            {
                if (!this.target)
                {
                    throw new Error('GameCamera.follow() : `target` is not initialized.')
                }

                this.position = Vector2D.lerp(this.position, this.target.position, dt);
            } break;
            
            default:
            {
                
            }
        }

        this.#debugWidget.update();
    }
}