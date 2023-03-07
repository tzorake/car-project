import { GameUIComponentGroup } from "./base/GameUIComponentGroup.mjs";

export class GameMenuTabGroup extends GameUIComponentGroup
{
    constructor({ tabs, parent })
    {
        super({ components: tabs, parent: parent });
    }

    connect()
    {

    }

    disconnect()
    {

    }
};