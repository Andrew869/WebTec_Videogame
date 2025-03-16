import Preloader from './scenes/Preloader.js';
import MainMenu from './scenes/MainMenu.js';
import Game from './scenes/Game.js';
<<<<<<< HEAD
=======
import Game2 from './scenes/Game2.js';
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
import UI from './scenes/UI.js';
import NameSelection from './scenes/NameSelection.js';
import CharSelection from './scenes/CharSelection.js';
import Help from './scenes/Help.js';
import About from './scenes/About.js';
import { socket } from './socket.js';
<<<<<<< HEAD

export const GlobalData = {
    player : null,
    playerData : null,
    players: {},
    playersData: {},
    colliders: [],
    triggers: [],
    width: 1280,
    halfWidth: 1280 / 2,
    height: 720,
    halfHeight: 720 / 2,
    mapSizeX: 1280 * 2,
    mapSizeY: 793,
    speed : 160,
    jumpForce : 400
};
=======
import { getDefaultGlobalData } from './utilities.js';
import FinalScene from './scenes/FinalScene.js';
import Records from './scenes/Records.js';

export const GlobalData = getDefaultGlobalData();
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb

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
<<<<<<< HEAD
        Game,
        MainMenu,
        UI,
        NameSelection,
        CharSelection,
        Help,
        About
=======
        MainMenu,
        NameSelection,
        CharSelection,
        Help,
        About,
        Game,
        Game2,
        UI,
        FinalScene,
        Records
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    ]
};

export const game = new Phaser.Game(config);
