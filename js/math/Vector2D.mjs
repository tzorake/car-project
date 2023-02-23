import { MathFunction } from "./MathFunction.mjs";

export class Vector2D 
{
    #x;
    #y;

    constructor(x = 0.0, y = 0.0) 
    {
        this.#x = x;
        this.#y = y;
    }

    get x() 
    {
        return this.#x;
    }

    set x(value)
    {
        this.#x = value;
    }

    get y() 
    {
        return this.#y;
    }

    set y(value)
    {
        this.#y = value;
    }

    rotated(theta, c) 
    {
        c = c == null ? c = new Vector2D(0.0, 0.0) : c;

        return new Vector2D(
            (this.x - c.x)*Math.cos(theta) - (this.y - c.y)*Math.sin(theta) + c.x,
            (this.x - c.x)*Math.sin(theta) + (this.y - c.y)*Math.cos(theta) + c.y
        );
    }

    rotate(theta, c) 
    {
        c = c == null ? c = new Vector2D(0.0, 0.0) : c;

        this.x = (this.x - c.x)*Math.cos(theta) - (this.y - c.y)*Math.sin(theta) + c.x;
        this.y = (this.x - c.x)*Math.sin(theta) + (this.y - c.y)*Math.cos(theta) + c.y;
        
        return this;
    }

    magnitude()
    {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    get angle()
    {
        return Math.atan2(this.y, this.x);
    }

    set angle(value)
    {
        let m = this.magnitude();
        this.x = m * Math.cos(value);
        this.y = m * Math.sin(value);
    }

    add(...other) 
    {
        return new Vector2D(
            this.x + other.reduce((acc, item) => acc += item.x, 0.0), 
            this.y + other.reduce((acc, item) => acc += item.y, 0.0)
        );
    }

    sub(...other)
    {
        return new Vector2D(
            this.x + other.reduce((acc, item) => acc -= item.x, 0.0), 
            this.y + other.reduce((acc, item) => acc -= item.y, 0.0)
        );
    }

    dot(other) 
    {
        return this.x*other.x + this.y*other.y;
    }

    multiplyScalar(scalar) 
    {
        return new Vector2D(
            scalar*this.x, 
            scalar*this.y
        );
    }

    copy()
    {
        return new Vector2D(this.x, this.y);
    }

    normalize()
    {
        const m = this.magnitude();
        if (m > 0)
        {
            this.x *= 1.0 / m;
            this.y *= 1.0 / m;
        }
        return this;
    }

    normalized()
    {
        return this.copy().normalize();
    }

    clampMagnitude(magnitude)
    {
        return this.magnitude() > magnitude ? this.normalized().multiplyScalar(magnitude) : new Vector2D(this.x, this.y);
    }

    static lerp(a, b, t)
    {
        return new Vector2D(
            MathFunction.lerp(a.x, b.x, t),
            MathFunction.lerp(a.y, b.y, t) 
        )
    }

    toString()
    {
        return `{ x: ${this.x.toFixed(2)}, y: ${this.y.toFixed(2)} }`
    }
};