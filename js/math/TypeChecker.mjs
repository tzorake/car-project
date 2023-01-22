import { GameObjectController } from "../game/GameObjectController.mjs";
import { GameObjectRenderer } from "../game/GameObjectRenderer.mjs";
import { GameObject } from "../game/GameObject.mjs";
import { GameWorld } from "../game/GameWorld.mjs";
import { Vector2D } from "./Vector2D.mjs";

export class TypeChecker
{
    static isNumber = value => typeof value === 'number';
    static isFunction = value => typeof value === 'function';
    static isVector2D = value => value instanceof Vector2D;
    static isGameObject = value => value instanceof GameObject;
    static isGameWorld = value => value instanceof GameWorld;
    static isGameObjectRenderer = value => value instanceof GameObjectRenderer;
    static isGameObjectController = value => value instanceof GameObjectController;
}