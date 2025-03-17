import { createButton } from '../utilities.js';
import { GlobalData } from '../main.js';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        if (!GlobalData.backgroundMusic || !GlobalData.backgroundMusic.isPlaying) {
            GlobalData.backgroundMusic = this.sound.add('bg_m_menu', { loop: true });
            GlobalData.backgroundMusic.play();
        }
        
        // Agregar la imagen de fondo (pergamino)
        const pergamino = this.add.image(GlobalData.halfWidth, GlobalData.halfHeight, 'pergamino');
        const titulo= this.add.image(GlobalData.halfWidth, GlobalData.halfHeight,'titulo');
        pergamino.setDepth(0);

        const startGame = () => {
            GlobalData.backgroundMusic.stop();
            this.scene.start('MyScene');
            this.scene.start('UI');
            this.scene.start('Game');
        };

        const Inicio = () => {
            this.sound.play('menuSelect');
            this.scene.start('NameSelection');
        };
            
        const Records=()=>{
            this.sound.play('menuSelect');
            this.scene.start('Records');
        }

        const Instrucciones = () => {
            this.sound.play('menuSelect');
            this.scene.start('Help');
        };

        const verCreditos = () => {
            this.sound.play('menuSelect');
            this.scene.start('About');
        };

        // Crear los cuatro botones con estilo igual a los créditos
        //this.createButton(512, 230, 'Jugar', startGame);
        createButton(this, GlobalData.halfWidth, 230, 'Play', Inicio);
        createButton(this, GlobalData.halfWidth, 330, 'Records', Records);
        createButton(this, GlobalData.halfWidth, 430, 'Help', Instrucciones);
        createButton(this, GlobalData.halfWidth, 530, 'About', verCreditos);
    }
}