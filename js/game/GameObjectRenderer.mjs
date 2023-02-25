import { GameUtils } from "./GameUtils.mjs";

export class GameObjectRenderer
{
    constructor({ parent })
    {
        this.parent = parent;
    }

    render(dt)
    {
        const gameObject = this.parent;
        const world = gameObject.world;
        const player = world.player;
        const camera = player.camera;
        const offset = camera.offset;

        const scale = GameUtils.SCALE;
        const position = gameObject.position.add(offset).multiplyScalar(scale);
        const heading = gameObject.heading;

        const vertices = gameObject.vertices().map(item => item.multiplyScalar(scale).add(position));
        const path = new Path2D(`M ${vertices[0].x} ${vertices[0].y} L ${vertices[1].x} ${vertices[1].y} L ${vertices[2].x} ${vertices[2].y} L ${vertices[3].x} ${vertices[3].y} Z`);

        GameUtils.SAVE();

        GameUtils.FILL_STYLE('rgba(127, 0, 255, 1.0)');
        GameUtils.STROKE_STYLE('rgba(0, 0, 0, 1.0)');
        GameUtils.FILL(path);

        const xAxis = heading.multiplyScalar(scale*4);
        const xEnd = position.add(xAxis);

        const yAxis = heading.rotated(Math.PI/2).multiplyScalar(scale*4);
        const yEnd = position.add(yAxis);

        GameUtils.STROKE_STYLE('rgba(255, 0, 0, 1.0)');
        GameUtils.LINE_WIDTH(0.5);
        GameUtils.BEGIN_PATH();
        GameUtils.MOVE_TO(position.x, position.y)
        GameUtils.LINE_TO(xEnd.x, xEnd.y);
        GameUtils.STROKE();

        GameUtils.STROKE_STYLE('rgba(0, 0, 255, 1.0)');
        GameUtils.BEGIN_PATH();
        GameUtils.MOVE_TO(position.x, position.y)
        GameUtils.LINE_TO(yEnd.x, yEnd.y);
        GameUtils.STROKE();

        GameUtils.FILL_STYLE('rgba(0, 255, 0, 0.6)');
        GameUtils.STROKE_STYLE('rgba(0, 0, 0, 1.0)');
        GameUtils.BEGIN_PATH();
        GameUtils.CIRCLE(position.x, position.y, 0.5);
        GameUtils.FILL();

        GameUtils.RESTORE();
    }
};