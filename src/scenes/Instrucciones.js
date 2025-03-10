import { Scene } from 'phaser';

export class Instrucciones extends Scene {
    constructor() {
        super('Instrucciones');
    }

    

    create() {
        // Agregar la imagen de fondo (pergamino) y centrarla
        const pergamino = this.add.image(512, 384, 'pergamino');
        pergamino.setDepth(0); // Asegura que esté en la capa más baja

        // Agregar los textos sobre la imagen
        this.add.text(512, 230, 'Instrucciones', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        this.add.text(500, 330, 'No muerasssssssssssssssssssssssssssssss', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
        const MainMenu = () => {
            this.scene.start('MainMenu');
        };
        this.createButton(812, 600, 'Regresar', MainMenu);
    }
    createButton(x, y, text, callback) {
        let button = this.add.text(x, y, text, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#6F4E37',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5)
          .setDepth(1)
          .setInteractive()
          .on('pointerdown', callback)
          .on('pointerover', () => button.setStyle({ color: '#ffff00' }))
          .on('pointerout', () => button.setStyle({ color: '#6F4E37' }));
    }
}