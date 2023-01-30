import { GameObjectRenderer } from "../game/GameObjectRenderer.mjs";
import { DisplayMode } from "./DisplayMode.mjs";
import { GameUtils } from "../game/GameUtils.mjs";

export class TrackRenderer extends GameObjectRenderer
{
    constructor(gameObject)
    {
        super(gameObject);
    }

    render()
    {
        const context = GameUtils.CONTEXT;
        const curves = this.gameObject.curves.get();
        // const points = this.gameObject.points;

        function renderCurves()
        {
            curves.forEach(curve => {
                if (!curve) return;

                if (curve.mode !== DisplayMode.Visible) return;

                const segments = curve.segments;

                if (segments.length === 0) return;

                context.save();

                context.fillStyle = 'rgba(0, 0, 0, 0.0)';
                context.strokeStyle = 'rgba(255, 255, 255, 1.0)';
                context.lineWidth = 4;
        
                context.beginPath();
                segments.concat(segments[0]).forEach(segment => {
                    const points = segment.points;
                    points.slice(0,-1).forEach((vi, index) => {
                        const vj = points[index + 1];
                        context.moveTo(vi.x*GameUtils.SCALE, vi.y*GameUtils.SCALE);
                        context.lineTo(vj.x*GameUtils.SCALE, vj.y*GameUtils.SCALE);
                    });
                });
                context.stroke();
                context.restore();
            });
        }

        function renderPoints()
        {
            curves.forEach(curve => {

                if (!curve) return;

                if (curve.mode !== DisplayMode.Visible) return;

                const points = curve.points;

                context.save();

                context.fillStyle = 'rgba(32, 33, 36, 1.0)';
                context.strokeStyle = 'rgba(255, 255, 255, 1.0)';
                context.lineWidth = 4;
        
                points.forEach(point => {

                    if (point.mode !== DisplayMode.Visible)  return;

                    context.beginPath();
                    context.arc(point.x*GameUtils.SCALE, point.y*GameUtils.SCALE, 6, 0, 2*Math.PI);
                    context.fill();
                    context.stroke();
                })
                
                context.restore();
            });
        }

        renderCurves();
        renderPoints();
    }
}