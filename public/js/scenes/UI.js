import { socket } from '../socket.js';

let idText;

socket.on('connect', () => {
    idText.setText(socket.id);
});

export default class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UI' });
    }

    create() {
        idText = this.add.text(10, 10, `-`, {fontFamily: 'system-ui', fontSize: '20px', fill: '#fff' }).setScrollFactor(0);
    }
}