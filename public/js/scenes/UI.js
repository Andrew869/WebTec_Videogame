import { GlobalData } from '../main.js';
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
    }

    create() {
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
}