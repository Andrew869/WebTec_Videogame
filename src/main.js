import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Inicio } from './scenes/Inicio';
import { Personaje } from './scenes/Personaje';
import { Nivel } from './scenes/Nivel';
import { Instrucciones } from './scenes/Instrucciones';
import { Credits } from './scenes/Credits';
import { Preloader } from './scenes/Preloader';
import { MyScene } from './scenes/MyScene';
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
        MainMenu,
        Inicio,
        Instrucciones,
        Personaje,
        Nivel,
        Credits,
        MyScene,
        UI
    ]
};

export default new Phaser.Game(config);
