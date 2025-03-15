import { GlobalData } from '../main.js';

export default class Game2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game2' });
    }

    create() {
        GlobalData.currGameScene = this;
        this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
    }
}