import { game } from '../main.js';
import { createButton } from '../utilities.js';
import { GlobalData } from '../main.js';

export default class NameSelection extends Phaser.Scene {
    constructor() {
        super('NameSelection');
    }

    create() {
        game.input.keyboard.enabled = false;

        // Agregar la imagen de fondo (pergamino) y centrarla
        const pergamino = this.add.image(GlobalData.halfWidth, GlobalData.halfHeight, 'pergamino');
        pergamino.setDepth(0); // Asegura que esté en la capa más baja

        // Agregar el texto sobre la imagen
        const title = this.add.text(GlobalData.halfWidth, 200, 'Choose your alias', {
            fontFamily: 'Alagard', fontSize: 38, color: '#000',
            stroke: '#6F4E37', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5);

        // Crear campo de texto para el nombre
        const inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'text');
        inputElement.style.fontSize = '3vh';
        inputElement.style.padding = '1%';
        //inputElement.style.borderRadius = '10px';
        inputElement.style.border = 'none';
        inputElement.style.outline = 'none';
        inputElement.style.color = '#fff';
        inputElement.style.backgroundColor = '#6c3b2a';
        inputElement.style.position = 'absolute';
        inputElement.style.left = `35%`;
        inputElement.style.top = '45%';
        inputElement.style.width = '30%';

        const container = document.getElementById('game_container');
        container.style.position = "relative";
        container.appendChild(inputElement);

        inputElement.focus();

        // Crear función para verificar el nombre
        const verifyName = () => {
            const playerName = inputElement.value.trim(); // Obtener el nombre del input
        
            // Verificar si el nombre tiene entre 4 y 8 caracteres
            if (playerName.length > 8 || playerName.length < 4 || playerName.length === 0) {
                showError("The alias must be between 4 and 8 characters.");
                return false; // Si el nombre no es válido por longitud, no lo guarda
            }
        
            // Verificar que el nombre solo contenga letras o números y no tenga espacios
            for (let i = 0; i < playerName.length; i++) {
                const char = playerName[i];
                if (!((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9') || char == '_')) {
                    showError('The alias can only contain letters, numbers and "_"');
                    return false; // Si se encuentra un carácter que no sea letra ni número, devolver false
                }
            }
        
            return true; // Si es válido, devuelve true
        };

        // Función para mostrar el error en pantalla
        const showError = (message) => {
            // Crear un texto en Phaser para mostrar el error
            const errorText = this.add.text(GlobalData.halfWidth, GlobalData.halfHeight-100, message, {
                fontFamily: 'Arial', fontSize: 24, color: '#ff0000',
                align: 'center'
            }).setOrigin(0.5);

            // Desaparecer el mensaje después de 3 segundos
            this.time.delayedCall(3000, () => {
                errorText.setAlpha(0); // Hacerlo invisible
            });
        };

        // Función para manejar la acción del botón "Aceptar"
        const onAcceptButtonClick = () => {
            if (verifyName()) {
                // const inputElement = document.querySelector('input');
                if (inputElement) {
                    container.removeChild(inputElement); // Remover el campo de texto del DOM
                }
                game.input.keyboard.enabled = true;
                GlobalData.playerName = inputElement.value.trim();
                this.scene.start('CharSelection'); // Si el nombre es válido, pasar a la siguiente escena
            }
        };

        // Crear botón de "Aceptar" debajo del campo de texto
        createButton(this, GlobalData.halfWidth, GlobalData.halfHeight+80, 'Accept', onAcceptButtonClick);

        // Crear botón de "Regresar" para volver al menú principal
        const MainMenu = () => {
            if (inputElement) {
                container.removeChild(inputElement); // Remover el campo de texto del DOM
            }
            this.scene.start('MainMenu');
        };
        createButton(this, GlobalData.halfWidth + 0.5 * GlobalData.halfWidth, GlobalData.halfHeight + 0.5 * GlobalData.halfHeight, 'Back', MainMenu);
    }

    // Cuando la escena se destruye, también debemos remover el input del DOM.
    // shutdown() {
    //     const inputElement = document.querySelector('input');
    //     if (inputElement) {
    //         container.removeChild(inputElement); // Remover el campo de texto del DOM
    //     }
    // }
}
