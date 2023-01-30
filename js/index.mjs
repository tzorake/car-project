import { CarObject } from "./car/CarObject.mjs";
import { GameWorld } from "./game/GameWorld.mjs";
import { GameLoop } from "./game/GameLoop.mjs";
import { GameUtils } from "./game/GameUtils.mjs";
import { Track } from "./track/Track.mjs";

GameUtils.SETUP_CANVAS();

const canvas = GameUtils.CANVAS;

const gameObjects = [
    new Track(0, 0, canvas.width/GameUtils.SCALE, canvas.height/GameUtils.SCALE), 
    new CarObject(10, 10, 5, 2)
];
const gameWorld = new GameWorld(gameObjects);
const gameLoop = new GameLoop(gameWorld);

gameLoop.start();

// console.info(MathFunction.linspace(0.0, 1.0, 10));

// const curve = new TrackCurve([
//     new Vector2D(0, 1.5), new Vector2D(2, 2), new Vector2D(3, 1), new Vector2D(4, 0.5), new Vector2D(5, 1), new Vector2D(6, 2), new Vector2D(7, 3)
// ], SplineType.CatmullRomSpline);
// curve.calculate().forEach(m => console.log(m));