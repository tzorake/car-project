import { HtmlElements } from "../utils/HtmlElements.mjs";
import { GameWorld } from "./GameWorld.mjs";
import { Canvas } from "./hierarchy/Canvas.mjs";
import { Element } from "./hierarchy/Element.mjs";

const canvas = HtmlElements.CANVAS;

export class GameLoop {
    constructor(args) {
        this.canvas = new Canvas({
            x: 0, 
            y: 0, 
            width: canvas.width, 
            height: canvas.height,
        });
        this.world = new GameWorld();

        const now = window.performance.now();
        this.deltaTime = 0;
        this.targetFrameRate = 60;
        this.frameRate = 0;
        this.lastTargetFrameTime = now;
        this.lastFrameTime = now;
        this.loop = true;
    }

    repaint() {
        // console.info('======================================================');
        // console.info('deltaTime: ',           this.property('deltaTime'));
        // console.info('targetFrameRate: ',     this.property('targetFrameRate'));
        // console.info('frameRate: ',           this.property('frameRate'));
        // console.info('lastTargetFrameTime: ', this.property('lastTargetFrameTime'));
        // console.info('lastFrameTime: ',       this.property('lastFrameTime'));
        // console.info('loop: ',                this.property('loop'));

        this.canvas.update();
        this.canvas.paint();
        this.world.update();
        this.world.paint();
    }

    paint() {
        const now = window.performance.now();
        const time_since_last = now - this.lastTargetFrameTime;
        const target_time_between_frames = 1000 / this.targetFrameRate;

        const epsilon = 5;
        if (!this.loop || time_since_last >= target_time_between_frames - epsilon) {
            const deltaTime = now - this.lastFrameTime; // lastRealFrameTime -> lastFrameTime
            this.deltaTime = deltaTime;
            this.frameRate = 1000.0 / deltaTime;
            this.repaint();
            this.lastTargetFrameTime = Math.max(this.lastTargetFrameTime + target_time_between_frames, now);
            this.lastFrameTime = now;
        }

        if (this.loop) {
            this.requestAnimationId = window.requestAnimationFrame(this.paint.bind(this));
        }
    };

    start() {
        this.requestAnimationId = window.requestAnimationFrame(this.paint.bind(this));
    }
};