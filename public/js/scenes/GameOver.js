import { GlobalData } from '../main.js';
import { exitGame, createButton } from '../utilities.js';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "GameOver" });
    }

    create() {
        GlobalData.currGameScene = this;
        this.sound.play('gameOver');
        
        setTimeout(() => {
            // Agregar el pergamino de fondo
            const pergamino = this.add.image(GlobalData.halfWidth, GlobalData.halfHeight, 'pergamino');
            pergamino.setDepth(0); // Asegura que esté en la capa más baja

            // Agregar el texto de "Game Over" más grande, centrado y con espacio adicional
            this.add.text(GlobalData.halfWidth, GlobalData.halfHeight - 100, "Game Over", {
                fontFamily: 'Alagard', fontSize: 80, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8, align: 'center'
            }).setOrigin(0.5).setDepth(1);

            // Botón para volver al menú principal (solo texto sin fondo)
            const MainMenu = () => {
                this.sound.play('menuSelect');
                exitGame('MainMenu');
            };

            // Colocar el botón justo debajo con un espacio más grande entre el texto y el botón
            createButton(this, GlobalData.halfWidth, GlobalData.halfHeight + 50, 'Back 2 Menu', MainMenu);
        }, 500);
    }
}
