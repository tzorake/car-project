import { Rectangle } from "../math/Rectangle.mjs";
import { CarAction, CarObjectController } from "./CarObjectController.mjs";
import { CarObjectRenderer } from "./CarObjectRenderer.mjs";
import { DebugInfo } from "../debug/DebugInfo.mjs";
import { GameObject } from "../game/GameObject.mjs";
import { Vector2D } from "../math/Vector2D.mjs";
import { MathFunction } from "../math/MathFunction.mjs";

let iota = 0;
const CarGear = {};
CarGear.REVERSE = iota++;
CarGear.ZERO    = iota++;
CarGear.FIRST   = iota++;
CarGear.SECOND  = iota++;
CarGear.THIRD   = iota++;
CarGear.FORTH   = iota++;
CarGear.FIFTH   = iota++;

const CarGears = {};
CarGears[CarGear.REVERSE] = -2.9;
CarGears[CarGear.ZERO]    =  0.0;
CarGears[CarGear.FIRST]   =  3.0;
CarGears[CarGear.SECOND]  =  2.0;
CarGears[CarGear.THIRD]   =  1.5;
CarGears[CarGear.FORTH]   =  1.25;
CarGears[CarGear.FIFTH]   =  0.75;

const MAX_STEERING_ANGLE = Math.PI / 12;

export class CarObject extends GameObject
{
    #debugWidget = null;
    
    constructor(x, y, length, width)
    {
        super(x, y, length, width);

        this.renderer = new CarObjectRenderer(this);
        this.controller = new CarObjectController(this);
        this.controller.connect();
     
        this.#debugWidget = new DebugInfo(this, ['position', 'scale', 'velocity', 'heading', 'angle'], new Rectangle(10, 10, 275, 200));

        this.maxSpeed = 25;
        this.maxAngle = 2*Math.PI
        this.drag = 0.975
        this.traction = 0.95;
    }

    update(dt)
    {
        const controller = this.controller;
        
        controller.update();
        
        const direction = controller.direction;
        const actions = controller.actions;

        this.velocity = this.velocity.add(this.heading.multiplyScalar(direction.horizontal*dt));
        this.position = this.position.add(this.velocity);

        this.velocity = this.velocity.multiplyScalar(this.drag);
        this.velocity = this.velocity.clampMagnitude(this.maxSpeed);

        this.angle   += this.velocity.magnitude() * this.maxAngle * direction.vertical * dt;

        this.velocity = Vector2D.lerp(this.velocity.normalized(), this.heading.multiplyScalar(this.velocity.magnitude()), this.traction*dt)//.multiplyScalar(this.velocity.magnitude())
    }

    get position()
    {
        return super.position;
    }

    set position(value)
    {
        super.position = value;
        this.#debugWidget.update();
    }

    get velocity()
    {
        return super.velocity;
    }

    set velocity(value)
    {
        super.velocity = value;
        this.#debugWidget.update();
    }
};