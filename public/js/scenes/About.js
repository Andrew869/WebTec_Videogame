import { createButton } from '../utilities.js';
import { GlobalData } from '../main.js';

export default class About extends Phaser.Scene {
    constructor() {
        super('About');
    }

    create() {
        // Agregar la imagen de fondo (pergamino) y centrarla
        const pergamino = this.add.image(GlobalData.halfWidth, GlobalData.halfHeight, 'pergamino');
        pergamino.setDepth(0); // Asegura que esté en la capa más baja
        pergamino.setScale(1, 2);  // Cambié la escala para ajustarla según el fondo

        // Agregar los textos con imágenes específicas a la izquierda o derecha
        // Nombres e imágenes ligeramente más arriba
        this.addTextWithImage(GlobalData.halfWidth - 0.4 * GlobalData.halfWidth, GlobalData.halfHeight - 0.4 * GlobalData.halfHeight, 
            GlobalData.halfWidth + 0.3 * GlobalData.halfWidth, GlobalData.halfHeight - 0.4 * GlobalData.halfHeight, 
            'Andrew', 'left', 'imageVale', 0.3);   // 'Vale' con imagen a la izquierda

        this.addTextWithImage(GlobalData.halfWidth + 0.4 * GlobalData.halfWidth, GlobalData.halfHeight - 0.2 * GlobalData.halfHeight, 
            GlobalData.halfWidth - 0.3 * GlobalData.halfWidth, GlobalData.halfHeight - 0.2 * GlobalData.halfHeight, 
            'Omar 123456', 'right', 'imageVale', 0.3); // 'Hector' con imagen a la derecha

        this.addTextWithImage(GlobalData.halfWidth - 0.3 * GlobalData.halfWidth, GlobalData.halfHeight + 0.05 * GlobalData.halfHeight, 
            GlobalData.halfWidth + 0.3 * GlobalData.halfWidth, GlobalData.halfHeight + 0.05 * GlobalData.halfHeight, 
            'Pablo 654321', 'left', 'imageVale', 0.3);    // 'Omar' con imagen a la izquierda

        this.addTextWithImage(GlobalData.halfWidth + 0.4 * GlobalData.halfWidth, GlobalData.halfHeight + 0.25 * GlobalData.halfHeight, 
            GlobalData.halfWidth - 0.3 * GlobalData.halfWidth, GlobalData.halfHeight + 0.25 * GlobalData.halfHeight, 
            'Vale 876678', 'right', 'imageVale', 0.3);  // 'Pablo' con imagen a la derecha

        
            const bottomText = this.add.text(GlobalData.halfWidth, GlobalData.halfHeight + 0.9 * GlobalData.halfHeight, 'Tecnologías Web    15/03/2025', {
                fontFamily: 'Arial Black',
                fontSize: 28,
                color: '#9b3c00',
                stroke: '#000000',
                strokeThickness: 6,
                align: 'center'
            }).setOrigin(0.5).setDepth(1);

        // Botón para regresar al menú principal, ajustado para estar ligeramente más abajo
        const MainMenu = () => {
            this.sound.play('menuSelect');
            this.scene.start('MainMenu');
        };
        createButton(this, GlobalData.halfWidth + 0.5 * GlobalData.halfWidth, GlobalData.halfHeight + 0.7 * GlobalData.halfHeight, 'Back', MainMenu);
    }

    // Función para agregar texto con la imagen a la izquierda o derecha
    addTextWithImage(textX, textY, imageX, imageY, name, imagePosition, imageKey, scale) {
        // Agregar el texto
        const text = this.add.text(textX, textY, name, {
            fontFamily: 'Arial Black',
            fontSize: 38,
            color: '#e14e12',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        // Agregar la imagen
        const image = this.add.image(imageX, imageY, imageKey);  // Posicion de la imagen separada
        image.setScale(scale);  // Ajusta el tamaño de la imagen según el parámetro `scale`
        image.setDepth(1);  // Asegura que la imagen esté por encima del texto
    }
}
