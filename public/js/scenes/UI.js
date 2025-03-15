import { GlobalData } from '../main.js';
import { socket } from '../socket.js';
import { pauseGame, continueGame, toggleMusic, exitGame } from '../utilities.js';

export default class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UI' });

        this.isPaused = false;
        this.pauseBtn;
        this.continueBtn;
        this.muteBtn;
        this.unmuteBtn;
        this.restartBtn;
        this.exitBtn;
        this.isMusicMuted = false;

        this.timerText;
        this.timeElapsed = 0;

        this.readyPlayersText;
    }

    create() {
        GlobalData.currUIScene = this;

        // Configura la tecla ESC
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.escKey.on('down', () => {
            if (this.gameOver) return;
            if (this.isPaused) {
                continueGame(this);
            } else {
                pauseGame(this);
            }
        });

        // this.timerText = this.add.text(GlobalData.halfWidth, GlobalData.halfHeight, `${this.reminingTime - 1}`, {fontFamily: 'Alagard', fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 8, align: 'center' });
        this.readyPlayersText = this.add.text(10, 10, "ready: 0/1", {fontFamily: 'Alagard' ,fontSize: '32px', fill: '#fff' });

        // this.timer = this.time.addEvent({
        //     delay: 1000,
        //     callback: () => {
        //         this.reminingTime--;
        //         this.timerText.setText(`${this.reminingTime}`);
        
        //         if (this.reminingTime <= 0) {
        //             console.log('¡Tiempo terminado!');
        //         }
        //     },
        //     callbackScope: this,
        //     repeat: this.reminingTime - 1
        // });

        // // Crear un evento que se repite cada segundo
        // this.time.addEvent({
        //     delay: 1000, // Cada 1000 ms (1 segundo)
        //     callback: () => {
        //         this.timeElapsed++; // Incrementa el contador
        //         this.timerText.setText('Tiempo: ' + this.timeElapsed); // Actualiza el texto
        //     },
        //     loop: true // Para que se repita infinitamente
        // });

        // Botones del menú de pausa (mute, restart, exit)
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        // const zoom = this.mainCamera.zoom;
        const centerX = screenWidth / 2;
        const centerY = screenHeight / 2;

        // Mute
        this.muteBtn = this.add.image(centerX - 100, centerY, 'buttons', 111)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1)
            .setVisible(false)
            .on('pointerdown', () => toggleMusic(this))
            .on('pointerover', () => this.muteBtn.setAlpha(1))
            .on('pointerout', () => this.muteBtn.setAlpha(0.8));

        // Unmute
        this.unmuteBtn = this.add.image(centerX - 100, centerY, 'buttons', 52)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1)
            .setVisible(false)
            .on('pointerdown', () => toggleMusic(this))
            .on('pointerover', () => this.unmuteBtn.setAlpha(0.8))
            .on('pointerout', () => this.unmuteBtn.setAlpha(1));

        // Restart
        // this.restartBtn = this.add.image(centerX, centerY, 'buttons', 15)
        //     .setInteractive()
        //     .setScrollFactor(0)
        //     .setDepth(1000)
        //     .setScale(1)
        //     .setVisible(false)
        //     .on('pointerdown', () => this.restartGame())
        //     .on('pointerover', () => this.restartBtn.setAlpha(0.8))
        //     .on('pointerout', () => this.restartBtn.setAlpha(1));

        // // Exit
        this.exitBtn = this.add.image(centerX + 100, centerY, 'buttons', 9)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1)
            .setVisible(false)
            .on('pointerdown', () => exitGame(this))
            .on('pointerover', () => this.exitBtn.setAlpha(0.8))
            .on('pointerout', () => this.exitBtn.setAlpha(1));
    }

    update(time, delta) {
        // this.timeElapsed += delta / 1000; // delta viene en milisegundos, lo convertimos a segundos
        // this.timerText.setText('Tiempo: ' + delta); // Mostrar con 3 decimales (milisegundos)
    }
}