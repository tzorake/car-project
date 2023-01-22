
import { Rectangle } from "../math/Rectangle.mjs";
import { CarObjectController, DirectionState } from "./CarObjectController.mjs";
import { CarObjectRenderer } from "./CarObjectRenderer.mjs";
import { DebugInfo } from "../debug/DebugInfo.mjs";
import { GameObject } from "../game/GameObject.mjs";

const SECOND_TO_MILLISECONDS = 1000;

export class CarObject extends GameObject
{
    #debugWidget = null;

    // #engineForce               = 8000.0*5;
    // #reverseForce              = 12000.0*5;
    // #brakingForce              = 16800.0*5;

    // #dragConstant              = 0.4257;
    // #rollingResistanceConstant = 12.8;

    // #steer = 0.0;
    
    constructor(x, y, width, height)
    {
        super(x, y, width, height);

        this.mass = 1200.0;

        this.renderer = new CarObjectRenderer(this);
        this.controller = new CarObjectController(this);
        this.controller.connect();
     
        this.debugWidget = new DebugInfo(this, ['position', 'scale', 'velocity', 'heading'], new Rectangle(10, 10, 275, 200));
    }

    update(dt) 
    {
        // const { direction, actions } = this.controller.values();

        // const time  = dt/SECOND_TO_MILLISECONDS;

        // const engineForce               = this.engineForce;
        // const reverseForce              = this.reverseForce;
        // const brakingForce              = this.brakingForce;
        // const mass                      = this.mass;
        // const dragConstant              = this.dragConstant;
        // const rollingResistanceConstant = this.rollingResistanceConstant;

        // const L                         = 3/5*this.scale.x;

        // const heading                   = this.heading;
        // const initialPosition           = this.position;
        
        // let velocity                    = this.velocity.x;
        // let angularVelocity             = this.velocity.y;

        // const tractionForce             = (direction.horizontal > 0 ? engineForce : 0.0) -
        //                                   (direction.horizontal < 0 ? reverseForce : 0.0) -
        //                                   (actions.brake ? (Math.abs(velocity) < 0.5 ? 0 : (velocity > 0 ? DirectionState.POSITIVE : DirectionState.NEGATIVE) * brakingForce) : 0.0)  

        // const dragForce                 = -dragConstant * velocity * velocity;
        // const rollingResistanceForce    = -rollingResistanceConstant * velocity;

        // const force                     = tractionForce + dragForce + rollingResistanceForce;
        // const acceleration              = force / mass;

        // velocity                        = velocity + acceleration * time;
        // velocity                        = (Math.abs(velocity) < 0.5 && direction.horizontal === DirectionState.ZERO) ? 0.0 : velocity;
        
        // const steerInput = direction.vertical;

        // if (steerInput !== DirectionState.ZERO) 
        // {
        //     this.steer = Math.min(Math.max(this.steer + steerInput * dt * 1.0, -1.0), 1.0);
        // } 
        // else 
        // {
        //     if (this.steer > 0) 
        //     {
        //         this.steer = Math.max(this.steer - dt * 0.1, 0);
        //     } 
        //     else if (this.steer < 0) 
        //     {
        //         this.steer = Math.min(this.steer + dt * 0.1, 0);
        //     }
        // }

        // const avel = Math.min(Math.abs(velocity), 240.0); // m/s
        // this.steer = this.steer * (1.0 - avel / 280.0);

        // const steerAngle = this.steer * Math.PI/4;

        // const R = L / Math.sin(steerAngle);
        // angularVelocity = velocity / R;
        // this.heading.angle += angularVelocity * time;
        // this.heading.angle = this.heading.angle % (Math.PI * 2);


        // this.velocity = new Vector2D(velocity, angularVelocity);

        // const position                  = initialPosition.add(heading.multiplyScalar(velocity*time));
        // this.position                   = position;
    }

    get debugWidget()
    {
        return this.#debugWidget;
    }

    set debugWidget(value)
    {
        this.#debugWidget = value;
    }

    get position()
    {
        return super.position;
    }

    set position(value)
    {
        super.position = value;
        this.debugWidget.update();
    }

    get velocity()
    {
        return super.velocity;
    }

    set velocity(value)
    {
        super.velocity = value;
        this.debugWidget.update();
    }
};