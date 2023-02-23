import { Vector2D } from "../math/Vector2D.mjs";
import { DisplayMode } from "./DisplayMode.mjs";

export class TrackControlPoint extends Vector2D
{
    constructor(x, y, mode = DisplayMode.Visible)
    {
        super(x, y);
        this.mode = mode;
    }
}