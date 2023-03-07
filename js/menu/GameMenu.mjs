import { GameUtils } from "../game/GameUtils.mjs";
import { Color } from "../math/Color.mjs";
import { Font } from "../math/Font.mjs";
import { Vector2 } from "../math/Vector2.mjs";
import { GameUIComponentGroup } from "./base/GameUIComponentGroup.mjs";
import { GameUIComponentState } from "./base/GameUIComponentState.mjs";
import { GameUIComponentStyle } from "./base/GameUIComponentStyle.mjs";
import { within } from "./base/GameUIHelper.mjs";
import { GameUITextStyle } from "./base/GameUITextStyle.mjs";
import { GameMenuBackground } from "./GameMenuBackground.mjs";
import { GameMenuCard } from "./GameMenuCard.mjs";
import { GameMenuTab } from "./GameMenuTab.mjs";
import { GameMenuTabGroup } from "./GameMenuTabGroup.mjs";

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
                text: 'SINGLEPLAYER',
                center: new Vector2(
                    dimension.x / 2 - cardDimension.x / 2 - cardMargin.x, 
                    dimension.y / 2
                ),
                dimension: cardDimension,
                style: new GameUIComponentStyle({
                    fillStyle: new Color(0, 0, 0, 0.75),
                    strokeStyle: new Color(0, 0, 0, 0.0),
                    lineWidth: 2,
                    textStyle: new GameUITextStyle({
                        fillStyle: new Color(255, 255, 255, 0.75),
                        strokeStyle: new Color(0, 0, 0, 0.0),
                        font: new Font(24, 'Roboto')
                    })
                }),
                callbacks: {
                    mouseMove: function(event) {
                        const center = this.center;
                        const dimension = this.dimension;
                        this.state = within(
                            event.x, event.y, 
                            center.x - dimension.x / 2, center.y - dimension.y / 2, center.x + dimension.x / 2, center.y + dimension.y / 2
                        ) ? GameUIComponentState.HOVERED : GameUIComponentState.DEFAULT;
                    }
                },
                parent: this
            }),
            new GameMenuCard({
                text: 'MULTIPLAYER',
                center: new Vector2(
                    dimension.x / 2 + cardDimension.x / 2 + cardMargin.x, 
                    dimension.y / 2
                ),
                dimension: cardDimension,
                style: new GameUIComponentStyle({
                    fillStyle: new Color(0, 0, 0, 0.75),
                    strokeStyle: new Color(0, 0, 0, 0.0),
                    lineWidth: 2,
                    textStyle: new GameUITextStyle({
                        fillStyle: new Color(255, 255, 255, 0.75),
                        strokeStyle: new Color(0, 0, 0, 0.0),
                        font: new Font(24, 'Roboto')
                    })
                }),
                callbacks: {
                    mouseMove: function(event) {
                        const center = this.center;
                        const dimension = this.dimension;
                        this.state = within(
                            event.x, event.y, 
                            center.x - dimension.x / 2, center.y - dimension.y / 2, center.x + dimension.x / 2, center.y + dimension.y / 2
                        ) ? GameUIComponentState.HOVERED : GameUIComponentState.DEFAULT;
                    }
                },
                parent: this
            }),
            new GameMenuTabGroup({ 
                tabs: [
                    new GameMenuTab({
                        text: 'PLAY',
                        center: new Vector2(
                            dimension.x / 2 - cardDimension.x - cardMargin.x + tabDimension.x / 2, 
                            dimension.y / 2 - cardDimension.y / 2 - tabDimension.y / 2 - tabMargin.y
                        ),
                        dimension: tabDimension,
                        style: new GameUIComponentStyle({
                            fillStyle: new Color(0, 0, 0, 0.75),
                            strokeStyle: new Color(0, 0, 0, 0.0),
                            textStyle: new GameUITextStyle({
                                fillStyle: new Color(255, 255, 255, 0.75),
                                strokeStyle: new Color(0, 0, 0, 0.0),
                                font: new Font(16, 'Roboto')
                            })
                        }),
                        state: GameUIComponentState.CLICKED,
                        callbacks: {
                            mouseDown: function(event) {
                                const center = this.center;
                                const dimension = this.dimension;

                                if (within(event.x, event.y, center.x - dimension.x / 2, center.y - dimension.y / 2, center.x + dimension.x / 2, center.y + dimension.y / 2))
                                {
                                    const parent = this.parent;

                                    parent.components.forEach(component => {
                                        component.state = GameUIComponentState.DEFAULT;
                                    });

                                    this.state = GameUIComponentState.CLICKED;
                                }
                            }
                        },
                    }),
                    new GameMenuTab({
                        text: 'OPTIONS',
                        center: new Vector2(
                            dimension.x / 2 - cardDimension.x - cardMargin.x + tabDimension.x / 2 + tabDimension.x, 
                            dimension.y / 2 - cardDimension.y / 2 - tabDimension.y / 2 - tabMargin.y
                        ),
                        dimension: tabDimension,
                        style: new GameUIComponentStyle({
                            fillStyle: new Color(0, 0, 0, 0.75),
                            strokeStyle: new Color(0, 0, 0, 0.0),
                            textStyle: new GameUITextStyle({
                                fillStyle: new Color(255, 255, 255, 0.75),
                                strokeStyle: new Color(0, 0, 0, 0.0),
                                font: new Font(16, 'Roboto')
                            })
                        }),
                        callbacks: {
                            mouseDown: function(event) {
                                const center = this.center;
                                const dimension = this.dimension;

                                if (within(event.x, event.y, center.x - dimension.x / 2, center.y - dimension.y / 2, center.x + dimension.x / 2, center.y + dimension.y / 2))
                                {
                                    const parent = this.parent;

                                    parent.components.forEach(component => {
                                        component.state = GameUIComponentState.DEFAULT;
                                    });

                                    this.state = GameUIComponentState.CLICKED;
                                }
                            }
                        },
                    })
                ], 
                parent: this 
            }),
            new GameMenuTab({
                text: 'QUIT',
                center: new Vector2(
                    dimension.x / 2 + cardMargin.x + cardDimension.x - tabDimension.x / 2, 
                    dimension.y / 2 + cardDimension.y / 2 + tabDimension.y / 2 + tabMargin.y
                ),
                dimension: tabDimension,
                style: new GameUIComponentStyle({
                    fillStyle: new Color(0, 0, 0, 0.75),
                    strokeStyle: new Color(0, 0, 0, 0.0),
                    textStyle: new GameUITextStyle({
                        fillStyle: new Color(255, 255, 255, 0.75),
                        strokeStyle: new Color(0, 0, 0, 0.0),
                        font: new Font(16, 'Roboto')
                    })
                }),
                parent: this
            })
        ];

        this.components = components;
    }

    connect()
    {
        this.components.forEach(component => {
            component.connect();
        });
    }

    disconnect()
    {
        this.components.forEach(component => {
            component.disconnect();
        });
    }
};