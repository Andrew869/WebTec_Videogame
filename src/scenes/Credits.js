import { Scene } from 'phaser';

export class Credits extends Scene {
    constructor() {
        super('Credits');
    }

    create() {
        // Agregar la imagen de fondo (pergamino) y centrarla
        const pergamino = this.add.image(512, 384, 'pergamino');
        pergamino.setDepth(0); // Asegura que esté en la capa más baja
        pergamino.setScale(1.5, 1);  // Cambié la escala para ajustarla según el fondo

        // Agregar los textos con imágenes específicas a la izquierda o derecha
        // Aquí puedes definir la posición de la imagen y del texto por separado
        this.addTextWithImage(412, 230, 790, 230, 'Hector 317648', 'left', 'imageVale',0.3);   // 'Vale' con imagen a la izquierda
        this.addTextWithImage(612, 330, 290, 330, 'Omar 123456', 'right', 'imageVale', 0.3); // 'Hector' con imagen a la derecha
        this.addTextWithImage(412, 430, 790, 430, 'Pablo 654321', 'left', 'imageVale', 0.3);    // 'Omar' con imagen a la izquierda
        this.addTextWithImage(612, 530, 290, 530, 'Vale 876678', 'right', 'imageVale', 0.3);  // 'Pablo' con imagen a la derecha

        // Botón para regresar al menú principal
        const MainMenu = () => {
            this.scene.start('MainMenu');
        };
        this.createButton(912, 600, 'Regresar', MainMenu);
    }

    // Función para agregar texto con la imagen a la izquierda o derecha
    addTextWithImage(textX, textY, imageX, imageY, name, imagePosition, imageKey, scale) {
        // Agregar el texto
        const text = this.add.text(textX, textY, name, {
            fontFamily: 'Arial Black',
            fontSize: 38,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        // Agregar la imagen
        const image = this.add.image(imageX, imageY, imageKey);  // Posicion de la imagen separada
        image.setScale(scale);  // Ajusta el tamaño de la imagen según el parámetro `scale`
        image.setDepth(1);  // Asegura que la imagen esté por encima del texto
    }

    // Función para crear el botón de regresar
    createButton(x, y, text, callback) {
        let button = this.add.text(x, y, text, {
            fontFamily: 'Arial Black',
            fontSize: 38,
            color: '#6F4E37',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5)
          .setDepth(1)
          .setInteractive()
          .on('pointerdown', callback)
          .on('pointerover', () => button.setStyle({ color: '#ffff00' }))
          .on('pointerout', () => button.setStyle({ color: '#6F4E37' }));
    }
}
