import { DebugInfo } from "../debug/DebugInfo.mjs";
import { Vector2D } from "../math/Vector2D.mjs";

export class CarCamera
{
    constructor(target, width, height)
    {
        this.target = target;
        this.viewport = new Vector2D(width, height);
    }

    get offset()
    {
        return new Vector2D(this.target.position.x - this.viewport.x / 2, this.target.position.y - this.viewport.y / 2);
    }
}