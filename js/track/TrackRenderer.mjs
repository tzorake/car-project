import { GameObjectRenderer } from "../game/GameObjectRenderer.mjs";
import { DisplayMode } from "./DisplayMode.mjs";
import { GameUtils } from "../game/GameUtils.mjs";

export class TrackRenderer extends GameObjectRenderer
{
    constructor(gameObject)
    {
        super(gameObject);
    }

    render(dt)
    {
        const gameObject = this.gameObject;
        const world = gameObject.world;
        const camera = world.camera;
        const offset = camera.offset;

        const context = GameUtils.CONTEXT;
        const scale = GameUtils.SCALE;
        const curves = gameObject.curves.get();

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
                    points.slice(0,-1).forEach((point, index) => {
                        const vi = point.add(offset).multiplyScalar(scale);
                        const vj = points[index + 1].add(offset).multiplyScalar(scale);
                        
                        context.moveTo(vi.x, vi.y);
                        context.lineTo(vj.x, vj.y);
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
        
                points.forEach(p => {
                    const point = p.add(offset).multiplyScalar(scale);

                    if (p.mode !== DisplayMode.Visible) return;

                    context.beginPath();
                    context.arc(point.x, point.y, 6, 0, 2*Math.PI);
                    context.fill();
                    context.stroke();

                    
                });
                
                context.restore();
            });
        }

        renderCurves();
        renderPoints();
    }
}