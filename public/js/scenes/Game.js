import { GlobalData } from '../main.js';
import { socket } from '../socket.js';
import { characters } from '../characters.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
        this.ground;
        this.platforms;
        this.score = 0;
        this.scoreText;
        this.gameOver = false;

        this.keyObjects;
        this.mainCamera;

        this.angle = 0;

        this.prevVelX = 0;
        this.velX = 0;
        this.velY = 0;

        this.isAttacking = false;
        this.isLanding = false;
        this.isJumping = false;

        this.isOnGround = false;
        this.prevOnGround = true;
        

        // GlobalData.mapSizeX = 1280 * 2;
        // GlobalData.mapSizeY = 793;

        this.diffHeight = 720 - GlobalData.mapSizeY

        this.groundPosY = 0;

        GlobalData.currChar = characters.rogue;
    }

    preload() {
    }

    create() {
        this.groundPosY = this.scale.height - 58;

        this.physics.world.setBounds(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY);

        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'layer0').setOrigin(0, 0).setScrollFactor(0, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'layer1').setOrigin(0, 0).setScrollFactor(0, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'layer2').setOrigin(0, 0).setScrollFactor(0.1, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'layer3').setOrigin(0, 0).setScrollFactor(0.2, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'layer4').setOrigin(0, 0).setScrollFactor(0.3, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'layer5').setOrigin(0, 0).setScrollFactor(0.4, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'layer6').setOrigin(0, 0).setScrollFactor(0.5, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'layer7').setOrigin(0, 0).setScrollFactor(0.6, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'layer8').setOrigin(0, 0).setScrollFactor(0.7, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'layer9').setOrigin(0, 0).setScrollFactor(0.8, 1);
        this.add.tileSprite(0, this.diffHeight, GlobalData.mapSizeX, GlobalData.mapSizeY, 'layer10').setOrigin(0, 0).setScrollFactor(1, 1);
        this.add.tileSprite(-120, this.diffHeight, GlobalData.mapSizeX * 1.2, GlobalData.mapSizeY, 'layer11').setOrigin(0, 0).setScrollFactor(1.2, 1).setDepth(3);

        GlobalData.ground = this.physics.add.staticBody(0, this.groundPosY, GlobalData.mapSizeX, 10);


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
        this.finalPortal.body.setSize(50, 70);
        this.finalPortal.body.setOffset(20, 30);

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

        // this.physics.add.overlap(this.player, this.finalPortal, this.completeLevel, null, this);

        // this.physics.add.collider(this.player, this.platforms);

        this.keyObjects = this.input.keyboard.addKeys({
            up: "SPACE",
            down: "S",
            left: "A",
            right: "D",
            hability_1: "ONE",
            hability_2: "TWO",
            hability_3: "THREE",
        }); // keyObjects.up, keyObjects.down, keyObjects.left, keyObjects.right

        // Música
        this.backgroundMusic = this.sound.add('bg_m_lvl_1', { loop: true });
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
        // const zoom = this.mainCamera.zoom;
        const centerX = screenWidth / 2;
        const centerY = screenHeight / 2;

        // Mute
        this.muteBtn = this.add.image(centerX - 100, centerY, 'buttons', 111)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1)
            .setVisible(false)
            .on('pointerdown', () => this.toggleMusic())
            .on('pointerover', () => this.muteBtn.setAlpha(1))
            .on('pointerout', () => this.muteBtn.setAlpha(0.8));

        // Unmute
        this.unmuteBtn = this.add.image(centerX - 100, centerY, 'buttons', 52)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1)
            .setVisible(false)
            .on('pointerdown', () => this.toggleMusic())
            .on('pointerover', () => this.unmuteBtn.setAlpha(0.8))
            .on('pointerout', () => this.unmuteBtn.setAlpha(1));

        // Restart
        this.restartBtn = this.add.image(centerX, centerY, 'buttons', 15)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1)
            .setVisible(false)
            .on('pointerdown', () => this.restartGame())
            .on('pointerover', () => this.restartBtn.setAlpha(0.8))
            .on('pointerout', () => this.restartBtn.setAlpha(1));

        // Exit
        this.exitBtn = this.add.image(centerX + 100, centerY, 'buttons', 9)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(1)
            .setVisible(false)
            .on('pointerdown', () => this.exitGame())
            .on('pointerover', () => this.exitBtn.setAlpha(0.8))
            .on('pointerout', () => this.exitBtn.setAlpha(1));

        socket.emit("readyToPlay");
    }

    update() {
        if (this.gameOver || !GlobalData.player) {
            return;
        }

        // this.updateScoreText();

        this.velX = GlobalData.player.body.velocity.x;
        this.velY = GlobalData.player.body.velocity.y;

        if(GlobalData.player.y > 900) GlobalData.player.y = 100;

        this.prevOnGround = this.isOnGround;
        this.isOnGround = GlobalData.player.body.touching.down;

        if (this.keyObjects.right.isDown && !this.isAttacking) {
            GlobalData.player.setVelocityX(160);
            GlobalData.player.setFlipX(false);
            socket.emit("playerVelX", { playerVelX: 160 });
        }
        else if (this.keyObjects.left.isDown && !this.isAttacking) {
            GlobalData.player.setVelocityX(-160);
            GlobalData.player.setFlipX(true);
            socket.emit("playerVelX", { playerVelX: -160 });
            // console.log("moveLeft");
        }
        else if (this.isOnGround && (this.prevVelX !== this.velX)) {
            GlobalData.player.setVelocityX(0);
            this.prevVelX = 0;
            socket.emit("playerVelX", { playerVelX: 0});
            this.SendPos();
        }

        // if (Phaser.Input.Keyboard.JustUp(this.keyObjects.right) || Phaser.Input.Keyboard.JustUp(this.keyObjects.left)) {
        //     socket.emit("playerVelX", { playerVelX: 0});
        // }

        if (this.isOnGround) {
            if ((this.keyObjects.up.isDown && !this.isAttacking)) {
                // socket.emit("playerVelY", { playerVelY: -300 });
                socket.emit("playerAction", { playerAction: "jump" });
                GlobalData.player.setVelocityY(-300);
                // console.log("jump");
                this.isJumping = true;
                GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'jump', true);
                this.SendPos();
                GlobalData.player.on('animationcomplete', (animation, frame) => {
                    this.isJumping = false;
                });
            }
            else if (this.keyObjects.hability_1.isDown && !this.isAttacking) {
                socket.emit("playerAction", { playerAction: "attack" });
                // console.log("attack");
                this.isAttacking = true;
                GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'attack', true);
                this.SendPos();
                GlobalData.player.on('animationcomplete', (animation, frame) => {
                    this.isAttacking = false;
                });
            }
            else if (this.prevOnGround !== this.isOnGround) {
                // socket.emit("playerEvent", { playerEvent: "landing" });
                // console.log("landing");
                this.isLanding = true;
                GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'landing', true);
                this.SendPos();
                GlobalData.player.on('animationcomplete', (animation, frame) => {
                    this.isLanding = false;
                });
            }
        }

        let movingOnAir = this.velY !== 0 && !this.isOnGround

        if (!this.isAttacking && !this.isJumping && !this.isLanding) {
            if (!movingOnAir) {
                if (!this.velX)
                    GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'idle', true);
                else {
                    GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'run', true);
                }
            }
            else {
                if (this.velY < 0)
                    GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'rising', true);
                else
                    GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'falling', true);
            }
        }

        for (let playerId in GlobalData.playersStates) {
            const player = GlobalData.players[playerId];
            const playerStates = GlobalData.playersStates[playerId];
            let velX = player.body.velocity.x;
            let velY = player.body.velocity.y;
            
            playerStates.prevOnGround = playerStates.isOnGround;  
            playerStates.isOnGround = player.body.touching.down;

            if (playerStates.prevOnGround !== playerStates.isOnGround) {
                playerStates.isLanding = true;
                player.anims.play(GlobalData.currChar.charName + '_' + 'landing', true);
                player.on('animationcomplete', (animation, frame) => {
                    playerStates.isLanding = false;
                });
            }

            let movingOnAir = velY !== 0 && !playerStates.isOnGround

            if (!playerStates.isAttacking && !playerStates.isJumping && !playerStates.isLanding) {
                if (!movingOnAir) {
                    if (!velX)
                        player.anims.play(GlobalData.currChar.charName + '_' + 'idle', true);
                    else {
                        player.anims.play(GlobalData.currChar.charName + '_' + 'run', true);
                    }
                }
                else {
                    if (velY < 0)
                        player.anims.play(GlobalData.currChar.charName + '_' + 'rising', true);
                    else
                        player.anims.play(GlobalData.currChar.charName + '_' + 'falling', true);
                }
            }
        }

        // if (!this.gameOver && !this.isPaused) {
        //     this.movePlatform(this.movingPlatform, 500, 200, 300, 1.5);
        // }
    }

    SendPos() {
        socket.emit("playerPosition", { x: GlobalData.player.x, y: GlobalData.player.y });
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
        this.backgroundMusic.stop();

        this.scene.restart();
    }

    exitGame() {
        // Redirige al menu
        // socket.emit("playerLeft");
        // this.scene.start('MainMenu');
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
                if (this.backgroundMusic) this.backgroundMusic.stop();
                this.scene.start('MyScene2', { score: this.score });
            }
        });
        
        if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
            this.backgroundMusic.stop();
        }
    }

    collectCoin(player, coin) {
        coin.disableBody(true, true);
        const points = this.multiplierActive ? 20 : 10;
        this.score += points;
        // this.updateScoreText();

        this.registry.set('score', this.score);
        this.events.emit('updateUI');
    }
    
    collectBonus(player, bonus) {
        bonus.disableBody(true, true);
        this.activateMultiplier();
    }
    
    activateMultiplier() {
        this.multiplierActive = true;
        this.multiplierTime = 20;

        // Actualizar registro global
        this.registry.set('multiplierActive', true);
        this.registry.set('multiplierTime', 20);
        this.events.emit('updateUI');
        
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.multiplierTime--;
                this.registry.set('multiplierTime', this.multiplierTime);
                this.events.emit('updateUI');
                
                if(this.multiplierTime <= 0) {
                    this.multiplierActive = false;
                    this.registry.set('multiplierActive', false);
                    this.events.emit('updateUI');
                }
            },
            callbackScope: this,
            repeat: 19
        });
    }

    // updateScoreText() {
    //     let text = `Player: ${this.score}`;
        
    //     if(this.multiplierActive) {
    //         text += `   X2   ${this.multiplierTime}s`;
    //     }
        
    //     this.scoreText.setText(text);
    // }

    // movePlatform(platform, startX, startY, range, speed) {
    //     if (platform.moveRight) {
    //         platform.x += speed;
    //         if (platform.x >= startX + range) {
    //             platform.moveRight = false;
    //         }
    //     } else {
    //         platform.x -= speed;
    //         if (platform.x <= startX) {
    //             platform.moveRight = true;
    //         }
    //     }
    //     platform.refreshBody();
    // }
}
