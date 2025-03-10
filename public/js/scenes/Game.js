import { GlobalData } from '../main.js';
import { socket } from '../socket.js';
import { characters } from '../characters.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
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

        this.keyObjects = this.input.keyboard.addKeys({
            up: "SPACE",
            down: "S",
            left: "A",
            right: "D",
            hability_1: "ONE",
            hability_2: "TWO",
            hability_3: "THREE",
        }); // keyObjects.up, keyObjects.down, keyObjects.left, keyObjects.right

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.gameOver || !GlobalData.player) {
            return;
        }

        this.velX = GlobalData.player.body.velocity.x;
        this.velY = GlobalData.player.body.velocity.y;

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

            
            // if (playerStates.isJumping) {
            //     player.setVelocityY(-300);
            //     player.anims.play(GlobalData.currChar.charName + '_' + 'jump', true);
            //     player.on('animationcomplete', (animation, frame) => {
            //         playerStates.isJumping = false;
            //     });
            // }
            // else if (playerStates.attack) {
            //     player.anims.play(GlobalData.currChar.charName + '_' + 'attack', true);
            //     playerStates.isAttacking = true;
            //     player.on('animationcomplete', (animation, frame) => {
            //         playerStates.isAttacking = false;
            //     });
            // }
            // else 
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
    }

    SendPos() {
        socket.emit("playerPosition", { x: GlobalData.player.x, y: GlobalData.player.y });
    }


}
