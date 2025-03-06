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
        this.load.spritesheet('rogue', 'Characters/rogue.png', { frameWidth: 50, frameHeight: 37 });
        this.load.spritesheet("archer", "Characters/archer.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('eye_flight', 'Enemies/eye/Flight.png' 
            ,{ frameWidth: 200, frameHeight: 150 }
        );
        this.load.spritesheet('eye_death', 'Enemies/eye/Death.png'
            ,{ frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet('eye_attack', 'Enemies/eye/Attack.png'
            ,{ frameWidth: 200, frameHeight: 150 }
        );
        this.load.spritesheet('eye_take_hit', 'Enemies/eye/Take Hit.png'
            ,{ frameWidth: 150, frameHeight: 150 }
        );

        this.load.spritesheet('skeleton_idle', 'Enemies/skeleton/Idle.png'
            ,{ frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet('skeleton_walk', 'Enemies/skeleton/Walk.png'
            ,{ frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet('skeleton_death', 'Enemies/skeleton/Death.png'
            ,{ frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet('skeleton_attack', 'Enemies/skeleton/Attack.png'
            ,{ frameWidth: 200, frameHeight: 150 }
        );
        this.load.spritesheet('skeleton_take_hit', 'Enemies/skeleton/Take Hit.png'
            ,{ frameWidth: 150, frameHeight: 150 }
        );

        this.load.spritesheet('goblin_idle', 'Enemies/goblin/Idle.png'
            ,{ frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet('goblin_run', 'Enemies/goblin/Run.png'
            ,{ frameWidth: 200, frameHeight: 150 }
        );
        this.load.spritesheet('goblin_death', 'Enemies/goblin/Death.png'
            ,{ frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet('goblin_attack', 'Enemies/goblin/Attack.png'
            ,{ frameWidth: 200, frameHeight: 150 }
        );
        this.load.spritesheet('goblin_take_hit', 'Enemies/goblin/Take Hit.png'
            ,{ frameWidth: 150, frameHeight: 150 }
        );

        this.load.spritesheet('sickle','Enemies/sickle.png')

        // Cargar sprite sheets de los botones
        this.load.spritesheet('pauseBtn', 'pauseBtn.png', {
            frameWidth: 94, 
            frameHeight: 32  
        });
        this.load.spritesheet('continueBtn', 'continueBtn.png', {
            frameWidth: 94,
            frameHeight: 35
        });
        this.load.spritesheet('muteBtn', 'muteBtn.png', {
            frameWidth: 96,
            frameHeight: 34
        });
        this.load.spritesheet('unmuteBtn', 'unmuteBtn.png', {
            frameWidth: 96,
            frameHeight: 32
        });
        this.load.spritesheet('restartBtn', 'restartBtn.png', {
            frameWidth: 98,
            frameHeight: 33
        });
        this.load.spritesheet('exitBtn', 'exitBtn.png', {
            frameWidth: 96,
            frameHeight: 33
        });
        this.load.audio('backgroundMusic', 'music.mp3');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MyScene');
        this.scene.start('UI');
    }
}
