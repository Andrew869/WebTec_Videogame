import { game } from '../main.js';
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

        this.load.image('lvl_1_layer0', 'images/backgrounds/level_1/Layer_0011_0.png');
        this.load.image('lvl_1_layer1', 'images/backgrounds/level_1/Layer_0010_1.png');
        this.load.image('lvl_1_layer2', 'images/backgrounds/level_1/Layer_0009_2.png');
        this.load.image('lvl_1_layer3', 'images/backgrounds/level_1/Layer_0008_3.png');
        this.load.image('lvl_1_layer4', 'images/backgrounds/level_1/Layer_0007_Lights.png');
        this.load.image('lvl_1_layer5', 'images/backgrounds/level_1/Layer_0006_4.png');
        this.load.image('lvl_1_layer6', 'images/backgrounds/level_1/Layer_0005_5.png');
        this.load.image('lvl_1_layer7', 'images/backgrounds/level_1/Layer_0004_Lights.png');
        this.load.image('lvl_1_layer8', 'images/backgrounds/level_1/Layer_0003_6.png');
        this.load.image('lvl_1_layer9', 'images/backgrounds/level_1/Layer_0002_7.png');
        this.load.image('lvl_1_layer10', 'images/backgrounds/level_1/Layer_0001_8.png');
        this.load.image('lvl_1_layer11', 'images/backgrounds/level_1/Layer_0000_9.png');

        this.load.image('lvl_2_layer0', 'images/backgrounds/level_2/1.png');
        this.load.image('lvl_2_layer1', 'images/backgrounds/level_2/2.png');
        this.load.image('lvl_2_layer2', 'images/backgrounds/level_2/3.png');
        this.load.image('lvl_2_layer3', 'images/backgrounds/level_2/4.png');
        this.load.image('lvl_2_layer4', 'images/backgrounds/level_2/5.png');
        this.load.image('lvl_2_layer5', 'images/backgrounds/level_2/6.png');
        this.load.image('lvl_2_layer6', 'images/backgrounds/level_2/7.png');
        this.load.image('lvl_2_layer7', 'images/backgrounds/level_2/8.png');
        this.load.image('lvl_2_layer8', 'images/backgrounds/level_2/9.png');
        this.load.image('lvl_2_layer9', 'images/backgrounds/level_2/10.png');
        this.load.image('lvl_2_layer10', 'images/backgrounds/level_2/11.png');
        this.load.image('lvl_2_layer11', 'images/backgrounds/level_2/12.png');
        this.load.image('lvl_2_sky', 'images/backgrounds/level_2/sky.png');


        this.load.spritesheet('rogue', 'images/characters/rogue.png', { frameWidth: 50, frameHeight: 37 });
        this.load.spritesheet("archer", "images/characters/archer.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('portal','images/props/portal.png', {frameWidth: 32, frameHeight: 32});
        
        this.load.spritesheet('items', 'images/props/items.png', {frameWidth: 16, frameHeight: 16});

        this.load.spritesheet('buttons', 'images/ui/buttons.png', {frameWidth: 32, frameHeight: 32});

        this.load.font('Alagard', 'fonts/alagard.ttf', "truetype");
        
        this.load.audio('bg_m_menu', 'audio/music/menu.mp3');
        this.load.audio('bg_m_lvl_1', 'audio/music/level_1.mp3');
        this.load.audio('bg_m_lvl_2', 'audio/music/level_2.mp3');
        this.load.audio('gameClear', 'audio/sfx/gameClear.mp3');
        this.load.audio('gameOver', 'audio/sfx/gameOver.mp3');
        this.load.audio('menuSelect', 'audio/sfx/botonSound.mp3');
        this.load.audio('coin', 'audio/sfx/coin.mp3');
        this.load.audio('boost', 'audio/sfx/boost.mp3');
        this.load.audio('bonus', 'audio/sfx/bonus.mp3');
        this.load.audio('damage', 'audio/sfx/damage.mp3');

        this.load.image('pergamino', 'images/backgrounds/menu.png');
        this.load.image('titulo', 'images/Title.png');
        this.load.image('platform', 'images/props/platform.png');
        this.load.image('lava', 'images/props/lava.png');
        this.load.image('acid', 'images/props/acid.png');
        this.load.image('spike1', 'images/props/spikes1.png');
        this.load.image('spike2', 'images/props/spikes2.png');
        this.load.image('wall', 'images/props/wall.png');
        this.load.image('race_line', 'images/backgrounds/race_line.png');
        
    }

    create() {
        Object.values(characters).forEach(character => {
            Object.values(character.anims).forEach(anim => {
                this.anims.create(anim);
            });
        });

        this.anims.create({
            key: 'portal_anim',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
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
