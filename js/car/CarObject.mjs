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
     
        this.#debugWidget = new DebugInfo(this, ['position', 'scale', 'velocity', 'acceleration', 'angle'], new Rectangle(10, 10, 275, 200));

        this.angle = 0.0
        this.length = this.scale.x;
        this.width = this.scale.y;
        this.brake_deceleration = 30000
        this.free_deceleration = 2

        this.gear = CarGear.ZERO;
        this.throttle = 0
        this.brakes = 0
        this.wheel_rpm = 0
        this.angular_velocity = 0
        this.force = new Vector2D(0, 0)

        this.rpm_lut = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];
        this.torque_lut = [200, 325, 475, 550, 550, 500, 375, 300, 0];
        this.rpm = 1000;
        this.diff_ratio = 3.42
        this.n = 0.8
        this.wheel_radius = 0.35
        this.mass = 1100
        this.c_drag = 0.4257
        this.cornering_stiffness_f = -5.0
        this.cornering_stiffness_r = -5.2
        this.max_grip = 2.0
    }

    update(dt) 
    {
        const controller = this.controller;
        const direction = controller.direction;
        const actions = controller.actions;

        controller.update();

        if (this.rpm < 2000)
        {
            this.rpm = 2000;
        }
        const torque = MathFunction.interp(this.rpm, this.rpm_lut, this.torque_lut);
        const throttle = (actions.keyPressed[CarAction.THROTTLE] | actions.keyPressed[CarAction.REVERSE]) * Math.abs(direction.horizontal);
        const steer = (actions.keyPressed[CarAction.TURN_RIGHT] | actions.keyPressed[CarAction.TURN_LEFT]) * direction.vertical;
        
        this.gear = actions.keyPressed[CarAction.REVERSE] ? CarGear.REVERSE : (actions.keyPressed[CarAction.THROTTLE] ? CarGear.FIRST : CarGear.ZERO);

        const steering = MAX_STEERING_ANGLE * steer;

        const traction_force = torque * this.diff_ratio * throttle * CarGears[this.gear] * (this.n / this.wheel_radius) - 
                               this.brake_deceleration * this.brakes * Math.sign(this.velocity.x);

        const resistance_force = new Vector2D(-this.c_drag * this.velocity.x * Math.abs(this.velocity.x) - 12.8 * this.velocity.x,
                                              -this.c_drag * this.velocity.y * Math.abs(this.velocity.y) - 12.8 * this.velocity.y)

        if (this.velocity.x > 5.55)
        {
            const yawspeed = this.angular_velocity * 2;

            const [rot_angle, sideslip] = this.velocity.x == 0 ? [0, 0] : [Math.atan2(yawspeed, this.velocity.x), Math.atan2(this.velocity.y, this.velocity.x)];

            const slipanglefront = sideslip + rot_angle - steering;
            const slipanglerear = sideslip - rot_angle;

            const flatf = new Vector2D(0, 0);
            const flatr = new Vector2D(0, 0);

            flatf.x = 0;
            flatf.y = this.cornering_stiffness_f * slipanglefront;
            flatf.y = Math.min(this.max_grip, flatf.y);
            flatf.y = Math.max(-this.max_grip, flatf.y);
            flatf.y *= this.mass * 4.9;

            flatr.x = 0;
            flatr.y = this.cornering_stiffness_r * slipanglerear;
            flatr.y = Math.min(this.max_grip, flatr.y);
            flatr.y = Math.max(-this.max_grip, flatr.y);
            flatr.y *= this.mass * 4.9;

            this.force.x = traction_force + Math.sin(steering) * flatf.x + flatr.x + resistance_force.x
            this.force.y = Math.cos(steering) * flatf.y + flatr.y + resistance_force.y

            const torque = 1.5 * (flatf.y - flatr.y);

            this.acceleration = this.force.multiplyScalar(1.0 / this.mass);
            this.wheel_rpm = this.velocity.x / this.wheel_radius * 30 / Math.PI;

            this.velocity = this.velocity.add(this.acceleration.multiplyScalar(dt));
            this.position = this.position.add(this.velocity.rotated(this.angle).multiplyScalar(dt));

            const angular_acceleration = torque / 1000;
            this.angular_velocity += angular_acceleration * dt;
            this.angle += this.angular_velocity * dt;
        }
        else
        {
            this.force.x = traction_force + resistance_force.x;
            this.force.y = resistance_force.y;
            this.acceleration = this.force.multiplyScalar(1.0 / this.mass);
            this.wheel_rpm = this.velocity.x / this.wheel_radius * 30 / Math.PI;

            this.velocity = this.velocity.add(this.acceleration.multiplyScalar(dt));

            const angular_velocity = steering ? this.velocity.x / (this.length / Math.tan(steering)) : 0;

            this.position = this.position.add(this.velocity.rotated(this.angle).multiplyScalar(dt));
            this.angle += angular_velocity * dt;
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