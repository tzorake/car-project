import { GameUtils } from "./GameUtils.mjs";

let iota = 0;
export const GameTimerState = {};
GameTimerState.DELAULT = iota++;
GameTimerState.STARTED = iota++;
GameTimerState.STOPPED = iota++;

export class GameTimer
{
    constructor()
    {
        this.begin = 0;
        this.end = 0;
        this.state = GameTimerState.DELAULT;
    }

    start()
    {
        this.begin = Date.now();
        this.state = GameTimerState.STARTED;
    }

    stop()
    {
        this.end = Date.now();
        this.state = GameTimerState.STOPPED;
    }

    reset()
    {
        this.begin = 0;
        this.end = 0;
        this.state = GameTimerState.DELAULT;
    }

    get elapsed()
    {
        switch (this.state)
        {
            case GameTimerState.DELAULT:
            case GameTimerState.STOPPED: 
            {
                return (this.end - this.begin) / GameUtils.SECOND_TO_MILLISECONDS;
            }
            case GameTimerState.STARTED: 
            {
                return (Date.now() - this.begin)  / GameUtils.SECOND_TO_MILLISECONDS;
            }
            default: 
            {
                return 0;
            }
        }
    }
};