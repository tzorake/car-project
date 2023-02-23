import { GameUtils } from "../game/GameUtils.mjs";
import { GameMenuCard } from "./GameMenuCard.mjs";
import { GameMenuElementState, within } from "./GameMenuHelper.mjs";
import { GameMenuTab } from "./GameMenuTab.mjs";
import { GameMenuTabGroup } from "./GameMenuTabGroup.mjs";
import { GameMenuTransition, TransitionState } from "./GameMenuTransition.mjs";

export class GameMenu
{
    constructor({ parent })
    {
        this.parent = parent;

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
                    const menu = this.parent;
                    const loop = menu.parent;
                    const transition = loop.transition;
                    if (within(event.x, event.y, x, y, x + this.w, y + this.h))
                    {
                        if (transition.state === TransitionState.DEFAULT || transition.state === TransitionState.BACKWARD_ENDED)
                        {
                            menu.disconnect();

                            transition.setState(TransitionState.FORWARD_STARTED, () => {
                                // loop.world.connect();
                                loop.worldConnected = true;
                                transition.setState(TransitionState.BACKWARD_STARTED);
                            });
                        }
                        // if (transition.state === TransitionState.FORWARD_ENDED)
                        // {
                        //     transition.setState(TransitionState.BACKWARD_STARTED);
                        // }
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

        this.parent.menuConnected = false;
    }

    update(dt)
    {
        this.card1.update(dt);
        this.card2.update(dt);
    }

    render(dt)
    {
        GameUtils.BACKGROUND('#7BEDC3');

        this.card1.render(dt);
        this.card2.render(dt);

        this.topTab1.render(dt);
        this.topTab2.render(dt);
        this.bottomTab1.render(dt);
    }
};