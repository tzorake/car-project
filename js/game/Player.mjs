import { CarObject, CarObjectType } from "../car/CarObject.mjs";
import { GameCamera, GameCameraMode } from "./GameCamera.mjs";
import { GameUtils } from "./GameUtils.mjs";

export class Player
{
    constructor()
    {
        const canvas = GameUtils.CANVAS;
        const scale = GameUtils.SCALE;

        this.car = new CarObject({ 
            x: 0.0, 
            y: 0.0, 
            width: 5.0, 
            height: 2.0, 
            type: CarObjectType.PLAYER 
        }),
        this.camera = new GameCamera({ 
            x: 0.0, 
            y: 0.0, 
            width: canvas.width / scale, 
            height: canvas.height / scale, 
            mode: GameCameraMode.FOLLOW 
        })
    }

    update(dt)
    {
        const car = this.car;
        const camera = this.camera;

        const pool = [car].concat([camera])

        pool.forEach(object => object.update(dt));
    }

    render(dt)
    {
        const car = this.car;

        const pool = [car.renderer];

        pool.forEach(renderer => renderer.render(dt));
    }

    set world(value)
    {
        this.car.world = value;
        this.camera.world = value;
    }
    
    connect()
    {
        this.car.connect();
    }

    disconnect()
    {
        this.car.connect();
    }
};