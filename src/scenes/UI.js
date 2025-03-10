import { Scene } from 'phaser';

export class UI extends Scene {
    constructor() {
        super({ key: 'UI' });
    }

    create() {
        this.scoreText = this.add.text(10, 10, '', {
            fontFamily: '"Alagard", Arial', 
            fontSize: '40px', 
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        }).setScrollFactor(0);

        this.registry.events.on('changedata', this.updateUI, this);
        this.updateUI();
    }

    updateUI() {
        const score = this.registry.get('score');
        const multiplierActive = this.registry.get('multiplierActive');
        const multiplierTime = this.registry.get('multiplierTime');
        
        let text = `Andrew: ${score}`;
        
        if(multiplierActive) {
            text += `   X2   ${multiplierTime}s`;
        }
        
        this.scoreText.setText(text);
    }

    shutdown() {
        this.registry.events.off('changedata', this.updateUI, this);
    }
}
