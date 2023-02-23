import { CarObject } from "./car/CarObject.mjs";
import { DebugGameObject } from "./debug/DebugGameObject.mjs";
import { GameCamera, GameCameraMode } from "./game/GameCamera.mjs";
import { GameLoop } from "./game/GameLoop.mjs";
import { GameUtils } from "./game/GameUtils.mjs";
import { Track } from "./track/Track.mjs";

GameUtils.SETUP_CANVAS();

const canvas = GameUtils.CANVAS;
const scale = GameUtils.SCALE;

const gameObjects = [
    new Track(0, 0, canvas.width / scale, canvas.height / scale), 
    new CarObject(0, 0, 5, 2),
    new DebugGameObject(150, 150, 5, 5),
    new GameCamera(0.0, 0.0, canvas.width / scale, canvas.height / scale, GameCameraMode.FOLLOW)
];
const gameLoop = new GameLoop(gameObjects);
gameLoop.run();