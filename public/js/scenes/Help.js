import { createButton } from '../utilities.js';
import { GlobalData } from '../main.js';

export default class Help extends Phaser.Scene {
    constructor() {
        super('Help');
    }

    create() {
        // Agregar la imagen de fondo (pergamino) y centrarla
        const pergamino = this.add.image(GlobalData.halfWidth, GlobalData.halfHeight, 'pergamino');
        pergamino.setDepth(0); // Asegura que esté en la capa más baja

        // Agregar los textos sobre la imagen
        this.add.text(GlobalData.halfWidth, GlobalData.halfHeight-190, 'Instrucciones', {
            fontFamily: 'Alagard', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        this.add.text(GlobalData.halfWidth, GlobalData.halfHeight, 'No muerasssssssssssssssssssssssssssssss', {
            fontFamily: 'Alagard', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
        const MainMenu = () => {
            this.sound.play('menuSelect');
            this.scene.start('MainMenu');
        };
        createButton(this, GlobalData.halfWidth + 0.5 * GlobalData.halfWidth, GlobalData.halfHeight + 0.5 * GlobalData.halfHeight, 'Back', MainMenu);
    }
}