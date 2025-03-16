import Preloader from './scenes/Preloader.js';
import MainMenu from './scenes/MainMenu.js';
import Game from './scenes/Game.js';
import Game2 from './scenes/Game2.js';
import UI from './scenes/UI.js';
import NameSelection from './scenes/NameSelection.js';
import CharSelection from './scenes/CharSelection.js';
import Help from './scenes/Help.js';
import About from './scenes/About.js';
import { socket } from './socket.js';
import { getDefaultGlobalData } from './utilities.js';
import FinalScene from './scenes/FinalScene.js';
import OverScene from './scenes/OverScene.js';
import Records from './scenes/Records.js';

export const GlobalData = getDefaultGlobalData();

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: GlobalData.width,
    height: GlobalData.height,
    parent: 'game-container',
    // backgroundColor: '#7693B3',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Preloader,
        MainMenu,
        NameSelection,
        CharSelection,
        Help,
        About,
        Game,
        Game2,
        UI,
        OverScene,
        FinalScene,
        Records
    ]
};

export const game = new Phaser.Game(config);
