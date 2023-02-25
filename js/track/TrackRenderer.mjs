import { GameObjectRenderer } from "../game/GameObjectRenderer.mjs";
import { DisplayMode } from "./DisplayMode.mjs";
import { GameUtils } from "../game/GameUtils.mjs";

export class TrackRenderer extends GameObjectRenderer
{
    constructor({ parent })
    {
        super({ parent });
    }

    render(dt)
    {
        const track = this.parent;
        const world = track.world;
        const player = world.player;
        const camera = player.camera;
        const offset = camera.offset;

        const scale = GameUtils.SCALE;
        const curves = track.curves.get();

        function renderCurves()
        {
            curves.forEach(curve => {
                if (!curve) return;

                if (curve.mode !== DisplayMode.Visible) return;

                const segments = curve.segments;

                if (segments.length === 0) return;

                GameUtils.SAVE();

                GameUtils.FILL_STYLE('rgba(0, 0, 0, 0.0)');
                GameUtils.STROKE_STYLE('rgba(255, 255, 255, 1.0)');
                GameUtils.LINE_WIDTH(4.0);

                GameUtils.BEGIN_PATH();

                segments.concat(segments[0]).forEach(segment => {
                    const points = segment.points;
                    points.slice(0,-1).forEach((point, index) => {
                        const vi = point.add(offset).multiplyScalar(scale);
                        const vj = points[index + 1].add(offset).multiplyScalar(scale);
                        
                        GameUtils.MOVE_TO(vi.x, vi.y);
                        GameUtils.LINE_TO(vj.x, vj.y);
                    });
                });

                GameUtils.STROKE();
                GameUtils.RESTORE();
            });
        }

        function renderPoints()
        {
            curves.forEach(curve => {

                if (!curve) return;

                if (curve.mode !== DisplayMode.Visible) return;

                const points = curve.points;

                GameUtils.SAVE();

                GameUtils.FILL_STYLE('rgba(32, 33, 36, 1.0)');
                GameUtils.STROKE_STYLE('rgba(255, 255, 255, 1.0)');
                GameUtils.LINE_WIDTH(4.0);
        
                points.forEach(p => {
                    const point = p.add(offset).multiplyScalar(scale);

                    if (p.mode !== DisplayMode.Visible) return;

                    GameUtils.BEGIN_PATH();
                    GameUtils.CIRCLE(point.x, point.y, 6);
                    GameUtils.FILL();
                    GameUtils.STROKE();
                });
                
                GameUtils.RESTORE();
            });
        }

        renderCurves();
        renderPoints();

        if (world && world.player)
        {    
            this.parent.highlighter.renderer.render(dt);
        }
    }
}