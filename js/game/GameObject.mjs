import { TypeChecker } from "../math/TypeChecker.mjs";
import { Vector2D } from "../math/Vector2D.mjs";

export class GameObject
{
    #position;
    #scale;
    #velocity;
    #acceleration;
    #heading;
    #mass;

    #world;

    #renderer;
    #controller;

    constructor(x, y, width, height)
    {
        this.#heading      = new Vector2D(1.0, 0.0);      // heading direction
        this.#position     = new Vector2D(x, y);          // position
        this.#scale        = new Vector2D(width, height); // width and height
        this.#velocity     = new Vector2D(0.0, 0.0);      // velocity

        this.#renderer   = null;                          // renderer
        this.#controller = null;                          // controller
    }

    get position() 
    {
        return this.#position;
    }

    set position(value) 
    {
        this.#position = value;
    }

    get angle() 
    {
        return this.#heading.angle;
    }

    set angle(value) 
    {
        this.#heading.angle = value;
    }

    get scale() 
    {
        return this.#scale;
    }

    set scale(value) 
    {
        this.#scale = value;
    }

    get velocity() 
    {
        return this.#velocity;
    }

    set acceleration(value) 
    {
        this.#acceleration = value;
    }

    get acceleration() 
    {
        return this.#acceleration;
    }

    set velocity(value) 
    {
        this.#velocity = value;
    }

    get heading() 
    {
        return this.#heading;
    }

    get rotation() 
    {
        return this.heading.angle();
    }

    get mass() 
    {
        return this.#mass;
    }

    set mass(value) 
    {
        this.#mass = value;
    }

    get world()
    {
        return this.#world;
    }

    set world(value) 
    {
        this.#world = value;
    }

    get renderer() 
    {
        return this.#renderer;
    }

    set renderer(value) 
    {
        this.#renderer = value;
    }

    get controller()
    {
        return this.#controller;
    }

    set controller(value)
    {
        this.#controller = value;
    }

    update(dt) 
    {
        throw new Error('GameObject.update(dt) : The method is not implemented yet!');
    }

    render(dt, offset)
    {
        const renderer = this.renderer;

        if (!TypeChecker.isGameObjectRenderer(renderer))
        {
            throw new Error('GameObject.render() : `renderer`  has to be `isGameObjectRenderer` type!');
        }

        renderer.render(dt, offset);
    }

    vertices() 
    {
        const center = this.position;
        const heading = this.heading;
        const scale = this.scale;
        const angle = heading.angle;
        const [x, y] = [center.x, center.y];
        const [width, height] = [scale.x, scale.y]
        const vertices = [
            new Vector2D(
                - width/2, 
                - height/2
            ),
            new Vector2D(
                + width/2, 
                - height/2
            ),
            new Vector2D(
                + width/2, 
                + height/2
            ),
            new Vector2D(
                - width/2, 
                + height/2
            )
        ];
        
        return vertices.map(v => v.rotated(angle));
    }
}