import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { MyScene } from './scenes/MyScene';
import { MyScene2 } from './scenes/MyScene2';
import { UI } from './scenes/UI';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
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
        MyScene,
        MyScene2,
        UI
    ]
};

export default new Phaser.Game(config);
