import { GameObjectRenderer } from "../game/GameObjectRenderer.mjs";
import { GameUtils } from "../game/GameUtils.mjs";

export class CarObjectRenderer extends GameObjectRenderer
{
    constructor(gameObject)
    {
        super(gameObject);
    }

    render(dt)
    {
        super.render(dt);

        const gameObject = this.gameObject;
        const world = gameObject.world;
        const camera = world.camera;
        const offset = camera.offset;

        const context = GameUtils.CONTEXT;
        const scale = GameUtils.SCALE;
        const position = gameObject.position.add(offset).multiplyScalar(scale);
        const velocity = gameObject.velocity.multiplyScalar(scale);
        const end = position.add(velocity);

        context.save();

        context.strokeStyle = 'rgba(0, 255, 255, 1.0)';

        context.beginPath();
        context.moveTo(position.x, position.y);
        context.lineTo(end.x, end.y);
        context.stroke();

        context.restore();

    }
}