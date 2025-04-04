import { GlobalData } from '../main.js';
import { socket } from '../socket.js';
import { pauseGame, continueGame, toggleMusic, exitGame, getCurrentDate } from '../utilities.js';

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

        this.readyPlayersText;
        this.chronoText;
        this.scoreText;
        this.lvlText;
        this.dateText;
        this.multiplierText;

        this.countdownText;
        this.startTime;
        this.item;

        this.hearts = [];
    }

    create() {
        GlobalData.currUIScene = this;
        this.startTime = 0;

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

        this.chronoText = this.add.text(GlobalData.width - 105, 10, "000.00", {fontFamily: 'Alagard', fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 8, align: 'center' });
        this.scoreText = this.add.text(GlobalData.width - 10, 40, "00000", {fontFamily: 'Alagard', fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 8, align: 'center' }).setOrigin(1, 0);
        this.readyPlayersText = this.add.text(10, 60, "Ready: 0/1", {fontFamily: 'Alagard', fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 8, align: 'center' });
        this.lvlText = this.add.text(10, GlobalData.height - 40, "Level: 0", {fontFamily: 'Alagard', fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 8, align: 'center' });
        this.dateText = this.add.text(GlobalData.width - 10, GlobalData.height - 40, getCurrentDate(), {fontFamily: 'Alagard', fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 8, align: 'center' }).setOrigin(1, 0);
        this.multiplierText = this.add.text(GlobalData.width - 10, 70, "x1", {fontFamily: 'Alagard', fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 8, align: 'center' }).setOrigin(1, 0);

        this.hearts = [];
        for (let i = 0; i < GlobalData.maxHealth / 2; i++) {
            let heart = this.add.image(34 + i * 45, 34, 'items', 47)
                .setScale(3);
            this.hearts.push(heart);
        }

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
            .setScale(5)
            .setVisible(false)
            .on('pointerdown', () => toggleMusic(this))
            .on('pointerover', () => this.muteBtn.setAlpha(1))
            .on('pointerout', () => this.muteBtn.setAlpha(0.8));

        // Unmute
        this.unmuteBtn = this.add.image(centerX - 100, centerY, 'buttons', 52)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(5)
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
            .setScale(5)
            .setVisible(false)
            .on('pointerdown', () => exitGame('MainMenu'))
            .on('pointerover', () => this.exitBtn.setAlpha(0.8))
            .on('pointerout', () => this.exitBtn.setAlpha(1));
    }

    update(time, delta) {
        if(GlobalData.levelStarted){
            GlobalData.timeElapsed += delta / 1000;
            this.chronoText.setText(GlobalData.timeElapsed.toFixed(2).padStart(6, '0'));

            if(this.countdownText) {
                this.countdownText.setText((3 - (GlobalData.timeElapsed - this.startTime)).toFixed(2));
                this.countdownText.setPosition(this.item.x, this.item.y - 40);
            }
        }
    }
}