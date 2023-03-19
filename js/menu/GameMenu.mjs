import { GameUtils } from "../game/GameUtils.mjs";
import { Vector2 } from "../math/Vector2.mjs";
import { GameUIComponentGroup } from "./base/GameUIComponentGroup.mjs";
import { GameUIComponentState } from "./base/GameUIComponentState.mjs";
import { within } from "./base/GameUIHelper.mjs";
import { GameMenuBackground } from "./GameMenuBackground.mjs";
import { GameMenuCard } from "./GameMenuCard.mjs";
import { GameMenuTab } from "./GameMenuTab.mjs";

export class GameMenu extends GameUIComponentGroup
{
    constructor({ parent = null })
    {
        super({ components: [], parent: parent });

        const dimension = GameUtils.DIMENSION;
        const cardDimension = new Vector2(250, 400);
        const cardMargin = new Vector2(100, 0);
        const tabDimension = new Vector2(100, 30);
        const tabMargin = new Vector2(0, 100);

        const background = new GameMenuBackground({ 
            center: new Vector2(
                dimension.x / 2, 
                dimension.y / 2
            ),
            dimension: dimension,
            parent: this
        });

        const singleplayer = new GameMenuCard({
            text: 'SINGLEPLAYER',
            center: new Vector2(
                dimension.x / 2 - cardDimension.x / 2 - cardMargin.x, 
                dimension.y / 2
            ),
            dimension: cardDimension,
            callbacks : {
                mouseMove: function(event) {
                    const center = this.center;
                    const dimension = this.dimension;
                    this.state = within(
                        event.x, event.y, 
                        center.x - dimension.x / 2, center.y - dimension.y / 2, center.x + dimension.x / 2, center.y + dimension.y / 2
                    ) ? GameUIComponentState.HOVERED : GameUIComponentState.DEFAULT;
                },
                mouseDown: function(event) {
                    const center = this.center;
                    const dimension = this.dimension;
                    
                    if (within(event.x, event.y, center.x - dimension.x / 2, center.y - dimension.y / 2, center.x + dimension.x / 2, center.y + dimension.y / 2))
                    {

                    }
                }
            },
            parent: this
        });
        const multiplayer = new GameMenuCard({
            text: 'MULTIPLAYER',
            center: new Vector2(
                dimension.x / 2 + cardDimension.x / 2 + cardMargin.x, 
                dimension.y / 2
            ),
            dimension: cardDimension,
            callbacks : {
                mouseMove: function(event) {
                    const center = this.center;
                    const dimension = this.dimension;

                    this.state = within(
                        event.x, event.y, 
                        center.x - dimension.x / 2, center.y - dimension.y / 2, center.x + dimension.x / 2, center.y + dimension.y / 2
                    ) ? GameUIComponentState.HOVERED : GameUIComponentState.DEFAULT;
                },
                mouseDown: function(event) {
                    const center = this.center;
                    const dimension = this.dimension;

                    if (within(event.x, event.y, center.x - dimension.x / 2, center.y - dimension.y / 2, center.x + dimension.x / 2, center.y + dimension.y / 2))
                    {

                    }
                }
            },
            parent: this
        });

        const cards = new GameUIComponentGroup({ 
            components: [
                singleplayer,
                multiplayer
            ], 
            parent: this 
        });

        const playTab = new GameMenuTab({
            text: 'PLAY',
            center: new Vector2(
                dimension.x / 2 - cardDimension.x - cardMargin.x + tabDimension.x / 2, 
                dimension.y / 2 - cardDimension.y / 2 - tabDimension.y / 2 - tabMargin.y
            ),
            dimension: tabDimension,
            state: GameUIComponentState.CLICKED,
        });
        const optionsTab = new GameMenuTab({
            text: 'OPTIONS',
            center: new Vector2(
                dimension.x / 2 - cardDimension.x - cardMargin.x + tabDimension.x / 2 + tabDimension.x, 
                dimension.y / 2 - cardDimension.y / 2 - tabDimension.y / 2 - tabMargin.y
            ),
            dimension: tabDimension,
        });

        const topTabs = new GameUIComponentGroup({ 
            components: [
                playTab,
                optionsTab
            ], 
            callbacks : {
                mouseDown: function(event) {
                    const center = this.center;
                    const dimension = this.dimension;
        
                    if (within(event.x, event.y, center.x - dimension.x / 2, center.y - dimension.y / 2, center.x + dimension.x / 2, center.y + dimension.y / 2))
                    {
                        const group = this.parent;
                        const components = group.components;
        
                        components.forEach(component => {
                            component.state = GameUIComponentState.DEFAULT;
                        });
        
                        this.state = GameUIComponentState.CLICKED;
                    }
                }
            },
            parent: this 
        });
        const bottomTab = new GameMenuTab({
            text: 'QUIT',
            center: new Vector2(
                dimension.x / 2 + cardMargin.x + cardDimension.x - tabDimension.x / 2, 
                dimension.y / 2 + cardDimension.y / 2 + tabDimension.y / 2 + tabMargin.y
            ),
            dimension: tabDimension,
            parent: this
        });

        this.components = [
            background,
            cards,
            topTabs,
            bottomTab,
        ];
    }
};