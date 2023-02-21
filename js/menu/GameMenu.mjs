import { GameUtils } from "../game/GameUtils.mjs";
import { GameMenuCard } from "./GameMenuCard.mjs";
import { GameMenuElementState, within } from "./GameMenuHelper.mjs";
import { GameMenuTab } from "./GameMenuTab.mjs";
import { GameMenuTabGroup } from "./GameMenuTabGroup.mjs";
import { GameMenuTransition, TransitionState } from "./GameMenuTransition.mjs";

export class GameMenu
{
    #step = function() 
    {
        const step = function(timestamp) 
        {
            if (this.startTimeStamp === null) 
            {
                this.startTimeStamp = timestamp;
            }

            if (this.previousTimeStamp != null && timestamp != null) 
            {
                const dt = (timestamp - this.previousTimeStamp) / GameUtils.SECOND_TO_MILLISECONDS;
                this.update(dt);
                this.render(dt);
            }

            this.previousTimeStamp = timestamp;

            if (!this.done) 
            {
                window.requestAnimationFrame(step);
            }
        }.bind(this);

        window.requestAnimationFrame(step);
    }.bind(this);

    constructor()
    {
        const canvas = GameUtils.CANVAS;
        const width = canvas.width;
        const height = canvas.height;

        this.card1 = new GameMenuCard({
            text: 'SINGLEPLAYER',
            cx: width / 2 - GameMenuCard.SCALE.x / 2 - GameMenuCard.MARGIN.x / 2, 
            cy: height / 2,
            callbacks: {
                mouseMove: function(event) {
                    const x  = Math.floor(this.cx - this.w/2);
                    const y = Math.floor(this.cy - this.h/2);
                    this.state = within(event.x, event.y, x, y, x + this.w, y + this.h) ? GameMenuElementState.EXPANDING : GameMenuElementState.DEFAULT;
                },
                mouseDown: function(event) {
                    const x  = Math.floor(this.cx - this.w/2);
                    const y = Math.floor(this.cy - this.h/2);
                    if (within(event.x, event.y, x, y, x + this.w, y + this.h))
                    {
                        if (this.parent.transition.state === TransitionState.DEFAULT || this.parent.transition.state === TransitionState.BACKWARD_ENDED)
                        {
                            this.parent.transition.setState(TransitionState.FORWARD_STARTED);
                        }
                        if (this.parent.transition.state === TransitionState.FORWARD_ENDED)
                        {
                            this.parent.transition.setState(TransitionState.BACKWARD_STARTED);
                        }
                    }
                }
            },
            parent: this
        });
        this.card2 = new GameMenuCard({
            text: 'MULTIPLAYER',
            cx: width / 2 + GameMenuCard.SCALE.x / 2 + GameMenuCard.MARGIN.x / 2, 
            cy: height / 2,
            callbacks: {
                mouseMove: function(event) {
                    const x  = Math.floor(this.cx - this.w/2);
                    const y = Math.floor(this.cy - this.h/2);
                    this.state = within(event.x, event.y, x, y, x + this.w, y + this.h) ? GameMenuElementState.EXPANDING : GameMenuElementState.DEFAULT;
                },
                mouseDown: function(event) {
                    
                }
            }
        });

        this.topTab1 = new GameMenuTab({
            text: 'PLAY',
            cx: width / 2 - GameMenuCard.SCALE.x, 
            cy: height / 2 - GameMenuCard.SCALE.y / 2 - GameMenuTab.MARGIN.y,
            initialState: GameMenuElementState.SELECTED
        });
        this.topTab2 = new GameMenuTab({
            text: 'OPTIONS',
            cx: width / 2 - GameMenuCard.SCALE.x + GameMenuTab.SCALE.x, 
            cy: height / 2 - GameMenuCard.SCALE.y / 2 - GameMenuTab.MARGIN.y
        });
        this.tabGroup1 = new GameMenuTabGroup({
            tabs: [this.topTab1, this.topTab2]
        });

        this.bottomTab1 = new GameMenuTab({
            text: 'QUIT',
            cx: width / 2 + GameMenuCard.SCALE.x, 
            cy: height / 2 + GameMenuCard.SCALE.y / 2 + GameMenuTab.SCALE.y / 2 + GameMenuTab.MARGIN.y
        });

        this.transition = new GameMenuTransition();
    }

    connect()
    {
        this.card1.connect();
        this.card2.connect();
        this.tabGroup1.connect();
    }

    disconnect()
    {
        this.card1.disconnect();
        this.card2.disconnect();
        this.tabGroup1.disconnect();
    }

    update(dt)
    {
        this.card1.update(dt);
        this.card2.update(dt);

        this.transition.update(dt);
    }

    render(dt)
    {
        GameUtils.BACKGROUND('#7BEDC3');

        this.card1.render(dt);
        this.card2.render(dt);

        this.topTab1.render(dt);
        this.topTab2.render(dt);
        this.bottomTab1.render(dt);

        this.transition.render(dt);

        GameUtils.SAVE();
        GameUtils.BEGIN_PATH();
        GameUtils.FILL_STYLE('red');
        GameUtils.CIRCLE(GameUtils.CANVAS.width/2, GameUtils.CANVAS.height/2, 2);
        GameUtils.FILL();
        GameUtils.RESTORE();
    }

    get step()
    {
        return this.#step;
    }
};