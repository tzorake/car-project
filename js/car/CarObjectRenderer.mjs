import { GameObjectRenderer } from "../game/GameObjectRenderer.mjs";
import { GameUtils } from "../game/GameUtils.mjs";
import { TypeChecker } from "../math/TypeChecker.mjs";
import { Vector2D } from "../math/Vector2D.mjs";
import { CarCamera } from "./CarCamera.mjs";

export class CarObjectRenderer extends GameObjectRenderer
{
    constructor(gameObject)
    {
        super(gameObject);
    }

    render()
    {
        super.render();
    }

    // render()
    // {
    //     const gameObject = this.gameObject;

    //     if (!TypeChecker.isGameObject(gameObject))
    //     {
    //         throw new Error('GameObjectRenderer.render(gameObject) : Passed object must be inherited from `GameObject`!');
    //     }

    //     const canvas = GameUtils.CANVAS;
    //     const context = GameUtils.CONTEXT;
    //     const scaleFactor = 10;
    //     const position = gameObject.position.multiplyScalar(scaleFactor);
    //     const heading = gameObject.heading;
    //     const offset = new Vector2D(canvas.width / 2, canvas.height /2);

    //     GameUtils.BACKGROUND('rgba(0, 0, 0, 1.0)');

    //     const vertices = gameObject.vertices().map(item => item.multiplyScalar(scaleFactor).add(offset));
    //     const object = new Path2D(`M ${vertices[0].x} ${vertices[0].y} 
    //                                L ${vertices[1].x} ${vertices[1].y} 
    //                                L ${vertices[2].x} ${vertices[2].y} 
    //                                L ${vertices[3].x} ${vertices[3].y} Z`);
    //     context.fillStyle = 'rgba(127, 0, 255, 1.0)';
    //     context.strokeStyle = 'rgba(0, 0, 0, 1.0)';
    //     context.fill(object);

    //     const xAxis = heading.multiplyScalar(scaleFactor);
    //     const xEnd = position.add(xAxis);

    //     const yAxis = heading.rotated(Math.PI/2).multiplyScalar(scaleFactor);
    //     const yEnd = position.add(yAxis);

    //     context.lineWidth = 0.5;
    //     context.strokeStyle = 'rgba(255, 0, 0, 1.0)';
    //     context.beginPath();
    //     context.moveTo(position.x, position.y);
    //     context.lineTo(xEnd.x, xEnd.y);
    //     context.stroke();

    //     context.strokeStyle = 'rgba(0, 0, 255, 1.0)';
    //     context.beginPath();
    //     context.moveTo(position.x, position.y);
    //     context.lineTo(yEnd.x, yEnd.y);
    //     context.stroke();

    //     context.beginPath();
    //     context.arc(position.x, position.y, 0.5, 0, 2*Math.PI);
    //     context.fillStyle = 'rgba(0, 255, 0, 0.6)'; 
    //     context.strokeStyle = 'rgba(0, 0, 0, 1.0)';
    //     context.fill();
    // }
}