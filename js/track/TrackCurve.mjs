import { MathFunction } from "../math/MathFunction.mjs";
import { Vector2D } from "../math/Vector2D.mjs";
import { DisplayMode } from "./DisplayMode.mjs";
import { TrackSegment } from "./TrackSegment.mjs";

class CatmullRomSpline
{
    static calculate(P0, P1, P2, P3, n, alpha = 0.5)
    {
        function tj(ti, pi, pj)
        {
            const [xi, yi] = [pi.x, pi.y];
            const [xj, yj] = [pj.x, pj.y];
            const [dx, dy] = [xj - xi, yj - yi];
            const l = Math.pow(dx * dx + dy * dy, 0.5);
            return ti + Math.pow(l, alpha);
        }

        const t0 = 0.0;
        const t1 = tj(t0, P0, P1);
        const t2 = tj(t1, P1, P2);
        const t3 = tj(t2, P2, P3);
        const t = MathFunction.linspace(t1, t2, n);

        // const A1 = (t1 - t) / (t1 - t0) * P0 + (t - t0) / (t1 - t0) * P1;
        // const A2 = (t2 - t) / (t2 - t1) * P1 + (t - t1) / (t2 - t1) * P2;
        // const A3 = (t3 - t) / (t3 - t2) * P2 + (t - t2) / (t3 - t2) * P3;
        // const B1 = (t2 - t) / (t2 - t0) * A1 + (t - t0) / (t2 - t0) * A2;
        // const B2 = (t3 - t) / (t3 - t1) * A2 + (t - t1) / (t3 - t1) * A3;
        // const points = (t2 - t) / (t2 - t1) * B1 + (t - t1) / (t2 - t1) * B2;
        const points = t.map(T => {
            const A1 = new Vector2D(
                (t1 - T) / (t1 - t0) * P0.x + (T - t0) / (t1 - t0) * P1.x,
                (t1 - T) / (t1 - t0) * P0.y + (T - t0) / (t1 - t0) * P1.y
            );
            const A2 = new Vector2D(
                (t2 - T) / (t2 - t1) * P1.x + (T - t1) / (t2 - t1) * P2.x,
                (t2 - T) / (t2 - t1) * P1.y + (T - t1) / (t2 - t1) * P2.y
            );
            const A3 = new Vector2D(
                (t3 - T) / (t3 - t2) * P2.x + (T - t2) / (t3 - t2) * P3.x,
                (t3 - T) / (t3 - t2) * P2.y + (T - t2) / (t3 - t2) * P3.y
            );
            const B1 = new Vector2D(
                (t2 - T) / (t2 - t0) * A1.x + (T - t0) / (t2 - t0) * A2.x,
                (t2 - T) / (t2 - t0) * A1.y + (T - t0) / (t2 - t0) * A2.y
            );
            const B2 = new Vector2D(
                (t3 - T) / (t3 - t1) * A2.x + (T - t1) / (t3 - t1) * A3.x,
                (t3 - T) / (t3 - t1) * A2.y + (T - t1) / (t3 - t1) * A3.y
            );
            const point = new Vector2D(
                (t2 - T) / (t2 - t1) * B1.x + (T - t1) / (t2 - t1) * B2.x,
                (t2 - T) / (t2 - t1) * B1.y + (T - t1) / (t2 - t1) * B2.y
            );
            return point;
        });

        return points;
    }
}

let iota = 0;
export const SplineType = {}
SplineType.CatmullRomSpline = iota++;

const SplineMappingType = {};
SplineMappingType[SplineType.CatmullRomSpline] = CatmullRomSpline;

export class TrackCurve
{
    constructor(points, splineType, n = 100, mode = DisplayMode.Visible)
    {
        this.points = points;
        this.spline = SplineMappingType[splineType];
        this.n = n;
        this.segments = [];
        this.mode = mode;
    }

    calculate(quadruple)
    {
        return this.spline.calculate(...quadruple, this.n)
    }

    chain()
    {
        if (this.points.length < 4) return [];

        const points = this.points.concat([this.points[0], this.points[1], this.points[2]]);
        const pointQuadruples = [];
        for (let i = 3; i < points.length; ++i)
        {
            pointQuadruples.push([points[i - 3], points[i - 2], points[i - 1], points[i]]);
        }
        
        this.segments = pointQuadruples.map(quadruple => new TrackSegment(this.calculate(quadruple)));
    }
}

// control points -> spline type -> curves (set of points)