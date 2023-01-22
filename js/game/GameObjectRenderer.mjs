import { GameUtils } from "./GameUtils.mjs";
import { TypeChecker } from "../math/TypeChecker.mjs";

export class GameObjectRenderer
{
    constructor()
    {
        
    }

    render(gameObject)
    {
        if (!TypeChecker.isGameObject(gameObject))
        {
            throw new Error('GameObjectRenderer.render(gameObject) : Passed object must be inherited from `GameObject`!');
        }

        const context = GameUtils.CONTEXT;

        const position = gameObject.position;
        const heading = gameObject.heading;

        GameUtils.BACKGROUND('rgba(0, 0, 0, 1.0)');

        const vertices = gameObject.vertices();
        const object = new Path2D(`M ${vertices[0].x} ${vertices[0].y} L ${vertices[1].x} ${vertices[1].y} L ${vertices[2].x} ${vertices[2].y} L ${vertices[3].x} ${vertices[3].y} Z`);
        context.fillStyle = 'rgba(127, 0, 255, 1.0)';
        context.strokeStyle = 'rgba(0, 0, 0, 1.0)';
        context.fill(object);

        const axisFactor = 40;

        const xAxis = heading;
        const xEnd = position.add(xAxis.multiplyScalar(axisFactor));

        const yAxis = heading.rotated(Math.PI/2);
        const yEnd = position.add(yAxis.multiplyScalar(axisFactor));

        context.strokeStyle = 'rgba(255, 0, 0, 1.0)';
        context.beginPath();
        context.moveTo(position.x, position.y);
        context.lineTo(xEnd.x, xEnd.y);
        context.stroke();

        context.strokeStyle = 'rgba(0, 0, 255, 1.0)';
        context.beginPath();
        context.moveTo(position.x, position.y);
        context.lineTo(yEnd.x, yEnd.y);
        context.stroke();

        context.beginPath();
        context.arc(position.x, position.y, 1, 0, 2*Math.PI);
        context.fillStyle = 'rgba(0, 255, 0, 0.6)'; 
        context.strokeStyle = 'rgba(0, 0, 0, 1.0)';
        context.fill();
    }
};