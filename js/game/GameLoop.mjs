import { TypeChecker } from "../math/TypeChecker.mjs";
import { GameMenu } from "../menu/GameMenu.mjs";
import { GameUtils } from "./GameUtils.mjs";

export class GameLoop
{

    constructor(world) 
    {
        if (!TypeChecker.isGameWorld(world))
        {
            throw new Error('GameLoop.constructor(world) : `world` has to be `GameWorld` type!');
        }

        this.startTimeStamp = null;
        this.previousTimeStamp = null;
        this.done = false;
    
        this.world = world;
        this.menu = new GameMenu();
        
        const controller = GameUtils.CONTROLLER;
        controller.connect();

        this.menuConnected = false;
        this.gameConnected = false;
    }

    launchMenu()
    {
        if (this.gameConnected)
        {
            window.cancelAnimationFrame(this.request);
            this.gameConnected = false;
        }

        this.menu.connect();
        this.request = window.requestAnimationFrame(this.menu.step);
        this.menuConnected = true;
    }
};