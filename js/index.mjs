import { GameLoop } from "./game/GameLoop.mjs";
import { GameUtils } from "./game/GameUtils.mjs";

GameUtils.SETUP_CANVAS();

new GameLoop().run();

// TODO: fix inactive tab update bug
// https://stackoverflow.com/questions/5927284/how-can-i-make-setinterval-also-work-when-a-tab-is-inactive-in-chrome