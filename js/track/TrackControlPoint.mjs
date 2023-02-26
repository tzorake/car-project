import { Vector2 } from "../math/Vector2.mjs";
import { DisplayMode } from "./DisplayMode.mjs";

export class TrackControlPoint extends Vector2
{
    constructor(x, y, mode = DisplayMode.Visible)
    {
        super(x, y);
        this.mode = mode;
    }
}