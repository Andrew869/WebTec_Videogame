import { socket } from '../socket.js';
import { characters } from '../characters.js';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        const { width, height } = this.scale;
        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(width / 2, height / 2, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(width / 2 - (460 / 2), height / 2, 4, 28, 0xff0000);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('../../assets/');

        this.load.image('layer0', 'images/backgrounds/level_1/Layer_0011_0.png');
        this.load.image('layer1', 'images/backgrounds/level_1/Layer_0010_1.png');
        this.load.image('layer2', 'images/backgrounds/level_1/Layer_0009_2.png');
        this.load.image('layer3', 'images/backgrounds/level_1/Layer_0008_3.png');
        this.load.image('layer4', 'images/backgrounds/level_1/Layer_0007_Lights.png');
        this.load.image('layer5', 'images/backgrounds/level_1/Layer_0006_4.png');
        this.load.image('layer6', 'images/backgrounds/level_1/Layer_0005_5.png');
        this.load.image('layer7', 'images/backgrounds/level_1/Layer_0004_Lights.png');
        this.load.image('layer8', 'images/backgrounds/level_1/Layer_0003_6.png');
        this.load.image('layer9', 'images/backgrounds/level_1/Layer_0002_7.png');
        this.load.image('layer10', 'images/backgrounds/level_1/Layer_0001_8.png');
        this.load.image('layer11', 'images/backgrounds/level_1/Layer_0000_9.png');

        this.load.spritesheet('rogue', 'images/characters/rogue.png', { frameWidth: 50, frameHeight: 37 });
        this.load.spritesheet("archer", "images/characters/archer.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('portal','images/props/portal.png', {frameWidth: 32, frameHeight: 32});
        
        this.load.spritesheet('items', 'images/props/items.png', {frameWidth: 16, frameHeight: 16});

        this.load.spritesheet('buttons', 'images/ui/buttons.png', {frameWidth: 32, frameHeight: 32});

        this.load.font('Alagard', 'fonts/alagard.ttf', "truetype");
        
        this.load.audio('bg_m_menu', 'audio/music/menu.mp3');
        this.load.audio('bg_m_lvl_1', 'audio/music/level_1.mp3');
        this.load.image('pergamino', 'images/backgrounds/menu.png');
        
    }

    create() {
        Object.values(characters).forEach(character => {
            Object.values(character.anims).forEach(anim => {
                this.anims.create(anim);
            });
        });
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        // socket.emit("assetsLoaded");
        // this.scene.start('Game');
        // this.scene.start('UI');
        this.scene.start('MainMenu');
    }
}
