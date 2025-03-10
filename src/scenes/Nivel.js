import { Scene } from 'phaser';

export class Nivel extends Scene {
    constructor() {
        super('Nivel');
    }

    create() {
        if (!this.backgroundMusic || !this.backgroundMusic.isPlaying) {
            this.backgroundMusic = this.sound.add('menMusic', { loop: true });
            this.backgroundMusic.play();
        }
        
        // Agregar la imagen de fondo (pergamino)
        const pergamino = this.add.image(512, 384, 'pergamino');
        pergamino.setDepth(0);

        this.add.text(512, 160, 'Seleccionar nivel', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        const Nivel1=()=>{
            this.scene.start('Nivel1');
        }

        // Crear los cuatro botones con estilo igual a los créditos
        //this.createButton(512, 230, 'Jugar', startGame);
        this.createButton(512, 230, 'Nivel 1', Nivel1);
        this.createButton(512, 330, 'Nivel 2', Nivel2);
        ;
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