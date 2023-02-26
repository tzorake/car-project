import { GameTimerState } from "../game/GameTimer.mjs";
import { Circle } from "../math/Circle.mjs";
import { Track } from "./Track.mjs";
import { TrackHighlighterRenderer } from "./TrackHighlighterRenderer.mjs";

export class TrackHighlighter
{
    constructor({ parent })
    {
        this.parent = parent;

        this.renderer = new TrackHighlighterRenderer({ parent: this });
        
        this.next = -1;
    }
    
    update(dt)
    {
        const track = this.parent;
        const world = track.world;

        if (world)
        {
            const player = world.player;
            const car = player.car;
            const points = track.points;

            const radius = Math.max(car.scale.x, car.scale.y) / 2;

            // https://www.youtube.com/watch?v=IOYNg6v9sfc
            if (this.next >= 0)
            {
                const next = points[this.next]
                const [c1, c2] = [
                    new Circle({ 
                        cx: car.position.x, 
                        cy: car.position.y, 
                        r:  radius 
                    }), 
                    new Circle({ 
                        cx: next.x, 
                        cy: next.y, 
                        r:  Track.WIDTH / 2 
                    })
                ];

                if (c1.intersects(c2))
                {
                    this.next = (this.next + 1) % points.length;

                    const timer = player.timer;

                    if (this.next === 1)
                    {
                        if (timer.state === GameTimerState.STARTED)
                        {
                            timer.stop();
                        }

                        if (timer.state === GameTimerState.DELAULT)
                        {
                            timer.start();
                        }
                    }
                }
            }
        }
    }
};