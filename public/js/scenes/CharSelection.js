import { createButton } from '../utilities.js';
import { GlobalData } from '../main.js';

export default class CharSelection extends Phaser.Scene {
    constructor() {
        super('CharSelection');
    }

    preload() {
    }

    create() {
        // Agregar la imagen de fondo (pergamino)
        const pergamino = this.add.image(GlobalData.halfWidth, GlobalData.halfHeight, 'pergamino');
        pergamino.setDepth(0);
        pergamino.setScale(1, 1); // Ajustar la escala del fondo

        // Título
        this.add.text(GlobalData.halfWidth, 160, 'Choose your character', {
            fontFamily: 'Alagard', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        // Función para ir al menú principal
        const MainMenu = () => {
            this.scene.start('MainMenu');
        };

        // Función para ir al juego
        const Game = (charName) => {
            GlobalData.backgroundMusic.stop();
            GlobalData.charName = charName;
            this.scene.start('UI');
            this.scene.start('Game');
        };

        // Crear botones con las imágenes de los personajes (tomando solo un frame específico del spritesheet)
        this.createCharacterButton(450, 400, 'archer', 0, () => Game("archer"));  // Botón con el primer frame del 'archer'
        this.createCharacterButton(800, 400, 'rogue', 0, () => Game("rogue"));   // Botón con el primer frame del 'rogue'
        
        // Crear botón para regresar al menú principal
        createButton(this, 900, 550, 'Back', MainMenu);
    }

    // Función para crear un botón con imagen (usando un frame del spritesheet)
    createCharacterButton(x, y, characterKey, frameIndex, callback) {
        // Agregar la imagen del personaje usando un frame específico
        const characterImage = this.add.sprite(x, y, characterKey, frameIndex);  // Usa un frame del spritesheet
        characterImage.setOrigin(0.5);  // Centrar la imagen
        characterImage.setScale(4);  // Ajustar el tamaño de la imagen
        characterImage.setDepth(1);  // Asegura que la imagen esté por encima del fondo

        // Hacer la imagen interactiva como un botón
        characterImage.setInteractive()
            .on('pointerdown', callback)
            .on('pointerover', () => characterImage.setScale(6))  // Aumentar imagen al pasar el ratón
            .on('pointerout', () => characterImage.setScale(4));  // Volver al tamaño original

        // Agregar texto encima de la imagen (opcional)
        this.add.text(x, y + 80, '', {  // Desplazar el texto hacia abajo para que no se superponga
            fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
    }
}