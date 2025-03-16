import { createButton } from '../utilities.js';
import { GlobalData } from '../main.js';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
<<<<<<< HEAD
        if (!GlobalData.backgroundMusic || !GlobalData.backgroundMusic.isPlaying) {
            GlobalData.backgroundMusic = this.sound.add('bg_m_menu', { loop: true });
            GlobalData.backgroundMusic.play();
        }
=======
        // if (!GlobalData.backgroundMusic || !GlobalData.backgroundMusic.isPlaying) {
            GlobalData.backgroundMusic = this.sound.add('bg_m_menu', { loop: true });
            GlobalData.backgroundMusic.play();
        // }
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
        
        // Agregar la imagen de fondo (pergamino)
        const pergamino = this.add.image(GlobalData.halfWidth, GlobalData.halfHeight, 'pergamino');
        pergamino.setDepth(0);

        const startGame = () => {
            GlobalData.backgroundMusic.stop();
            this.scene.start('MyScene');
            this.scene.start('UI');
            this.scene.start('Game');
        };

        const Inicio = () => {
            this.scene.start('NameSelection');
        };
<<<<<<< HEAD
        const Records=()=>{

=======
            
        const Records=()=>{
            this.scene.start('Records');
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
        }

        const Instrucciones = () => {
            this.scene.start('Help');
        };

        const verCreditos = () => {
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