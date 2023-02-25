import { CarObjectType } from "../car/CarObject.mjs";
import { GameCamera } from "./GameCamera.mjs";
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
        
        const pool = [track].concat([player]).concat(enemies);

        pool.forEach(object => { 
            object.world = this; 
        });
    }

    // append(object)
    // {
    //     object.world = this;
    //     this.other.push(object);
    // }

    update(dt)
    {
        const track = this.track;
        const player = this.player;
        const enemies = this.enemies;
        
        const pool = [track].concat([player]).concat(enemies);
        pool.forEach(object => {
            object.update(dt)
        });
    }

    render(dt)
    {
        const track = this.track;
        const player = this.player;
        const enemies = this.enemies;

        const pool = [track].concat([player]).concat(enemies);

        GameUtils.BACKGROUND('rgba(32, 33, 36, 1.0)');

        pool.forEach(object => {
            object.render(dt)
        });
    }

    connect()
    {
        const track = this.track;
        const player = this.player;
        const enemies = this.enemies;

        const pool = [track].concat([player]).concat(enemies);

        const connactable = pool.filter(object => !!object.connect);
        console.info(connactable);
        connactable.forEach(object => {
            object.connect();
        });
    }

    disconnect()
    {
        const track = this.track;
        const player = this.player;
        const enemies = this.enemies;

        const pool = [track].concat([player]).concat(enemies);

        const disconnactable = pool.filter(object => !!object.disconnect);
        disconnactable.forEach(object => {
            object.disconnect();
        });
    }
};