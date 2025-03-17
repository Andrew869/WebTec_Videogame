import { createButton } from '../utilities.js';
import { GlobalData } from '../main.js';

export default class CharSelection extends Phaser.Scene {
    constructor() {
        super('CharSelection');
    }

    preload() {
    }

    create() {
        const pergamino = this.add.image(GlobalData.halfWidth, GlobalData.halfHeight, 'pergamino');
        pergamino.setDepth(0);
        pergamino.setScale(1, 1);

        this.add.text(GlobalData.halfWidth, 160, 'Choose your character', {
            fontFamily: 'Alagard', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        const MainMenu = () => {
            this.sound.play('menuSelect');
            this.scene.start('MainMenu');
        };

        const Game = (charName) => {
            GlobalData.backgroundMusic.stop();
            GlobalData.charName = charName;
            this.scene.start('Game2');
            this.scene.start('UI');
        };

        this.createCharacterButton(GlobalData.halfWidth - 0.25 * GlobalData.halfWidth, GlobalData.halfHeight, 'archer', 0, () => Game("archer"));
        this.createCharacterButton(GlobalData.halfWidth + 0.25 * GlobalData.halfWidth, GlobalData.halfHeight, 'rogue', 0, () => Game("rogue"));
        
        createButton(this, GlobalData.halfWidth + 0.5 * GlobalData.halfWidth, GlobalData.halfHeight + 0.5 * GlobalData.halfHeight, 'Back', MainMenu);
    }

    createCharacterButton(x, y, characterKey, frameIndex, callback) {
        const characterImage = this.add.sprite(x, y, characterKey, frameIndex);
        characterImage.setOrigin(0.5);
        characterImage.setScale(4);
        characterImage.setDepth(1);

        characterImage.setInteractive()
            .on('pointerdown', callback)
            .on('pointerover', () => characterImage.setScale(6))
            .on('pointerout', () => characterImage.setScale(4));

        this.add.text(x, y + 80, '', {  
            fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
    }
}
