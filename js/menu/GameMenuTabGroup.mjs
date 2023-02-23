import { GameUtils } from "../game/GameUtils.mjs";
import { EventListenerType } from "../game/GlobalGameController.mjs";
import { GameMenuElementState, within } from "./GameMenuHelper.mjs";

export class GameMenuTabGroup
{
    constructor({ tabs })
    {
        this.tabs = tabs;
        this.tabs.forEach(tab => tab.group = tabs);
        this.mouseDown = function(event) {
            this.tabs.forEach(tab => {
                const x  = Math.floor(tab.cx - tab.w/2);
                const y = Math.floor(tab.cy - tab.h/2);

                if (within(event.x, event.y, x, y, x + tab.w, y + tab.h))
                {
                    const selectedTab = this.tabs.find(tab => tab.state === GameMenuElementState.SELECTED);
                    if (selectedTab)
                    {
                        selectedTab.state = GameMenuElementState.DEFAULT;
                    }

                    tab.state = GameMenuElementState.SELECTED;
                }
            });
        }.bind(this);
    }

    connect()
    {
        GameUtils.CONTROLLER.addCallback(EventListenerType.MOUSEDOWN, this.mouseDown);
    }

    disconnect()
    {
        GameUtils.CONTROLLER.removeCallback(EventListenerType.MOUSEDOWN, this.mouseDown);
    }
};