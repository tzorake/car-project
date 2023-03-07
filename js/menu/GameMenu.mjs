import { GameUtils } from "../game/GameUtils.mjs";
import { Color } from "../math/Color.mjs";
import { Vector2 } from "../math/Vector2.mjs";
import { GameUIComponentGroup } from "./base/GameUIComponentGroup.mjs";
import { GameUIComponentStyle } from "./base/GameUIComponentStyle.mjs";
import { GameMenuBackground } from "./GameMenuBackground.mjs";
import { GameMenuCard } from "./GameMenuCard.mjs";
import { GameMenuTab } from "./GameMenuTab.mjs";

export class GameMenu extends GameUIComponentGroup
{
    constructor({ parent })
    {
        super({ components: [], parent });

        const dimension = GameUtils.DIMENSION;
        const cardDimension = new Vector2(250, 400);
        const cardMargin = new Vector2(100, 0);
        const tabDimension = new Vector2(100, 30);
        const tabMargin = new Vector2(0, 100);

        const components = [
            new GameMenuBackground({ 
                center: new Vector2(
                    dimension.x / 2, 
                    dimension.y / 2
                ),
                dimension: dimension,
                style: new GameUIComponentStyle({
                    fillStyle: new Color(123, 237, 195, 1.0)
                }),
                parent: this
            }),
            new GameMenuCard({
                center: new Vector2(
                    dimension.x / 2 - cardDimension.x / 2 - cardMargin.x, 
                    dimension.y / 2
                ),
                dimension: cardDimension,
                style: new GameUIComponentStyle({
                    fillStyle: new Color(0, 0, 0, 0.75),
                    strokeStyle: new Color(0, 0, 0, 0.0),
                    lineWidth: 2
                }),
                parent: this
            }),
            new GameMenuCard({
                center: new Vector2(
                    dimension.x / 2 + cardDimension.x / 2 + cardMargin.x, 
                    dimension.y / 2
                ),
                dimension: cardDimension,
                style: new GameUIComponentStyle({
                    fillStyle: new Color(0, 0, 0, 0.75),
                    strokeStyle: new Color(0, 0, 0, 1.0)
                }),
                parent: this
            }),
            new GameMenuTab({
                center: new Vector2(
                    dimension.x / 2 - cardDimension.x - cardMargin.x + tabDimension.x / 2, 
                    dimension.y / 2 - cardDimension.y / 2 - tabDimension.y / 2 - tabMargin.y
                ),
                dimension: tabDimension,
                style: new GameUIComponentStyle({
                    fillStyle: new Color(0, 0, 0, 0.75),
                    strokeStyle: new Color(0, 0, 0, 1.0)
                }),
                parent: this
            }),
            new GameMenuTab({
                center: new Vector2(
                    dimension.x / 2 - cardDimension.x - cardMargin.x + tabDimension.x / 2 + tabDimension.x, 
                    dimension.y / 2 - cardDimension.y / 2 - tabDimension.y / 2 - tabMargin.y
                ),
                dimension: tabDimension,
                style: new GameUIComponentStyle({
                    fillStyle: new Color(0, 0, 0, 0.75),
                    strokeStyle: new Color(0, 0, 0, 1.0)
                }),
                parent: this
            }),
            new GameMenuTab({
                center: new Vector2(
                    dimension.x / 2 + cardMargin.x + cardDimension.x - tabDimension.x / 2, 
                    dimension.y / 2 + cardDimension.y / 2 + tabDimension.y / 2 + tabMargin.y
                ),
                dimension: tabDimension,
                style: new GameUIComponentStyle({
                    fillStyle: new Color(0, 0, 0, 0.75),
                    strokeStyle: new Color(0, 0, 0, 1.0)
                }),
                parent: this
            })
        ];

        this.components = components;
    }

    connect()
    {

    }

    disconnect()
    {

    }
};