import { GameUIComponentGroup } from "./base/GameUIComponentGroup.mjs";

export class GameMenuTabGroup extends GameUIComponentGroup
{
    constructor({ tabs, parent })
    {
        super({ components: tabs, parent: parent });
    }

    connect()
    {
        this.components.forEach(tab => {
            tab.connect();
        });
    }

    disconnect()
    {
        this.components.forEach(tab => {
            tab.disconnect();
        });
    }
};