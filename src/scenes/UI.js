import { Scene } from 'phaser';

export class UI extends Scene {
    constructor() {
        super({ key: 'UI', active: true });
    }

    create() {
        this.add.text(10, 10, 'Andrew: 0', {fontFamily: '"Alagard", Arial', fontSize: '40px', fill: '#fff' }).setScrollFactor(0);
    }
}
