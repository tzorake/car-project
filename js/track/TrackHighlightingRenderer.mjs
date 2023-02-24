import { GameObjectRenderer } from "../game/GameObjectRenderer.mjs";
import { GameUtils } from "../game/GameUtils.mjs";

export class TrackHighlightingRenderer extends GameObjectRenderer
{
    constructor(gameObject)
    {
        super(gameObject);
    }

    render(dt)
    {
        GameUtils.SAVE();
        GameUtils.FILL_STYLE('yellow');


        const track = this.gameObject.parent;
        const world = track.world;
        
        if (world)
        {
            const camera = world.camera;
            const offset = camera.offset;
            const scale = GameUtils.SCALE;
            const player = world.player;
            const points = track.points;

            if (player)
            {
                points.forEach(point => {
                    const p = point.add(offset).multiplyScalar(scale);
                    GameUtils.BEGIN_PATH();
                    GameUtils.CIRCLE(p.x, p.y, scale);
                    GameUtils.FILL();
                });
                
            }
        }

        GameUtils.RESTORE();
    }
};