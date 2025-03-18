import { createButton } from '../utilities.js';
import { GlobalData } from '../main.js';

export default class Help extends Phaser.Scene {
    constructor() {
        super('Help');
    }

    create() {
        this.add.sprite(GlobalData.halfWidth, GlobalData.halfHeight - 190, 'items', 44);
        // Asegurarte de que el spritesheet esté cargado antes de agregar el sprite

        // Agregar la imagen de fondo (pergamino) y centrarla
        const pergamino = this.add.image(GlobalData.halfWidth, GlobalData.halfHeight, 'pergamino');
        pergamino.setDepth(0); // Asegura que esté en la capa más baja

        // Agregar los textos sobre la imagen
        this.add.text(GlobalData.halfWidth, GlobalData.halfHeight-190, 'Instrucciones', {
            fontFamily: 'Alagard', fontSize: 38, color: '#000000',
            stroke: '#6F4E37', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        this.add.text(GlobalData.halfWidth, GlobalData.halfHeight-110, 'Presiona ´D´ para ir a la derecha', {
            fontFamily: 'Alagard', fontSize: 28, color: '#e14e12',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
        this.add.text(GlobalData.halfWidth, GlobalData.halfHeight-60, 'Presiona ´A´ para ir a la izquierda', {
            fontFamily: 'Alagard', fontSize: 28, color: '#e14e12',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
        this.add.text(GlobalData.halfWidth, GlobalData.halfHeight-10, 'Presiona espacio para saltar', {
            fontFamily: 'Alagard', fontSize: 28, color: '#e14e12',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
        this.add.text(GlobalData.halfWidth, GlobalData.halfHeight+60, 'La pocion verde quintuplica la obtencion de monedaas durante 10 segundos', {
            fontFamily: 'Alagard', fontSize: 28, color: '#e14e12',
            stroke: '#000000', strokeThickness: 8,
            align: 'center',
            wordWrap: { width: 800 }
        }).setOrigin(0.5).setDepth(1);
        this.add.text(GlobalData.halfWidth, GlobalData.halfHeight+150, 'Objetivo: llegar al portal opuesto lo más rápido y con tantas monedas como sea posible.', {
            fontFamily: 'Alagard', fontSize: 28, color: '#e14e12',
            stroke: '#000000', strokeThickness: 8,
            align: 'center',
            wordWrap: { width: 800 }
        }).setOrigin(0.5).setDepth(1);
        const MainMenu = () => {
            this.scene.start('MainMenu');
        };

        createButton(this, GlobalData.halfWidth + 0.5 * GlobalData.halfWidth, GlobalData.halfHeight + 0.55 * GlobalData.halfHeight, 'Back', MainMenu);
    }

}