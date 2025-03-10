import { Scene } from 'phaser';
import { characters } from '../characters';

export class MyScene2 extends Scene {
    constructor() {
        super('MyScene2');

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

        this.initialPortal;
        this.finalPortal;
        this.isLevelCompleted = false;
    }

    init() {
    }

    preload() {
    }

    create() {
        this.cameras.main.fadeIn(1000);
        
        this.groundPosY = this.scale.height - 58;

        this.physics.world.setBounds(0, 0, this.mapSizeX, this.mapSizeY);
        // platforms
        // this.add.image(400, 300, 'layer1');
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer12').setOrigin(0, 0).setScrollFactor(0, 1);
        //this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer').setOrigin(0, 0).setScrollFactor(0.1, 1);
        //this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer').setOrigin(0, 0).setScrollFactor(0.2, 1);
        //this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer').setOrigin(0, 0).setScrollFactor(0.3, 1);
        //this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer').setOrigin(0, 0).setScrollFactor(0.4, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer13').setOrigin(0, 0).setScrollFactor(0.5, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer14').setOrigin(0, 0).setScrollFactor(0.6, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer15').setOrigin(0, 0).setScrollFactor(0.7, 1);
        //this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer').setOrigin(0, 0).setScrollFactor(0.8, 1);
        this.add.tileSprite(0, this.diffHeight, this.mapSizeX, this.mapSizeY, 'layer16').setOrigin(0, 0).setScrollFactor(1, 1);
        this.add.tileSprite(-120, this.diffHeight, this.mapSizeX * 1.2, this.mapSizeY, 'layer17').setOrigin(0, 0).setScrollFactor(1.2, 1).setDepth(2);

        this.ground = this.physics.add.staticBody(0, this.groundPosY, this.mapSizeX, 10);
        
        // this.platforms = this.physics.add.staticGroup();
        // this.platforms.create(800, 568, 'ground').setScale(6).refreshBody();
        // this.platforms.create(600, 400, 'ground');
        // this.platforms.create(50, 250, 'ground');
        // this.platforms.create(750, 220, 'ground');

        // Plataformas principales
        this.platforms = this.physics.add.staticGroup();
        
        // Plataforma grande
        const mainPlatform = this.platforms.create(600, this.groundPosY - 50, 'platform');
        mainPlatform.setScale(0.5, 0.3);
        mainPlatform.refreshBody();
        
        // Plataformas flotantes
        this.createFloatingPlatform(40, 50);
        this.createFloatingPlatform(800, 400);
        this.createFloatingPlatform(200, 300);
        this.createFloatingPlatform(1000, 250);

        // Plataforma móvil
        this.movingPlatform = this.platforms.create(500, 200, 'platform');
        this.movingPlatform.setScale(0.4);
        this.movingPlatform.refreshBody();
        this.movingPlatform.moveRight = true;

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
        
        // Colisión entre jugador y plataformas

        this.initialPortal = this.physics.add.sprite(600, this.groundPosY - 40, 'portal')
        .setOrigin(0.5, 1)
        .setScale(4)
        .setDepth(2)
        .refreshBody();

        this.finalPortal = this.physics.add.sprite(this.mapSizeX - 600, this.groundPosY - 40, 'portal')
            .setOrigin(0.5, 1)
            .setScale(4)
            .setDepth(2)
            .refreshBody();

        this.initialPortal.body.allowGravity = false;
        this.finalPortal.body.allowGravity = false;

        this.physics.add.collider(this.initialPortal, this.ground);
        this.physics.add.collider(this.finalPortal, this.ground);

        this.anims.create({
            key: 'portal_anim',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.initialPortal.anims.play('portal_anim', true);
        this.finalPortal.anims.play('portal_anim', true);

        this.player.setPosition(this.initialPortal.x, this.initialPortal.y - 100);

        this.physics.add.overlap(this.player, this.finalPortal, this.completeLevel, null, this);

        this.physics.add.collider(this.player, this.platforms);

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
        this.backgroundMusic = this.sound.add('backgroundMusic2', { loop: true });
        this.backgroundMusic.play();

        /*const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        const zoom = this.mainCamera.zoom;*/

        // Configura la tecla ESC
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
            .setScale(1)
            .setVisible(false)
            .on('pointerdown', () => this.toggleMusic())
            .on('pointerover', () => this.muteBtn.setAlpha(0.8))
            .on('pointerout', () => this.muteBtn.setAlpha(1));

        // Unmute
        this.unmuteBtn = this.add.image(centerX - 100, centerY, 'unmuteBtn')
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1)
            .setVisible(false)
            .on('pointerdown', () => this.toggleMusic())
            .on('pointerover', () => this.unmuteBtn.setAlpha(0.8))
            .on('pointerout', () => this.unmuteBtn.setAlpha(1));

        // Restart
        this.restartBtn = this.add.image(centerX, centerY, 'restartBtn')
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1)
            .setVisible(false)
            .on('pointerdown', () => this.restartGame())
            .on('pointerover', () => this.restartBtn.setAlpha(0.8))
            .on('pointerout', () => this.restartBtn.setAlpha(1));

        // Exit
        this.exitBtn = this.add.image(centerX + 100, centerY, 'exitBtn')
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1)
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
        if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
            this.backgroundMusic.stop();
        }

        this.isPaused = false;

        this.scene.restart();
    }

    exitGame() {
        // Redirige al menu
        window.location.href = '/';
    }

    createFloatingPlatform(x, y) {
        const platform = this.platforms.create(x, y, 'platform');
        platform.setScale(0.35);
        platform.refreshBody();
        
        platform.body.setSize(platform.width * 0.7 * 0.9, platform.height * 0.7 * 0.3);
        platform.body.setOffset(platform.width * 0.05, platform.height * 0.7);
    }

    completeLevel() {
        if (this.isLevelCompleted) return;
        
        this.isLevelCompleted = true;
        this.physics.pause();
        
        this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
            if (progress === 1) {
                this.scene.restart();

                /*if (this.backgroundMusic) this.backgroundMusic.stop();
                this.scene.start('MyScene2', { score: this.score });*/
            }
        });
        
        if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
            this.backgroundMusic.stop();
        }
    }

    update() {
        if (this.gameOver || this.isPaused || this.isLevelCompleted) {
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

        if (!this.gameOver && !this.isPaused) {
            this.movePlatform(this.movingPlatform, 500, 200, 300, 1.5);
        }

        // console.log(this.player.body.velocity.y);
        // this.mainCamera.setAngle(this.angle++);
    }

    movePlatform(platform, startX, startY, range, speed) {
        if (platform.moveRight) {
            platform.x += speed;
            if (platform.x >= startX + range) {
                platform.moveRight = false;
            }
        } else {
            platform.x -= speed;
            if (platform.x <= startX) {
                platform.moveRight = true;
            }
        }
        platform.refreshBody();
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
        this.scene.start('MyScene2');

        // this.player.setTint(0xff0000);

        // this.player.anims.play('turn');

        // this.gameOver = true;
    }
}