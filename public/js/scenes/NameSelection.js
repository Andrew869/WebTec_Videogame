import { createButton } from '../utilities.js';
import { GlobalData } from '../main.js';

export default class NameSelection extends Phaser.Scene {
    constructor() {
        super('NameSelection');
    }

    create() {
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
        inputElement.style.fontSize = '24px';
        inputElement.style.padding = '10px';
        //inputElement.style.borderRadius = '10px';
        inputElement.style.border = '1px solid #000';
        inputElement.style.color = '#fff';
        inputElement.style.backgroundColor = '#6c3b2a';
        inputElement.style.position = 'absolute';
        inputElement.style.left = `${GlobalData.halfWidth - 150}px`;
        inputElement.style.top = '250px';
        inputElement.style.width = '300px';
        document.body.appendChild(inputElement); // Añadirlo al DOM

        // Crear función para verificar el nombre
        const verifyName = () => {
            const playerName = inputElement.value.trim(); // Obtener el nombre del input
        
            // Verificar si el nombre tiene entre 4 y 8 caracteres
            if (playerName.length > 8 || playerName.length < 4 || playerName.length === 0) {
                showError("El nombre debe tener entre 4 y 8 caracteres.");
                return false; // Si el nombre no es válido por longitud, no lo guarda
            }
        
            // Verificar que el nombre solo contenga letras o números y no tenga espacios
            for (let i = 0; i < playerName.length; i++) {
                const char = playerName[i];
                if (!((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9'))) {
                    showError("El nombre solo puede contener letras y números.");
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
                align: 'center', backgroundColor: '#fff', padding: { x: 20, y: 10 }
            }).setOrigin(0.5);

            // Desaparecer el mensaje después de 3 segundos
            this.time.delayedCall(3000, () => {
                errorText.setAlpha(0); // Hacerlo invisible
            });
        };

        // Función para manejar la acción del botón "Aceptar"
        const onAcceptButtonClick = () => {
            if (verifyName()) {
                const inputElement = document.querySelector('input');
                if (inputElement) {
                    document.body.removeChild(inputElement); // Remover el campo de texto del DOM
                }
                this.scene.start('CharSelection'); // Si el nombre es válido, pasar a la siguiente escena
            }
        };

        // Crear botón de "Aceptar" debajo del campo de texto
        createButton(this, GlobalData.halfWidth, GlobalData.halfHeight+80, 'Accept', onAcceptButtonClick);

        // Crear botón de "Regresar" para volver al menú principal
        const MainMenu = () => {
            const inputElement = document.querySelector('input');
            if (inputElement) {
                document.body.removeChild(inputElement); // Remover el campo de texto del DOM
            }
            this.scene.start('MainMenu');
        };
        createButton(this, GlobalData.halfWidth + 0.5 * GlobalData.halfWidth, GlobalData.halfHeight + 0.5 * GlobalData.halfHeight, 'Back', MainMenu);
    }

    // Cuando la escena se destruye, también debemos remover el input del DOM.
    shutdown() {
        const inputElement = document.querySelector('input');
        if (inputElement) {
            document.body.removeChild(inputElement); // Remover el campo de texto del DOM
        }
    }
}
