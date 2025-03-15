import { createButton } from '../utilities.js';
import { GlobalData } from '../main.js';

export default class EndGame extends Phaser.Scene {
    constructor() {
        super('EndGame');
    }

    create() {
        if (!GlobalData.backgroundMusic || !GlobalData.backgroundMusic.isPlaying) {
            GlobalData.backgroundMusic = this.sound.add('bg_m_menu', { loop: true });
            GlobalData.backgroundMusic.play();
        }
        
        // Agregar la imagen de fondo (pergamino)
        const pergamino = this.add.image(GlobalData.halfWidth, GlobalData.halfHeight, 'pergamino');
        pergamino.setDepth(0);
    }
}