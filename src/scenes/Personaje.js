import { Scene } from 'phaser';

export class Personaje extends Scene {
    constructor() {
        super('Personaje');
    }

    preload() {
        // Cargar los spritesheets (sin borrarlos)
        this.load.spritesheet('rogue', 'Characters/rogue.png', { frameWidth: 50, frameHeight: 37 });
        this.load.spritesheet("archer", "Characters/archer.png", { frameWidth: 64, frameHeight: 64 });
        this.load.image('pergamino', 'assets/pergamino.png'); // Fondo pergamino
    }

    create() {
        // Agregar la imagen de fondo (pergamino)
        const pergamino = this.add.image(512, 384, 'pergamino');
        pergamino.setDepth(0);
        pergamino.setScale(1.5, 1); // Ajustar la escala del fondo

        // Título
        this.add.text(512, 160, 'Seleccionar Personaje', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        // Función para ir al menú principal
        const MainMenu = () => {
            this.scene.start('MainMenu');
        };

        // Función para ir al juego
        const Game = () => {
            this.scene.start('MyScene');
            this.scene.start('UI');
            this.scene.start('Game');
        };

        // Crear botones con las imágenes de los personajes (tomando solo un frame específico del spritesheet)
        this.createCharacterButton(412, 400, 'archer', 0, Game);  // Botón con el primer frame del 'archer'
        this.createCharacterButton(612, 400, 'rogue', 0, Game);   // Botón con el primer frame del 'rogue'
        
        // Crear botón para regresar al menú principal
        this.createButton(812, 600, 'Regresar', MainMenu);
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

    // Función para crear el botón de "Regresar"
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