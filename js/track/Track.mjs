import { GameObject } from "../game/GameObject.mjs";
import { Vector2D } from "../math/Vector2D.mjs";
import { DisplayMode } from "./DisplayMode.mjs";
import { TrackController } from "./TrackController.mjs";
import { SplineType, TrackCurve } from "./TrackCurve.mjs";
import { TrackRenderer } from "./TrackRenderer.mjs";

class TrackCurveSet
{
    constructor(left, center, right)
    {
        this.left = left;
        this.center = center;
        this.right = right;
    }

    get()
    {
        return [this.left, this.center, this.right];
    }

    chain()
    {
        this.center.chain();

        this.trackBorders(10);

        this.left.chain();
        this.right.chain();
    }

    trackBorders(width)
    {
        const center = this.center;
        const points = center.points;
        const segments = center.segments.slice(-1).concat(center.segments.slice(0,-1));
        
        const guides = points.map((point, index) => segments[index].points[1].sub(point));
        
        const leftNormals  = guides.map(guide => new Vector2D(-guide.y,  guide.x).multiplyScalar(width / guide.magnitude()));
        const rightNormals = guides.map(guide => new Vector2D( guide.y, -guide.x).multiplyScalar(width / guide.magnitude()));

        const leftBorder  = points.map((point, index) => point.add(leftNormals[index]));
        const rightBorder = points.map((point, index) => point.add(rightNormals[index]));

        this.left = new TrackCurve(leftBorder, SplineType.CatmullRomSpline);
        this.right = new TrackCurve(rightBorder, SplineType.CatmullRomSpline);
    }
}

export class Track extends GameObject
{
    constructor(x, y, width, height)
    {
        super(x, y, width, height)

        this.points = []; //[new Vector2D(20, 15), new Vector2D(55, 5), new Vector2D(90, 15), new Vector2D(100, 50), new Vector2D(90, 85), new Vector2D(55, 95), new Vector2D(20, 85), new Vector2D(10, 50)];
        this.curves = new TrackCurveSet(
            null, 
            new TrackCurve(this.points, SplineType.CatmullRomSpline, 100, DisplayMode.Visible), 
            null
        );
        this.renderer = new TrackRenderer(this);
        this.controller = new TrackController(this);
        // this.controller.connect();
    }

    update(dt)
    {
        const controller = this.controller;
            
        if (controller)
        {
            controller.update(dt);
        }

        if (this.points.length < 4) return;

        this.curves.chain();
    }

    connect()
    {
        this.controller.connect();
    }

    disconnect()
    {
        this.controller.disconnect();
    }
}