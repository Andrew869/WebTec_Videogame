import Preloader from './scenes/Preloader.js';
import MainMenu from './scenes/MainMenu.js';
import Game from './scenes/Game.js';
import UI from './scenes/UI.js';
import NameSelection from './scenes/NameSelection.js';
import CharSelection from './scenes/CharSelection.js';
import Help from './scenes/Help.js';
import About from './scenes/About.js';
import { socket } from './socket.js';

export const GlobalData = {
    player : null,
    playerData : null,
    players: {},
    playersData: {},
    colliders: [],
    width: 1280,
    halfWidth: 1280 / 2,
    height: 720,
    halfHeight: 720 / 2,
    mapSizeX: 1280 * 2,
    mapSizeY: 793,
    speed : 160,
    jumpForce : 400
};

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
        Game,
        MainMenu,
        UI,
        NameSelection,
        CharSelection,
        Help,
        About
    ]
};

export const game = new Phaser.Game(config);
