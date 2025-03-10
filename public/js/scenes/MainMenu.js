import { socket  } from '../socket.js';

export default class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    create() {
        const { width, height } = this.scale;
        this.add.text(0, 0, `Click to Play`, {fontFamily: 'Alagard', fontSize: '80px', fill: '#fff' })
        .setPosition(width / 2, height / 2)
        .setOrigin(0.5, 0.5);
        this.input.once('pointerdown', () => {
            this.scene.start('Game');
            this.scene.start('UI');
        });
    }
}