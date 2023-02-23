import { GameWorld } from "./game/GameWorld.mjs";
import { GameLoop } from "./game/GameLoop.mjs";
import { GameUtils } from "./game/GameUtils.mjs";

GameUtils.SETUP_CANVAS();

const canvas = GameUtils.CANVAS;
const scale = GameUtils.SCALE;

const gameObjects = [];
const gameLoop = new GameLoop(gameObjects);
gameLoop.run();