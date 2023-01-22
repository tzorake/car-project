import { CarObject } from "./car/CarObject.mjs";
import { GameWorld } from "./game/GameWorld.mjs";
import { GameLoop } from "./game/GameLoop.mjs";
import { GameUtils } from "./game/GameUtils.mjs";

GameUtils.setup();

const gameObjects = [new CarObject(100, 100, 50, 20)];
const gameWorld = new GameWorld(gameObjects);
const gameLoop = new GameLoop(gameWorld);

gameLoop.start();