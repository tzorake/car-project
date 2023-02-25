import { Rectangle } from "../math/Rectangle.mjs";
import { CarObjectController } from "./CarObjectController.mjs";
import { CarObjectRenderer } from "./CarObjectRenderer.mjs";
import { DebugInfo } from "../debug/DebugInfo.mjs";
import { GameObject } from "../game/GameObject.mjs";
import { Vector2D } from "../math/Vector2D.mjs";

let iota = 0;
export const CarObjectType = {};
CarObjectType.PLAYER = iota++;
CarObjectType.ENEMY = iota++;

export class CarObject extends GameObject
{
    #debugWidget = null;
    
    constructor({ x, y, width, height, type })
    {
        super({ x, y, width, height });

        this.type = type ? type : CarObjectType.ENEMY;
        
        this.maxVelocity = 50.0
        this.maxSpeed = 25.0;
        this.drag = 0.98
        this.steerAngle = Math.PI/20;
        this.traction = 0.1;

        this.setProperty('focusable', true);

        this.renderer = new CarObjectRenderer({ parent: this });
        this.controller = new CarObjectController({ parent: this });
     
        this.#debugWidget = new DebugInfo({
            props: ['position', 'scale', 'velocity', 'heading', 'angle'], 
            rect: new Rectangle(10, 10, 275, 200), 
            parent: this
        });
    }

    update(dt)
    {
        const controller = this.controller;

        if (controller)
        {
            controller.update(dt);
        }
        
        const direction = controller.direction;
        const actions = controller.actions;

        const acceleration = this.heading.multiplyScalar(this.maxVelocity * direction.horizontal)

        this.velocity = this.velocity.add(acceleration.multiplyScalar(dt));
        this.position = this.position.add(this.velocity.multiplyScalar(dt));

        this.angle   += direction.vertical * this.velocity.magnitude() * this.steerAngle * dt;

        this.velocity = this.velocity.multiplyScalar(this.drag);
        this.velocity = this.velocity.clampMagnitude(this.maxSpeed);
        this.velocity = Vector2D.lerp(this.velocity.normalized(), this.heading, this.traction*dt).multiplyScalar(this.velocity.magnitude())

        this.#debugWidget.update();
    }

    connect()
    {
        this.controller.connect();
    }

    disconnect()
    {
        this.controller.disconnect();
    }
};