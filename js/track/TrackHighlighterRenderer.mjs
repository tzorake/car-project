import { GameObjectRenderer } from "../game/GameObjectRenderer.mjs";
import { GameUtils } from "../game/GameUtils.mjs";

export class TrackHighlighterRenderer extends GameObjectRenderer
{
    constructor({ parent })
    {
        super({ parent });
    }

    render(dt)
    {
        GameUtils.SAVE();
        GameUtils.FILL_STYLE('yellow');

        const trackHighlighter = this.parent;
        const track = trackHighlighter.parent;
        const world = track.world;
        
        if (world)
        {
            const player = world.player;
            const camera = player.camera;
            const offset = camera.offset;
            const scale = GameUtils.SCALE;
            const points = track.points;
            
            if (player)
            {
                const next = trackHighlighter.next;

                points.forEach((point, index) => {
                    if (next === index)
                    {
                        const p = point.add(offset).multiplyScalar(scale);
                        GameUtils.BEGIN_PATH();
                        GameUtils.CIRCLE(p.x, p.y, 10*scale);
                        GameUtils.FILL();
                    }
                });
                
            }
        }

        GameUtils.RESTORE();
    }
};