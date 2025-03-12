import { GlobalData } from '../main.js';
import { socket } from '../socket.js';
import { characters } from '../characters.js';
import { SendPos } from '../utilities.js';

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

        // GlobalData.currChar = characters.rogue;
    }

    preload() {
    }

    create() {
        GlobalData.currScene = this;

        switch (GlobalData.charName) {
            case "archer":
                GlobalData.currChar = characters.archer;
                break;
            case "rogue":
                GlobalData.currChar = characters.rogue;
                break;
        }

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

        socket.connect();
        socket.emit("readyToPlay", {charName: GlobalData.charName});
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
            SendPos();
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
                SendPos();
                GlobalData.player.on('animationcomplete', (animation, frame) => {
                    this.isJumping = false;
                });
            }
            else if (this.keyObjects.hability_1.isDown && !this.isAttacking) {
                socket.emit("playerAction", { playerAction: "attack" });
                // console.log("attack");
                this.isAttacking = true;
                GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'attack', true);
                SendPos();
                GlobalData.player.on('animationcomplete', (animation, frame) => {
                    this.isAttacking = false;
                });
            }
            else if (this.prevOnGround !== this.isOnGround) {
                // socket.emit("playerEvent", { playerEvent: "landing" });
                // console.log("landing");
                this.isLanding = true;
                GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'landing', true);
                SendPos();
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
                player.anims.play(player.texture.key + '_' + 'landing', true);
                player.on('animationcomplete', (animation, frame) => {
                    playerStates.isLanding = false;
                });
            }

            let movingOnAir = velY !== 0 && !playerStates.isOnGround

            if (!playerStates.isAttacking && !playerStates.isJumping && !playerStates.isLanding) {
                if (!movingOnAir) {
                    if (!velX)
                        player.anims.play(player.texture.key + '_' + 'idle', true);
                    else {
                        player.anims.play(player.texture.key + '_' + 'run', true);
                    }
                }
                else {
                    if (velY < 0)
                        player.anims.play(player.texture.key + '_' + 'rising', true);
                    else
                        player.anims.play(player.texture.key + '_' + 'falling', true);
                }
            }
        }

        // if (!this.gameOver && !this.isPaused) {
        //     this.movePlatform(this.movingPlatform, 500, 200, 300, 1.5);
        // }
    }
}
