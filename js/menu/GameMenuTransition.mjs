import { GameUtils } from "../game/GameUtils.mjs";
import { MathFunction } from "../math/MathFunction.mjs";
import { Vector2 } from "../math/Vector2.mjs";
import { GameUIComponent } from "./base/GameUIComponent.mjs";
import { GameUIComponentGroup } from "./base/GameUIComponentGroup.mjs";

let iota = 0;
export const GameMenuTransitionState = {};
GameMenuTransitionState.DEFAULT = iota++;
GameMenuTransitionState.FORWARD_STARTED = iota++;
GameMenuTransitionState.FORWARD_FINISHED = iota++;
GameMenuTransitionState.BACKWARD_STARTED = iota++;
GameMenuTransitionState.BACKWARD_FINISHED = iota++; 

iota = 0;
const GameMenuTransitionDirection = {};
GameMenuTransitionDirection.HORIZONTAL = iota++;
GameMenuTransitionDirection.VERTICAL = iota++;

iota = 0;
const GameMenuTransitionPosition = {};
GameMenuTransitionPosition.TOP = iota++;
GameMenuTransitionPosition.BOTTOM = iota++;
GameMenuTransitionPosition.LEFT = iota++;
GameMenuTransitionPosition.RIGHT = iota++;

class GameMenuTransitionComponent extends GameUIComponent
{
    constructor({ center, dimension, direction, position, callbacks = {}, parent })
    {
        super({ center, dimension, callbacks, parent });

        this.direction = direction;
        this.position = position;

        this.animation = 0.0;
        this.duration = 1.0;
    }
    
    update(dt)
    {
        switch (this.state)
        {
            case GameMenuTransitionState.FORWARD_STARTED:
            {
                this.animation += dt / this.duration;
                this.animation = MathFunction.clamp(this.animation, 0.0, 1.0);

                if (this.animation === 1.0)
                {
                    this.state = GameMenuTransitionState.FORWARD_FINISHED;

                    const callback = this.transitionCallback;
                    
                    if (callback)
                    {
                        callback();

                        this.transitionCallback = null;
                    }
                }
            } break;

            case GameMenuTransitionState.BACKWARD_STARTED:
            {
                this.animation -= dt / this.duration;
                this.animation = MathFunction.clamp(this.animation, 0.0, 1.0);

                if (this.animation  === 1.0)
                {
                    this.state = GameMenuTransitionState.BACKWARD_FINISHED;

                    const callback = this.transitionCallback;

                    if (callback)
                    {
                        callback();

                        this.transitionCallback = null;
                    }
                }
            } break;

            default:
            {
                
            }
        }

        
    }

    render(dt)
    {
        const center = this.center;
        const dimension = this.dimension;
        const animation = this.animation;
        const direction = this.direction;
        const position = this.position;

        const w = direction === GameMenuTransitionDirection.HORIZONTAL ? dimension.x * animation : dimension.x;
        const h = direction === GameMenuTransitionDirection.VERTICAL ? dimension.y * animation : dimension.y;
        
        const horizontalSign = position === GameMenuTransitionPosition.LEFT ? -1 : ( position === GameMenuTransitionPosition.RIGHT ? 1 : 0 );
        const horizontalOffset = horizontalSign * (dimension.x - w);

        const verticalSign = position === GameMenuTransitionPosition.TOP ? -1 : ( position === GameMenuTransitionPosition.BOTTOM ? 1 : 0 );
        const verticalOffset = verticalSign * (dimension.y - h);

        const style = this.style;
        const { fillStyle, strokeStyle, lineWidth, textStyle } = style;

        GameUtils.SAVE();
        GameUtils.FILL_STYLE(fillStyle.rgba);
        GameUtils.STROKE_STYLE(strokeStyle.rgba);
        GameUtils.LINE_WIDTH(lineWidth);
        GameUtils.BEGIN_PATH();
        GameUtils.RECT(center.x - w / 2 + horizontalOffset, center.y - h / 2 + verticalOffset, w, h);
        GameUtils.FILL();
        GameUtils.STROKE();
        GameUtils.RESTORE();
    }

    setState(state, callback)
    {
        this.state = state;
        this.transitionCallback = callback; 
    }
};

export class GameMenuTransition extends GameUIComponentGroup
{
    constructor({ parent })
    {
        super({ components: [], parent: parent });
        
        const dimension = GameUtils.DIMENSION;

        const top = new GameMenuTransitionComponent({
            center: new Vector2(dimension.x / 2, dimension.y / 4),
            dimension: new Vector2(dimension.x, dimension.y / 2),
            direction: GameMenuTransitionDirection.VERTICAL,
            position: GameMenuTransitionPosition.TOP,
            parent: this
        });
        const bottom = new GameMenuTransitionComponent({
            center: new Vector2(dimension.x / 2, 3 * dimension.y / 4),
            dimension: new Vector2(dimension.x, dimension.y / 2),
            direction: GameMenuTransitionDirection.VERTICAL,
            position: GameMenuTransitionPosition.BOTTOM,
            parent: this
        });
        const left = new GameMenuTransitionComponent({
            center: new Vector2(dimension.x / 4, dimension.y / 2),
            dimension: new Vector2(dimension.x / 2, dimension.y),
            direction: GameMenuTransitionDirection.HORIZONTAL,
            position: GameMenuTransitionPosition.LEFT,
            parent: this
        });
        const right = new GameMenuTransitionComponent({
            center: new Vector2(3 * dimension.x / 4, dimension.y / 2),
            dimension: new Vector2(dimension.x / 2, dimension.y),
            direction: GameMenuTransitionDirection.HORIZONTAL,
            position: GameMenuTransitionPosition.RIGHT,
            parent: this
        });

        this.components = [
            top,
            bottom,
            left,
            right
        ];
    }

    setState(state, callback)
    {
        this.components.forEach(complonent => {
            complonent.setState(state, callback)
        });
    }
};