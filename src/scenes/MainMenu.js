import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        if (!this.backgroundMusic || !this.backgroundMusic.isPlaying) {
            this.backgroundMusic = this.sound.add('menMusic', { loop: true });
            this.backgroundMusic.play();
        }
        
        // Agregar la imagen de fondo (pergamino)
        const pergamino = this.add.image(512, 384, 'pergamino');
        pergamino.setDepth(0);

      

        const startGame = () => {
            this.backgroundMusic.stop();
            this.scene.start('MyScene');
            this.scene.start('UI');
            this.scene.start('Game');
        };

        const Inicio = () => {
            this.scene.start('Inicio');
        };
        const Records=()=>{

        }

        const Instrucciones = () => {
            this.scene.start('Instrucciones');
        };

        const verCreditos = () => {
            this.scene.start('Credits');
        };

        // Crear los cuatro botones con estilo igual a los créditos
        //this.createButton(512, 230, 'Jugar', startGame);
        this.createButton(512, 230, 'Jugar', Inicio);
        this.createButton(512, 330, 'Records', Records);
        this.createButton(512, 430, 'Instrucciones', Instrucciones);
        this.createButton(512, 530, 'Creditos', verCreditos);
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