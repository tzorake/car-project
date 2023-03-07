import { GameScoreboard } from "./GameScoreboard.mjs";
import { GameUtils } from "./GameUtils.mjs";

export class GameWorld
{
    constructor({ objects, parent })
    {
        this.parent = parent;

        const { player, enemies, track } = objects;

        this.player = player;
        this.enemies = enemies;
        this.track = track;

        this.scoreboard = new GameScoreboard({ cx: GameScoreboard.SCALE.x / 2, cy: GameUtils.CANVAS.height / 2, parent: this });
        
        this.objects.forEach(object => { 
            object.world = this; 
        });
    }

    get objects()
    {
        return [this.track, this.player].concat(this.enemies)
    }

    update(dt)
    {
        const objects = this.objects;

        objects.forEach(object => {
            object.update(dt)
        });

        this.scoreboard.update(dt);
    }

    render(dt)
    {
        const objects = this.objects;

        GameUtils.BACKGROUND('rgba(32, 33, 36, 1.0)');

        objects.forEach(object => {
            object.render(dt)
        });

        this.scoreboard.render(dt);
    }

    connect()
    {
        const objects = this.objects;

        const connactable = objects.filter(object => !!object.connect);

        connactable.forEach(object => {
            object.connect();
        });

        this.scoreboard.connect();
    }

    disconnect()
    {
        const objects = this.objects;

        const disconnactable = objects.filter(object => !!object.disconnect);
        disconnactable.forEach(object => {
            object.disconnect();
        });

        this.scoreboard.disconnect();
    }
};