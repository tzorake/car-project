import { GameObject } from "../game/GameObject.mjs";
import { Vector2D } from "../math/Vector2D.mjs";
import { DisplayMode } from "./DisplayMode.mjs";
import { TrackController } from "./TrackController.mjs";
import { SplineType, TrackCurve } from "./TrackCurve.mjs";
import { TrackHighlighter } from "./TrackHighlighter.mjs";
import { TrackRenderer } from "./TrackRenderer.mjs";

class TrackCurveSet
{
    constructor({ left, center, right })
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

        this.trackBorders(Track.WIDTH / 2);

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
    constructor({ x, y, width, height })
    {
        super({ x, y, width, height })
        
        this.points = [
            new Vector2D(-50, -37),
            new Vector2D(-50 - 14, -37 - 37),
            new Vector2D(-50, -37 - 77),
            new Vector2D(-50 + 98, -37 - 77 - 38),
            new Vector2D(-50 + 98 - 9, -37 - 77 - 38 + 58),
            new Vector2D(-50 + 98 - 9 + 22, -37 - 77 - 38 + 58 + 21),
            new Vector2D(-50 + 98 - 9 + 22 + 34, -37 - 77 - 38 + 58 + 21 - 16),

            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25, -37 - 77 - 38 + 58 + 21 - 16 - 48),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32),

            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127 + 17, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32 - 77),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127 + 17 - 70, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32 - 77 - 111),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127 + 17 - 70 - 45, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32 - 77 - 111 - 25),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127 + 17 - 70 - 45 - 208, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32 - 77 - 111 - 25 + 12),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127 + 17 - 70 - 45 - 208 - 282, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32 - 77 - 111 - 25 + 12 + 162),

            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127 + 17 - 70 - 45 - 208 - 282 - 40, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32 - 77 - 111 - 25 + 12 + 162 + 49),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127 + 17 - 70 - 45 - 208 - 282 - 40 + 42, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32 - 77 - 111 - 25 + 12 + 162 + 49 + 34),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127 + 17 - 70 - 45 - 208 - 282 - 40 + 42 - 6, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32 - 77 - 111 - 25 + 12 + 162 + 49 + 34 + 36),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127 + 17 - 70 - 45 - 208 - 282 - 40 + 42 - 6 + 74, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32 - 77 - 111 - 25 + 12 + 162 + 49 + 34 + 36 + 97),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127 + 17 - 70 - 45 - 208 - 282 - 40 + 42 - 6 + 74 + 385, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32 - 77 - 111 - 25 + 12 + 162 + 49 + 34 + 36 + 97 - 14),

            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127 + 17 - 70 - 45 - 208 - 282 - 40 + 42 - 6 + 74 + 385 + 18, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32 - 77 - 111 - 25 + 12 + 162 + 49 + 34 + 36 + 97 - 14 - 50),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127 + 17 - 70 - 45 - 208 - 282 - 40 + 42 - 6 + 74 + 385 + 18 - 24, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32 - 77 - 111 - 25 + 12 + 162 + 49 + 34 + 36 + 97 - 14 - 50 - 78),
            new Vector2D(-50 + 98 - 9 + 22 + 34 + 25 + 74 - 39 + 26 + 127 + 17 - 70 - 45 - 208 - 282 - 40 + 42 - 6 + 74 + 385 + 18 - 24 - 108, -37 - 77 - 38 + 58 + 21 - 16 - 48 - 36 + 103 + 51 + 32 - 77 - 111 - 25 + 12 + 162 + 49 + 34 + 36 + 97 - 14 - 50 - 78 - 34),
        ];
        this.curves = new TrackCurveSet({
            left:   null, 
            center: new TrackCurve(this.points, SplineType.CatmullRomSpline, 100, DisplayMode.Visible), 
            right:  null,
        });
        this.highlighter = new TrackHighlighter({ parent: this });
        
        this.renderer = new TrackRenderer({ parent: this });
        this.controller = new TrackController({ parent: this });
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

        this.highlighter.update(dt);
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

Track.WIDTH = 20.0;