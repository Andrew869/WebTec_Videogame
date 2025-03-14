import { GlobalData } from '../main.js';
import { socket } from '../socket.js';
import { characters } from '../characters.js';
import { SendPos, translateY, CreatePlatform, CreateWall } from '../utilities.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
        this.ground;
        this.platforms;
        this.score = 0;
        this.scoreText;
        this.gameOver = false;

        this.keyObjects;

        // this.GlobalData.playerData.isAttacking = false;
        // this.GlobalData.playerData.isLanding = false;
        // this.GlobalData.playerData.isJumping = false;

        // this.GlobalData.playerData.isOnGround = false;
        // this.GlobalData.playerData.prevOnGround = true;

        this.diffHeight = 720 - GlobalData.mapSizeY
    }

    preload() {
    }

    create() {
        GlobalData.currGameScene = this;

        switch (GlobalData.charName) {
            case "archer":
                GlobalData.currChar = characters.archer;
                break;
            case "rogue":
                GlobalData.currChar = characters.rogue;
                break;
        }

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

        GlobalData.ground = this.physics.add.staticBody(0, this.scale.height - 58, GlobalData.mapSizeX, 10);

        CreatePlatform(this, 60, 60, 300);
        CreatePlatform(this, 480, 80, 100);

        CreateWall(this, 410, 0, 150);

        // this.initialPortal = this.physics.add.sprite(300, translateY(0), 'portal')
        // .setOrigin(0.5, 1)
        // .setSize(3, 15)
        // .setOffset(18, 10)
        // .setScale(4)
        // .setDepth(2)
        // .refreshBody();

        // this.finalPortal = this.physics.add.sprite(GlobalData.mapSizeX - 300, translateY(40), 'portal')
        //     .setOrigin(0.5, 1)
        //     .setScale(4)
        //     .setDepth(2)
        //     .refreshBody();
        // this.finalPortal.body.setSize(50, 70);
        // this.finalPortal.body.setOffset(20, 30);

        // this.initialPortal.body.allowGravity = false;
        // this.finalPortal.body.allowGravity = false;

        // this.physics.add.collider(this.initialPortal, this.ground);
        // this.physics.add.collider(this.finalPortal, this.ground);

        // this.anims.create({
        //     key: 'portal_anim',
        //     frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // this.initialPortal.anims.play('portal_anim', true);
        // this.finalPortal.anims.play('portal_anim', true);

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
        GlobalData.backgroundMusic = this.sound.add('bg_m_lvl_1', { loop: true });
        GlobalData.backgroundMusic.play();

        socket.connect();
        socket.emit("readyToPlay", {charName: GlobalData.charName});
    }

    update() {
        if (!GlobalData.player) {
            return;
        }

        const playerData = GlobalData.playerData;
        const vel = GlobalData.player.body.velocity;

        playerData.prevOnGround = playerData.isOnGround;
        playerData.isOnGround = GlobalData.player.body.touching.down;

        if (this.keyObjects.right.isDown && !playerData.isAttacking) {
            GlobalData.player.setVelocityX(playerData.currentSpeed);
            GlobalData.player.setFlipX(false);
            socket.emit("playerVelX", { playerVelX: playerData.currentSpeed });
        }
        else if (this.keyObjects.left.isDown && !playerData.isAttacking) {
            GlobalData.player.setVelocityX(-playerData.currentSpeed);
            GlobalData.player.setFlipX(true);
            socket.emit("playerVelX", { playerVelX: -playerData.currentSpeed });
            // console.log("moveLeft");
        }
        else if (playerData.isOnGround && (vel.x !== 0)) {
            GlobalData.player.setVelocityX(0);
            socket.emit("playerVelX", { playerVelX: 0});
            SendPos();
        }

        // if (Phaser.Input.Keyboard.JustUp(this.keyObjects.right) || Phaser.Input.Keyboard.JustUp(this.keyObjects.left)) {
        //     socket.emit("playerVelX", { playerVelX: 0});
        // }

        if (playerData.isOnGround) {
            if ((this.keyObjects.up.isDown && !playerData.isAttacking)) {
                // socket.emit("playerVelY", { playerVelY: -300 });
                socket.emit("playerAction", { playerAction: "jump" });
                GlobalData.player.setVelocityY(-playerData.currentJumpForce);
                // console.log("jump");
                playerData.isJumping = true;
                GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'jump', true);
                SendPos();
                GlobalData.player.on('animationcomplete', (animation, frame) => {
                    playerData.isJumping = false;
                });
            }
            else if (this.keyObjects.hability_1.isDown && !playerData.isAttacking) {
                socket.emit("playerAction", { playerAction: "attack" });
                // console.log("attack");
                playerData.isAttacking = true;
                GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'attack', true);
                SendPos();
                GlobalData.player.on('animationcomplete', (animation, frame) => {
                    playerData.isAttacking = false;
                });
            }
            else if (playerData.prevOnGround !== playerData.isOnGround) {
                // socket.emit("playerEvent", { playerEvent: "landing" });
                // console.log("landing");
                playerData.isLanding = true;
                GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'landing', true);
                SendPos();
                GlobalData.player.on('animationcomplete', (animation, frame) => {
                    playerData.isLanding = false;
                });
            }
        }

        let movingOnAir = vel.y !== 0 && !playerData.isOnGround

        if (!playerData.isAttacking && !playerData.isJumping && !playerData.isLanding) {
            if (!movingOnAir) {
                if (!vel.x)
                    GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'idle', true);
                else {
                    GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'run', true);
                }
            }
            else {
                if (vel.y < 0)
                    GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'rising', true);
                else
                    GlobalData.player.anims.play(GlobalData.currChar.charName + '_' + 'falling', true);
            }
        }

        for (let playerId in GlobalData.playersData) {
            const player = GlobalData.players[playerId];
            const playerData = GlobalData.playersData[playerId];
            let velX = player.body.velocity.x;
            let velY = player.body.velocity.y;
            
            playerData.prevOnGround = playerData.isOnGround;  
            playerData.isOnGround = player.body.touching.down;

            if (playerData.prevOnGround !== playerData.isOnGround) {
                playerData.isLanding = true;
                player.anims.play(player.texture.key + '_' + 'landing', true);
                player.on('animationcomplete', (animation, frame) => {
                    playerData.isLanding = false;
                });
            }

            let movingOnAir = velY !== 0 && !playerData.isOnGround;

            if (!playerData.isAttacking && !playerData.isJumping && !playerData.isLanding) {
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
