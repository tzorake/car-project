import { Vector2 } from "../math/Vector2.mjs";

export class GameObject
{
    #heading;
    #properties = {};

    constructor({ x, y, width, height })
    {
        this.position = new Vector2(x, y);          // position
        this.scale    = new Vector2(width, height); // width and height
        this.velocity = new Vector2(0.0, 0.0);      // velocity

        this.#heading = new Vector2(1.0, 0.0);      // heading direction

        this.mass = 1.0;
        this.world = null;
        this.acceleration = new Vector2(0.0, 0.0);

        this.renderer = null;
        this.controller = null;
    }

    get heading() 
    {
        return this.#heading;
    }

    get angle() 
    {
        return this.#heading.angle;
    }

    set angle(value) 
    {
        this.#heading.angle = value;
    }

    update(dt) 
    {
        throw new Error('GameObject.update(dt) : The method is not implemented yet!');
    }

    render(dt)
    {
        const renderer = this.renderer;

        if (renderer)
        {
            renderer.render(dt);
        }
    }

    vertices() 
    {
        const heading = this.heading;
        const scale = this.scale;
        const angle = heading.angle;
        const [width, height] = [scale.x, scale.y]
        const vertices = [
            new Vector2(
                - width/2, 
                - height/2
            ),
            new Vector2(
                + width/2, 
                - height/2
            ),
            new Vector2(
                + width/2, 
                + height/2
            ),
            new Vector2(
                - width/2, 
                + height/2
            )
        ];
        
        return vertices.map(v => v.rotated(angle));
    }

    getProperty(key)
    {
        return this.#properties[key];
    }

    setProperty(key, value)
    {
        this.#properties[key] = value;
    }
}