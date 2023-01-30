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

        const gameObject = this.gameObject;

        const context = GameUtils.CONTEXT;
        const scaleFactor = GameUtils.SCALE;
        const position = gameObject.position.multiplyScalar(scaleFactor);
        const velocity = gameObject.velocity.multiplyScalar(scaleFactor*scaleFactor);

        const end = position.add(velocity);

        context.strokeStyle = 'rgba(0, 255, 255, 1.0)';
        context.beginPath();
        context.moveTo(position.x, position.y);
        context.lineTo(end.x, end.y);
        context.stroke();

    }
}