import { createButton } from '../utilities.js';
import { GlobalData } from '../main.js';

export default class NameSelection extends Phaser.Scene {
    constructor() {
        super('NameSelection');
    }
    create() {
        // Agregar la imagen de fondo (pergamino) y centrarla
        const pergamino = this.add.image(GlobalData.halfWidth, GlobalData.halfHeight, 'pergamino');
        pergamino.setDepth(0); // Asegura que esté en la capa más baja

        // Agregar los textos sobre la imagen
        
        
        const Personaje = () => {
            this.scene.start('CharSelection');
        }
        createButton(this, GlobalData.halfWidth, 230, 'Alias', Personaje);
        const MainMenu = () => {
            this.scene.start('MainMenu');
        };
        createButton(this, 900, 550, 'Back', MainMenu);
    }
}