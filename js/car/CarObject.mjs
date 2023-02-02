import { Rectangle } from "../math/Rectangle.mjs";
import { CarObjectController } from "./CarObjectController.mjs";
import { CarObjectRenderer } from "./CarObjectRenderer.mjs";
import { DebugInfo } from "../debug/DebugInfo.mjs";
import { GameObject } from "../game/GameObject.mjs";
import { Vector2D } from "../math/Vector2D.mjs";

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

        // this.maxVelocity = 50.0
        // this.maxSpeed = 25.0;
        // this.drag = 0.98
        // this.steerAngle = Math.PI/20;
        // this.traction = 10.0;
        
        this.maxVelocity = 50.0
        this.maxSpeed = 25.0;
        this.drag = 0.98
        this.steerAngle = Math.PI/20;
        this.traction = 0.1;
    }

    update(dt)
    {
        const controller = this.controller;
        
        const direction = controller.direction;
        const actions = controller.actions;

        const acceleration = this.heading.multiplyScalar(this.maxVelocity * direction.horizontal)

        this.velocity = this.velocity.add(acceleration.multiplyScalar(dt));
        this.position = this.position.add(this.velocity.multiplyScalar(dt));

        this.angle   += direction.vertical * this.velocity.magnitude() * this.steerAngle * dt;

        if (this.velocity.magnitude() > 0)
        {
            this.velocity = this.velocity.multiplyScalar(this.drag);
            this.velocity = this.velocity.clampMagnitude(this.maxSpeed);
    
            this.velocity = Vector2D.lerp(this.velocity.normalized(), this.heading, this.traction*dt).multiplyScalar(this.velocity.magnitude())
        }
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