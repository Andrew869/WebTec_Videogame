import { GlobalData } from '../main.js';
import { exitGame } from '../utilities.js';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "GameOver" });
    }

    create() {
        GlobalData.currGameScene = this;
        this.sound.play('gameClear');
        setTimeout(() => {
            // 🔹 Mostrar en pantalla el tiempo correctamente
            this.add.text(GlobalData.halfWidth, 150, "Game Over", {
                fontFamily: 'Arial',
                fontSize: '40px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 6
            }).setOrigin(0.5);

            // this.add.text(400, 250, `⏳ ${name} - Tiempo final: ${time}s`, {
            //     fontFamily: 'Arial',
            //     fontSize: '32px',
            //     color: '#00ff00'
            // }).setOrigin(0.5);

            // 🔹 Botón para volver al menú principal
            let menuButton = this.add.text(GlobalData.halfWidth, 450, "Back 2 Menu", {
                fontFamily: 'Arial',
                fontSize: '28px',
                color: '#ff0000',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 }
            }).setOrigin(0.5).setInteractive();

            menuButton.on("pointerdown", () => {
                this.sound.play('menuSelect');
                exitGame('MainMenu');
            });

        }, 500);
    }
}
