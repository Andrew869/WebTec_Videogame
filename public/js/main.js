import Preloader from './scenes/Preloader.js';
import Game from './scenes/Game.js';
import UI from './scenes/UI.js';
import { socket } from './socket.js';

export const GlobalData = {
    players: {},
    playersStates: {},
    playersEvent: {},
    mapSizeX: 1280 * 2,
    mapSizeY: 793
};

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 1280,
    height: 720,
    parent: 'game-container',
    // backgroundColor: '#7693B3',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Preloader,
        Game,
        UI
    ]
};

export const game = new Phaser.Game(config);
