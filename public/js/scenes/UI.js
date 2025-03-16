import { GlobalData } from '../main.js';
<<<<<<< HEAD
=======
import { socket } from '../socket.js';
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
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
<<<<<<< HEAD
    }

    create() {
=======

        this.chronoText;

        this.readyPlayersText;
    }

    create() {
        GlobalData.currUIScene = this;

>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
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

<<<<<<< HEAD
=======
        this.chronoText = this.add.text(GlobalData.width - 100, 10, "0.00", {fontFamily: 'Alagard', fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 8, align: 'center' });
        this.readyPlayersText = this.add.text(10, 10, "ready: 0/1", {fontFamily: 'Alagard', fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 8, align: 'center' });

>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
        // Botones del menú de pausa (mute, restart, exit)
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        // const zoom = this.mainCamera.zoom;
        const centerX = screenWidth / 2;
        const centerY = screenHeight / 2;

<<<<<<< HEAD
        this.scoreText = this.add.text(
            this.scale.width - 20, 20, 'Score: 0', { fontFamily: 'Alagard', fontSize: '24px', color: '#ffffff' })
            .setOrigin(1, 0)
            .setScrollFactor(0)
            .setDepth(1000);

=======
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
        // Mute
        this.muteBtn = this.add.image(centerX - 100, centerY, 'buttons', 111)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
<<<<<<< HEAD
            .setScale(1)
=======
            .setScale(5)
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
            .setVisible(false)
            .on('pointerdown', () => toggleMusic(this))
            .on('pointerover', () => this.muteBtn.setAlpha(1))
            .on('pointerout', () => this.muteBtn.setAlpha(0.8));

        // Unmute
        this.unmuteBtn = this.add.image(centerX - 100, centerY, 'buttons', 52)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
<<<<<<< HEAD
            .setScale(1)
=======
            .setScale(5)
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
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
<<<<<<< HEAD
            .setScale(1)
=======
            .setScale(5)
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
            .setVisible(false)
            .on('pointerdown', () => exitGame(this))
            .on('pointerover', () => this.exitBtn.setAlpha(0.8))
            .on('pointerout', () => this.exitBtn.setAlpha(1));
    }
<<<<<<< HEAD
=======

    update(time, delta) {
        if(GlobalData.levelStarted){
            GlobalData.timeElapsed += delta / 1000;
            this.chronoText.setText(GlobalData.timeElapsed.toFixed(2));
        }
    }
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
}