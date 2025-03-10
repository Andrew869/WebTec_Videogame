import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xff0000);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('layer0', 'bg_layers/Layer_0011_0.png');
        this.load.image('layer1', 'bg_layers/Layer_0010_1.png');
        this.load.image('layer2', 'bg_layers/Layer_0009_2.png');
        this.load.image('layer3', 'bg_layers/Layer_0008_3.png');
        this.load.image('layer4', 'bg_layers/Layer_0007_Lights.png');
        this.load.image('layer5', 'bg_layers/Layer_0006_4.png');
        this.load.image('layer6', 'bg_layers/Layer_0005_5.png');
        this.load.image('layer7', 'bg_layers/Layer_0004_Lights.png');
        this.load.image('layer8', 'bg_layers/Layer_0003_6.png');
        this.load.image('layer9', 'bg_layers/Layer_0002_7.png');
        this.load.image('layer10', 'bg_layers/Layer_0001_8.png');
        this.load.image('layer11', 'bg_layers/Layer_0000_9.png');
        this.load.image('platform','Platform.png');

        this.load.image('layer12','LV2/Hills Layer 01.png');
        this.load.image('layer13','LV2/Hills Layer 02.png');
        this.load.image('layer14','LV2/Hills Layer 03.png');
        this.load.image('layer15','LV2/Hills Layer 04.png');
        this.load.image('layer16','LV2/Hills Layer 05.png');
        this.load.image('layer17','LV2/Hills Layer 06.png');

        this.load.image('coin','CoinPoints.png');
        this.load.image('bonus','BonusItem.png');

        this.load.spritesheet('portal','Dimensional-Portal.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('rogue', 'Characters/rogue.png', { frameWidth: 50, frameHeight: 37 });
        this.load.spritesheet("archer", "Characters/archer.png", { frameWidth: 64, frameHeight: 64 });
        // Cargar los botones
        this.load.image('muteBtn', 'Mute.png');
        this.load.image('unmuteBtn', 'Unmute.png');
        this.load.image('restartBtn', 'Restart.png');
        this.load.image('exitBtn', 'Exit.png');

        this.load.audio('backgroundMusic', 'FX/music.mp3');
        this.load.audio('backgroundMusic2', 'FX/music2.mp3');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('UI');
        this.scene.start('MyScene');
        
    }
}