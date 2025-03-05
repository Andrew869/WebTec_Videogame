import { Scene } from 'phaser';

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
        this.load.spritesheet('rogue', 'rogue.png',
            { frameWidth: 50, frameHeight: 37 }
        )
        // Cargar sprite sheets de los botones
        this.load.spritesheet('pauseBtn', 'assets/pauseBtn.png', {
            frameWidth: 100, 
            frameHeight: 50  
        });
        this.load.spritesheet('continueBtn', 'assets/continueBtn.png', {
            frameWidth: 100,
            frameHeight: 50
        });
        this.load.spritesheet('muteBtn', 'assets/muteBtn.png', {
            frameWidth: 100,
            frameHeight: 50
        });
        this.load.spritesheet('unmuteBtn', 'assets/unmuteBtn.png', {
            frameWidth: 100,
            frameHeight: 50
        });
        this.load.spritesheet('restartBtn', 'assets/restartBtn.png', {
            frameWidth: 100,
            frameHeight: 50
        });
        this.load.spritesheet('exitBtn', 'assets/exitBtn.png', {
            frameWidth: 100,
            frameHeight: 50
        });
        this.load.audio('backgroundMusic', 'music.mp3');
    }

    create() {
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
        
        this.ground = this.physics.add.staticBody(0, this.scale.height - 58, this.mapSizeX, 1);

        // this.platforms = this.physics.add.staticGroup();
        // this.platforms.create(800, 568, 'ground').setScale(6).refreshBody();
        // this.platforms.create(600, 400, 'ground');
        // this.platforms.create(50, 250, 'ground');
        // this.platforms.create(750, 220, 'ground');

        // player
        this.player = this.physics.add.sprite(600, 450, 'rogue');
        this.add.tileSprite(-100, this.diffHeight, this.mapSizeX * 1.2, this.mapSizeY, 'layer11').setOrigin(0, 0).setScrollFactor(1.2, 1);

        // this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setSize(10, 24, true);
        this.player.setOffset(20, 11);

        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'turn',
        //     frames: [{ key: 'dude', frame: 4 }],
        //     frameRate: 20
        // });

        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('rogue', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('rogue', { start: 10, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('rogue', { start: 20, end: 24 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'ascending',
            frames: [{ key: 'rogue', frame: 24 }],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'descending',
            frames: this.anims.generateFrameNumbers('rogue', { start: 25, end: 27 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'landing',
            frames: this.anims.generateFrameNumbers('rogue', { start: 27, end: 29 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'attack_1',
            frames: this.anims.generateFrameNumbers('rogue', { start: 40, end: 49 }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'attack_2',
            frames: this.anims.generateFrameNumbers('rogue', { start: 50, end: 59 }),
            frameRate: 18,
            repeat: 0
        });

        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('death', { start: 10, end: 17 }),
        //     frameRate: 10,
        //     repeat: -1,
        // });

        // this.player.body.setGravityY(300);
        // this.player.body.setGravityX(300);
        this.physics.add.collider(this.player, this.ground);

        this.cursors = this.input.keyboard.createCursorKeys();

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
            up: "W",
            down: "S",
            left: "A",
            right: "D",
            attack_1: "Q",
            attack_2: "E"
        }); // keyObjects.up, keyObjects.down, keyObjects.left, keyObjects.right

        this.mainCamera = this.cameras.main;

        this.mainCamera.setZoom(1.8);
        this.mainCamera.startFollow(this.player);
        this.mainCamera.setBounds(0, 0, this.scale.width * 2, this.scale.height);

        // Música
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();

        // Pruebas de pause y continue
        // Botón de pausa
        this.pauseBtn = this.add.sprite(this.cameras.main.width - 50, 50, 'pauseBtn')
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(1000)
        .on('pointerdown', () => {
            this.pauseBtn.setFrame(1); 
            this.pauseGame();
        })
        .on('pointerup', () => {
            this.pauseBtn.setFrame(0); 
        })
        .on('pointerover', () => {
            this.pauseBtn.setFrame(2); 
        })
        .on('pointerout', () => {
            this.pauseBtn.setFrame(0); 
        });

        // Botón de continuar
        this.continueBtn = this.add.sprite(this.cameras.main.width - 50, 50, 'continueBtn')
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(1000)
        .on('pointerdown', () => {
            this.continueBtn.setFrame(1);
            this.continueGame();
        })
        .on('pointerup', () => {
            this.continueBtn.setFrame(0); 
        })
        .on('pointerover', () => {
            this.continueBtn.setFrame(2);
        })
        .on('pointerout', () => {
            this.continueBtn.setFrame(0);
        })
        .setVisible(false);

        //const centerX = this.scale.width / 2;
        //const centerY = this.scale.height / 2;

        // Botón de mutear música
        this.muteBtn = this.add.sprite(this.cameras.main.centerX - 100, this.cameras.main.centerY, 'muteBtn')
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(1000)
        .on('pointerdown', () => {
            this.muteBtn.setFrame(1);
            this.toggleMusic();
        })
        .on('pointerup', () => {
            this.muteBtn.setFrame(0);
        })
        .on('pointerover', () => {
            this.muteBtn.setFrame(2);
        })
        .on('pointerout', () => {
            this.muteBtn.setFrame(0);
        })
        .setVisible(false);

        this.isMusicMuted = localStorage.getItem('isMusicMuted') === 'true';
        if (this.isMusicMuted) {
            this.sound.setVolume(0);
            this.muteBtn.setVisible(false);
            this.unmuteBtn.setVisible(true);
        }

        // Botón de desmutear música
        this.unmuteBtn = this.add.sprite(this.cameras.main.centerX - 100, this.cameras.main.centerY, 'unmuteBtn')
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(1000)
        .on('pointerdown', () => {
            this.unmuteBtn.setFrame(1);
            this.toggleMusic();
        })
        .on('pointerup', () => {
            this.unmuteBtn.setFrame(0);
        })
        .on('pointerover', () => {
            this.unmuteBtn.setFrame(2);
        })
        .on('pointerout', () => {
            this.unmuteBtn.setFrame(0);
        })
        .setVisible(false);

        // Botón de reiniciar
        this.restartBtn = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'restartBtn')
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(1000)
        .on('pointerdown', () => {
            this.restartBtn.setFrame(1);
            this.restartGame();
        })
        .on('pointerup', () => {
            this.restartBtn.setFrame(0);
        })
        .on('pointerover', () => {
            this.restartBtn.setFrame(2);
        })
        .on('pointerout', () => {
            this.restartBtn.setFrame(0);
        })
        .setVisible(false);

        // Botón de salir
        this.exitBtn = this.add.sprite(this.cameras.main.centerX + 100, this.cameras.main.centerY, 'exitBtn')
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(1000)
        .on('pointerdown', () => {
            this.exitBtn.setFrame(1);
            this.exitGame();
        })
        .on('pointerup', () => {
            this.exitBtn.setFrame(0);
        })
        .on('pointerover', () => {
            this.exitBtn.setFrame(2);
        })
        .on('pointerout', () => {
            this.exitBtn.setFrame(0);
        })
        .setVisible(false);
    }

    //botones pause continue
    pauseGame() {
        if (this.gameOver) return;
        
        this.isPaused = true;
        this.physics.pause(); 
        this.anims.pauseAll(); 
        this.pauseBtn.setVisible(false);
        this.continueBtn.setVisible(true);
        this.muteBtn.setVisible(!this.isMusicMuted);
        this.unmuteBtn.setVisible(this.isMusicMuted);
        this.restartBtn.setVisible(true);
        this.exitBtn.setVisible(true);
    }
    
    continueGame() {
        this.isPaused = false;
        this.physics.resume(); 
        this.anims.resumeAll(); 
        this.pauseBtn.setVisible(true);
        this.continueBtn.setVisible(false);
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
                this.player.anims.play('jump', true);
                this.player.on('animationcomplete', (animation, frame) => {
                    this.isJumping = false;
                });
            }
            else if (this.keyObjects.attack_1.isDown && !this.isAttacking) {
                this.isAttacking = true;
                this.player.anims.play('attack_1', true);
                this.player.on('animationcomplete', (animation, frame) => {
                    this.isAttacking = false;
                });
            }
            else if (this.keyObjects.attack_2.isDown && !this.isAttacking) {
                this.isAttacking = true;
                this.player.anims.play('attack_2', true);
                this.player.on('animationcomplete', (animation, frame) => {
                    this.isAttacking = false;
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
            if (!velY) {
                if (!velX)
                    this.player.anims.play('idle', true);
                else
                    this.player.anims.play('run', true);
            }
            else {
                // console.log("not zero");
                if (velY < 0)
                    this.player.anims.play('ascending', true);
                else
                    this.player.anims.play('descending', true);
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