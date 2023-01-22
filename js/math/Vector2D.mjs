import { TypeChecker } from "./TypeChecker.mjs";

export class Vector2D 
{
    #x;
    #y;

    constructor(x, y) 
    {
        if (TypeChecker.isNumber(x) && TypeChecker.isNumber(y))
        {
            this.#x = x;
            this.#y = y;
        }
        else
        {
            throw new Error('Vector2D.constructor(x, y) : Constructor arguments (`x` and `y`) must have `Number` type!');
        }
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

        if (TypeChecker.isNumber(theta) && TypeChecker.isVector2D(c))
        {
            return new Vector2D(
                (this.x - c.x)*Math.cos(theta) - (this.y - c.y)*Math.sin(theta) + c.x,
                (this.x - c.x)*Math.sin(theta) + (this.y - c.y)*Math.cos(theta) + c.y
            );
        }

        throw new Error('Vector2D.rotated(theta, c) : First function argument must have `Number` type and second one must have `Vector2D` type!');
    }

    rotate(theta, c) 
    {
        c = c == null ? c = new Vector2D(0.0, 0.0) : c;

        if (TypeChecker.isNumber(theta) && TypeChecker.isVector2D(c))
        {
            this.x = (this.x - c.x)*Math.cos(theta) - (this.y - c.y)*Math.sin(theta) + c.x;
            this.y = (this.x - c.x)*Math.sin(theta) + (this.y - c.y)*Math.cos(theta) + c.y;
            
            return this;
        }

        throw new Error('Vector2D.rotate(theta, c) : First function argument must have `Number` type and second one must have `Vector2D` type!');
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
        if (other.every(v => TypeChecker.isVector2D(v)))
        {
            return new Vector2D(
                this.x + other.reduce((acc, item) => acc += item.x, 0.0), 
                this.y + other.reduce((acc, item) => acc += item.y, 0.0)
            );
        }
        
        throw new Error('Vector2D.add(...other) : Each of function argument must have `Vector2D` type!');
    }

    multiply(other) 
    {
        if (TypeChecker.isVector2D(other)) 
        {
            return this.x*other.x + this.y*other.y;
        }

        throw new Error('Vector2D.multiply(other) : Function argument must have `Vector2D` type!');
    }

    multiplyScalar(scalar) 
    {
        if (TypeChecker.isNumber(scalar))
        {
            return new Vector2D(
                scalar*this.x, 
                scalar*this.y
            );
        }

        throw new Error('Vector2D.multiplyScalar(scalar) : Function argument should has `Number` type!');
    }

    toString()
    {
        return `{ x: ${this.x.toFixed(2)}, y: ${this.y.toFixed(2)} }`
    }
};