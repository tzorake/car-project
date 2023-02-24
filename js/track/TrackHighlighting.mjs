import { TrackHighlightingRenderer } from "./TrackHighlightingRenderer.mjs";

export class TrackHighlighting
{
    constructor({ parent })
    {
        this.parent = parent;
        this.renderer = new TrackHighlightingRenderer(this);
    }
    
    update(dt)
    {
        const track = this.parent;
        const world = track.world;
        
        if (world)
        {
            const player = world.player;
            const points = track.points;
            if (player)
            {
                // actions
            }
        }
    }
};