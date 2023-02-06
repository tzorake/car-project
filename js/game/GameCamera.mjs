import { DebugInfo } from "../debug/DebugInfo.mjs";
import { Rectangle } from "../math/Rectangle.mjs";
import { Vector2D } from "../math/Vector2D.mjs";
import { GameCameraController } from "./GameCameraController.mjs";
import { GameObject } from "./GameObject.mjs";

let iota = 0;
export const GameCameraMode = {};
GameCameraMode.FIXED = iota++;
GameCameraMode.FOLLOW = iota++;

iota = 0;
export const GameCameraFocusMode = {};
GameCameraFocusMode.DISABLED = iota++;
GameCameraFocusMode.ENABLED = iota++;

export class GameCamera extends GameObject
{
    #mode;
    #target = null;

    #debugWidget = null;

    constructor(x, y, length, width, mode = GameCameraMode.FIXED)
    {
        super(x, y, length, width);
        
        this.mode = mode;

        this.controller = new GameCameraController(this);
        this.controller.connect();
        this.#debugWidget = new DebugInfo(this, ['position', 'offset', 'mode'], new Rectangle(10, 430, 275, 200));
    }

    get target()
    {
        return this.#target;
    }

    set target(value)
    {
        this.#target = value;
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
        const controller = this.controller;

        if (controller)
        {
            controller.update(dt);
        }

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