import { TrackHighlighterRenderer } from "./TrackHighlighterRenderer.mjs";

export class TrackHighlighter
{
    constructor({ parent })
    {
        this.parent = parent;

        this.renderer = new TrackHighlighterRenderer({ parent: this});
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