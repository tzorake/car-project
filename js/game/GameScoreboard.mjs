import { rect, label, within } from "../menu/GameMenuHelper.mjs";
import { Vector2 } from "../math/Vector2.mjs";
import { GameScoreboardButton } from "./GameScoreboardButton.mjs";
import { GameTimerState } from "./GameTimer.mjs";

class GameScoreboardData
{
    constructor({ data, updater, parent })
    {
        this.parent = parent;

        this.data = data;
        this.updater = updater;
    }

    update(dt)
    {
        if (this.updater)
        {
            this.updater(dt);
        }
    }
}

/*

how to handle start and stop timer

GameWorld
* GameScoreboard <---------- update -----------------------------o
  * GameScoreboardButton >-- action fired --o                    |
* Track                                     |                    |
  * TrackHighlighter <------ update --------o >-- action fired --o
* Player                                    |                    |
  * GameTimer <------------- start ---------o <-- stop ----------o

*/

export class GameScoreboard
{
    constructor({ cx, cy, parent })
    {
        this.parent = parent;

        this.cx = cx;
        this.cy = cy;
        this.w = GameScoreboard.SCALE.x;
        this.h = GameScoreboard.SCALE.y;

        this.delay = 0.0;
        this.data = [
            new GameScoreboardData({ 
                data: 0, 
                updater: function(dt) {
                    const scoreboard = this.parent;
                    const world = scoreboard.parent;
                    const player = world.player;
                    const timer = player.timer;
                    const time = timer.elapsed;

                    this.data = time;
                },
                parent: this
            }),
            new GameScoreboardData({ data: 0 }),
            new GameScoreboardData({ data: 0 }),
            new GameScoreboardData({ data: 0 }),
            new GameScoreboardData({ data: 0 }),
            new GameScoreboardData({ data: 0 }),
            new GameScoreboardData({ data: 0 }),
            new GameScoreboardData({ data: 0 }),
            new GameScoreboardData({ data: 0 }),
            new GameScoreboardData({ data: 0 }),
            new GameScoreboardData({ data: 0 }),
            new GameScoreboardData({ data: 0 }),
            new GameScoreboardData({ data: 0 })
        ];

        this.animation = 0.0;
        this.duration = 1.0;

        this.startButton = new GameScoreboardButton({ 
            text: 'START',
            cx: this.cx, 
            cy: this.cy + GameScoreboard.SCALE.y / 2 - GameScoreboardButton.SCALE.y / 2, 
            styles: {
                rectStyle: { 
                    fillStyle: 'rgba(2, 247, 131, 0.75)', 
                    strokeStyle: 'rgba(0, 0, 0, 0.0)' 
                },
                labelStyle: { 
                    font: '14px Roboto', 
                    fillStyle: 'rgba(255, 255, 255, 0.75)' 
                }
            },
            callbacks : {
                mouseDown: function(event) {
                    const scoreboard = this.parent;
                    const world = scoreboard.parent;
                    const player = world.player;
                    const timer = player.timer;
                    const track = world.track;

                    const x  = Math.floor(this.cx - this.w / 2);
                    const y = Math.floor(this.cy - this.h / 2);
                    const w = this.w;
                    const h = this.h;

                    if (within(event.x, event.y, x, y, x + w, y + h) && (timer.state === GameTimerState.DELAULT || timer.state === GameTimerState.STOPPED))
                    {
                        const highlighter = track.highlighter;
                        highlighter.next = 0;
                    }
                }
            },
            parent: this 
        });
        this.resetButton = new GameScoreboardButton({ 
            text: 'RESET',
            cx: this.cx, 
            cy: this.cy + GameScoreboard.SCALE.y / 2 - GameScoreboardButton.SCALE.y / 2, 
            styles: {
                rectStyle: { 
                    fillStyle: 'rgb(247, 71, 12, 0.75)', 
                    strokeStyle: 'rgba(0, 0, 0, 0.0)' 
                },
                labelStyle: { 
                    font: '14px Roboto', 
                    fillStyle: 'rgba(255, 255, 255, 0.75)' 
                }
            },
            callbacks : {
                mouseDown: function(event) {
                    const scoreboard = this.parent;
                    const world = scoreboard.parent;
                    const player = world.player;
                    const timer = player.timer;
                    const track = world.track;

                    const x  = Math.floor(this.cx - this.w / 2);
                    const y = Math.floor(this.cy - this.h / 2);
                    const w = this.w;
                    const h = this.h;

                    if (within(event.x, event.y, x, y, x + w, y + h) && timer.state === GameTimerState.STARTED)
                    {
                        const highlighter = track.highlighter;
                        highlighter.next = 0;
                        timer.reset();
                    }
                }
            },
            parent: this 
        });

    }

    update(dt)
    {
        this.delay += dt;

        if (this.delay >= GameScoreboard.DELAY)
        {
            this.data.forEach(item => {
                item.update(dt);
            });
            this.delay = 0.0;
        }

        const world = this.parent;
        const player = world.player;
        const timer = player.timer;

        if (timer.state === GameTimerState.DELAULT || timer.state === GameTimerState.STOPPED)
        {
            this.startButton.update(dt);
        }

        if (timer.state === GameTimerState.STARTED)
        {
            this.resetButton.update(dt);
        }
    }

    render(dt)
    {
        const cx = this.cx;
        const cy = this.cy;
        const w = this.w;
        const h = this.h;
        const x  = Math.floor(cx - w/2);
        const y = Math.floor(cy - h/2);

        rect(x, y, w, h, { fillStyle: 'rgba(0, 0, 0, 0.35)', strokeStyle: 'rgba(0, 0, 0, 0.0)' });

        const current = this.data[0].data;
        const whole = Math.floor(current);
        const fraction = current - whole;
        
        const minutes = Math.floor(whole / 60)
        const seconds = whole - minutes*60;
        const miliseconds = Math.floor(fraction*1000);

        const string = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') + '.' + miliseconds.toString().padStart(3, '0');

        label(string, x, y, GameScoreboard.ROW_SCALE.x, 2*GameScoreboard.ROW_SCALE.y, { font: '20px Roboto', fillStyle: 'rgba(255, 255, 255, 0.75)' });

        this.data.slice(1).forEach((item, index) => {
            let string = '--';

            if (item.updater)
            {
                const data = item.data;

                const current = data;
                const whole = Math.floor(current);
                const fraction = current - whole;
                
                const minutes = Math.floor(whole / 60)
                const seconds = whole - minutes*60;
                const miliseconds = Math.floor(fraction*1000);
    
                string = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') + '.' + miliseconds.toString().padStart(3, '0');
            }

            label(string, x, y + GameScoreboard.ROW_SCALE.y*(index + 2), GameScoreboard.ROW_SCALE.x, GameScoreboard.ROW_SCALE.y, { font: '14px Roboto', fillStyle: 'rgba(255, 255, 255, 0.75)' });

        });
        
        const world = this.parent;
        const player = world.player;
        const timer = player.timer;

        if (timer.state === GameTimerState.DELAULT || timer.state === GameTimerState.STOPPED)
        {
            this.startButton.render(dt);
        }

        if (timer.state === GameTimerState.STARTED)
        {
            this.resetButton.render(dt);
        }
    }

    static get SCALE()
    {
        return new Vector2(200.0, 400.0);
    }

    static get ROW_SCALE()
    {
        return new Vector2(200, 25);
    }

    static get DELAY()
    {
        return 0.2;
    }

    connect()
    {
        this.startButton.connect();
        this.resetButton.connect();
    }

    disconnect()
    {
        this.startButton.disconnect();
        this.resetButton.disconnect();
    }
};