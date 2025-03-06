import { Scene } from 'phaser';
import { characters } from '../characters';

export class MyScene extends Scene {
    constructor() {
        super('MyScene');

        this.player;
        this.stars;
        this.bombs;
        this.ground;
        this.platforms;
        this.cursors;
        this.score = 0;
        this.gameOver = false;
        this.scoreText;

        this.keyObjects;
        this.mainCamera;

        this.angle = 0;

        this.isAttacking = false;
        this.isOnGround = false;
        this.isLanding = false;
        this.isJumping = false;

        this.isOnAir = true;
        this.prevOnAirState = false;

        this.background;

        this.mapSizeX = 1280 * 2;
        this.mapSizeY = 793;

        this.diffHeight = 720 - this.mapSizeY

        this.groundPosY = 0;

        this.currChar = characters.rogue;

        this.isPaused = false;
        this.pauseBtn;
        this.continueBtn;
        this.muteBtn;
        this.unmuteBtn;
        this.restartBtn;
        this.exitBtn;
        this.isMusicMuted = false;
    }

    init() {
    }

    preload() {
        this.load.setPath('assets');
        // Cargar imagenes de los botones
        this.load.image('muteBtn', 'assets/Mute.png');
        this.load.image('unmuteBtn', 'assets/Unmute.png');
        this.load.image('restartBtn', 'assets/Restart.png');
        this.load.image('exitBtn', 'assets/Exit.png');
        this.load.audio('backgroundMusic', 'music.mp3');
    }

    create() {
        this.groundPosY = this.scale.height - 58;

        this.physics.world.setBounds(0, 0, this.mapSizeX, this.mapSizeY);
        // platforms
        // this.add.image(400, 300, 'layer1');
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer0').setOrigin(0, 0).setScrollFactor(0, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer1').setOrigin(0, 0).setScrollFactor(0, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer2').setOrigin(0, 0).setScrollFactor(0.1, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer3').setOrigin(0, 0).setScrollFactor(0.2, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer4').setOrigin(0, 0).setScrollFactor(0.3, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer5').setOrigin(0, 0).setScrollFactor(0.4, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer6').setOrigin(0, 0).setScrollFactor(0.5, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer7').setOrigin(0, 0).setScrollFactor(0.6, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer8').setOrigin(0, 0).setScrollFactor(0.7, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer9').setOrigin(0, 0).setScrollFactor(0.8, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer10').setOrigin(0, 0).setScrollFactor(1, 1);
        this.add.tileSprite(-120, this.diffHeight, this.mapSizeX * 1.2, this.mapSizeY, 'layer11').setOrigin(0, 0).setScrollFactor(1.2, 1).setDepth(2);

        this.ground = this.physics.add.staticBody(0, this.groundPosY, this.mapSizeX, 10);

        // this.platforms = this.physics.add.staticGroup();
        // this.platforms.create(800, 568, 'ground').setScale(6).refreshBody();
        // this.platforms.create(600, 400, 'ground');
        // this.platforms.create(50, 250, 'ground');
        // this.platforms.create(750, 220, 'ground');

        // player
        this.player = this.physics.add.sprite(600, 450, 'rogue');
        this.player.setDepth(1);
        

        // this.player.setBounce(0.2);
        this.player.setSize(this.currChar.size.width, this.currChar.size.height);
        this.player.setOffset(this.currChar.offset.x, this.currChar.offset.y);
        this.player.setCollideWorldBounds(true);

        Object.values(characters).forEach(character => {
            Object.values(character.anims).forEach(anim => {
                this.anims.create(anim);
            });
        });

        // this.player.body.setGravityY(300);
        // this.player.body.setGravityX(300);
        this.physics.add.collider(this.player, this.ground);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.sprite(500, this.groundPosY - 100, 'archer').setOrigin(0, 0);
        this.physics.add.collider(this.stars, this.ground);

        // this.stars = this.physics.add.group({
        //     key: 'star',
        //     repeat: 3,
        //     setXY: { x: 12, y: 0, stepX: 70 }
        // });

        // this.stars.children.iterate(function (child) {
        // child.setScale(0.5, 0.5);
        // child.setTexture('star').setPipeline('TextureTint');
        //child.texture.setFilter(Phaser.Textures.FilterMode.NEAREST); // pixel art
        // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        // child.setGravityY(300);

        // });

        // this.physics.add.collider(this.stars, this.platforms);
        // this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        // this.physics.add.collider(this.player, this.stars);

        // this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        // this.bombs = this.physics.add.group();

        // this.physics.add.collider(this.bombs, this.platforms);

        // this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        this.keyObjects = this.input.keyboard.addKeys({
            up: "SPACE",
            down: "S",
            left: "A",
            right: "D",
            hability_1: "ONE",
            hability_2: "TWO",
            hability_3: "THREE",
        }); // keyObjects.up, keyObjects.down, keyObjects.left, keyObjects.right

        this.mainCamera = this.cameras.main;

        this.mainCamera.setZoom(2);
        this.mainCamera.startFollow(this.player);
        this.mainCamera.setBounds(0, 0, this.mapSizeX, this.scale.height);

        // this.stars.anims.play('death', true);

        // Música
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();

        /*const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        const zoom = this.mainCamera.zoom;*/

        // ESC para pausar y continuar
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.escKey.on('down', () => {
            if (this.gameOver) return;
            if (this.isPaused) {
                this.continueGame();
            } else {
                this.pauseGame();
            }
        });

        // Botones del menú de pausa (mute, restart, exit)
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        const zoom = this.mainCamera.zoom;
        const centerX = screenWidth / 2;
        const centerY = screenHeight / 2;

        // Mute
        this.muteBtn = this.add.image(centerX - 100, centerY, 'muteBtn')
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1 / zoom)
            .setVisible(false)
            .on('pointerdown', () => this.toggleMusic())
            .on('pointerover', () => this.muteBtn.setAlpha(0.8))
            .on('pointerout', () => this.muteBtn.setAlpha(1));

        // Unmute
        this.unmuteBtn = this.add.image(centerX - 100, centerY, 'unmuteBtn')
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1 / zoom)
            .setVisible(false)
            .on('pointerdown', () => this.toggleMusic())
            .on('pointerover', () => this.unmuteBtn.setAlpha(0.8))
            .on('pointerout', () => this.unmuteBtn.setAlpha(1));

        // Restart
        this.restartBtn = this.add.image(centerX, centerY, 'restartBtn')
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1 / zoom)
            .setVisible(false)
            .on('pointerdown', () => this.restartGame())
            .on('pointerover', () => this.restartBtn.setAlpha(0.8))
            .on('pointerout', () => this.restartBtn.setAlpha(1));

        // Exit
        this.exitBtn = this.add.image(centerX + 100, centerY, 'exitBtn')
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1 / zoom)
            .setVisible(false)
            .on('pointerdown', () => this.exitGame())
            .on('pointerover', () => this.exitBtn.setAlpha(0.8))
            .on('pointerout', () => this.exitBtn.setAlpha(1));
    }

    //botones pause continue
    pauseGame() {
        if (this.gameOver) return;
        
        this.isPaused = true;
        this.physics.pause();
        this.anims.pauseAll();
        
        this.muteBtn.setVisible(!this.isMusicMuted);
        this.unmuteBtn.setVisible(this.isMusicMuted);
        this.restartBtn.setVisible(true);
        this.exitBtn.setVisible(true);
    }
    
    continueGame() {
        this.isPaused = false;
        this.physics.resume();
        this.anims.resumeAll();
        
        this.muteBtn.setVisible(false);
        this.unmuteBtn.setVisible(false);
        this.restartBtn.setVisible(false);
        this.exitBtn.setVisible(false);
    }

    toggleMusic() {
        this.isMusicMuted = !this.isMusicMuted;
        localStorage.setItem('isMusicMuted', this.isMusicMuted);
    
        if (this.isMusicMuted) {
            this.sound.setVolume(0);
            this.muteBtn.setVisible(false);
            this.unmuteBtn.setVisible(true);
        } else {
            this.sound.setVolume(1);
            this.muteBtn.setVisible(true);
            this.unmuteBtn.setVisible(false);
        }
    }

    restartGame() {
        this.scene.restart();
    }

    exitGame() {
        // Redirige al menu
        window.location.href = '/';
    }

    update() {
        if (this.gameOver || this.isPaused) {
            return;
        }

        let velX = this.player.body.velocity.x;
        let velY = this.player.body.velocity.y;

        this.isOnGround = this.player.body.touching.down;

        this.prevOnAirState = this.isOnAir;
        this.isOnAir = velY !== 0 && !this.isOnGround;
        // this.background.tilePositionX += 1;

        if ((this.cursors.left.isDown || this.keyObjects.left.isDown) && !this.isAttacking) {
            this.player.setVelocityX(-160);
            // this.player.anims.play('right', true);
            this.player.setFlipX(true);
            // this.player.anims.play('left', true);
        }
        else if ((this.cursors.right.isDown || this.keyObjects.right.isDown) && !this.isAttacking) {
            this.player.setVelocityX(160);
            this.player.setFlipX(false);
            // this.player.anims.play('right', true);
        }
        else if (this.player.body.touching.down) {
            this.player.setVelocityX(0);
            // this.player.anims.play('idle', true);
        }

        if (this.isOnGround) {
            if ((this.cursors.up.isDown || this.keyObjects.up.isDown)) {
                this.player.setVelocityY(-300);
                this.isJumping = true;
                this.player.anims.play(this.currChar.charName + '_' + 'jump', true);
                this.player.on('animationcomplete', (animation, frame) => {
                    this.isJumping = false;
                });
            }
            else if (this.keyObjects.hability_1.isDown && !this.isAttacking) {
                this.isAttacking = true;
                this.player.anims.play(this.currChar.charName + '_' + 'attack', true);
                this.player.on('animationcomplete', (animation, frame) => {
                    this.isAttacking = false;
                });
            }
            // else if (this.keyObjects.attack_2.isDown && !this.isAttacking) {
            //     this.isAttacking = true;
            //     this.player.anims.play('attack_2', true);
            //     this.player.on('animationcomplete', (animation, frame) => {
            //         this.isAttacking = false;
            //     });
            // }
            else if (this.prevOnAirState !== this.isOnAir) {
                this.isLanding = true;
                this.player.anims.play(this.currChar.charName + '_' + 'landing', true);
                this.player.on('animationcomplete', (animation, frame) => {
                    this.isLanding = false;
                });
            }
            else if(this.prevOnAirState !== this.isOnAir) {
                this.isLanding = true;
                this.player.anims.play('landing', true);
                this.player.on('animationcomplete', (animation, frame) => {
                    this.isLanding = false;
                });
            }
        }

        if (!this.isAttacking && !this.isJumping && !this.isLanding) {
            if (!this.isOnAir ) {
                if (!velX)
                    this.player.anims.play(this.currChar.charName + '_' + 'idle', true);
                else
                    this.player.anims.play(this.currChar.charName + '_' + 'run', true);
            }
            else {
                // console.log("not zero");
                if (velY < 0)
                    this.player.anims.play(this.currChar.charName + '_' + 'rising', true);
                else
                    this.player.anims.play(this.currChar.charName + '_' + 'falling', true);
            }
        }


        // console.log(this.player.body.velocity.y);
        // this.mainCamera.setAngle(this.angle++);
    }

    // collectStar(player, star) {
    //     star.disableBody(true, true);

    //     this.score += 10;
    //     this.scoreText.setText('Score: ' + this.score);

    //     if (this.stars.countActive(true) === 0) {
    //         this.stars.children.iterate(function (child) {

    //             child.enableBody(true, child.x, 0, true, true);

    //         });

    //         var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    //         var bomb = this.bombs.create(x, 16, 'bomb');

    //         bomb.setCircle(30, 0, 0);

    //         bomb.setBounce(1);
    //         bomb.scaleX = 5;
    //         bomb.scaleY = 5;
    //         bomb.setCollideWorldBounds(true);
    //         bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    //     }
    // }

    hitBomb(player, bomb) {
        this.scene.start('MyScene');

        // this.player.setTint(0xff0000);

        // this.player.anims.play('turn');

        // this.gameOver = true;
    }
}
