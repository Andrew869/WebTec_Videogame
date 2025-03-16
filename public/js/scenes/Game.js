import { GlobalData } from '../main.js';
import { socket } from '../socket.js';
import { characters } from '../characters.js';
<<<<<<< HEAD
import { SendPos, translateY, CreatePlatform, CreateWall, movePlatform, generateLevel, collectCoin, collectPotion } from '../utilities.js';
=======
import { SendPos, CreateStartZone, CreatePlatform, CreateWall, CreatePortal } from '../utilities.js';
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
<<<<<<< HEAD
        this.ground;
        this.platforms;
        this.score = 0;
        this.scoreText;
        this.scoreMultiplier = 1;
        this.multiplierActive = false;
        this.gameOver = false;

        this.keyObjects;

        // this.GlobalData.playerData.isAttacking = false;
        // this.GlobalData.playerData.isLanding = false;
        // this.GlobalData.playerData.isJumping = false;

        // this.GlobalData.playerData.isOnGround = false;
        // this.GlobalData.playerData.prevOnGround = true;

        this.diffHeight = 720 - GlobalData.mapSizeY
        this.gameOver = false;
=======

        this.keyObjects;
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    }

    preload() {
    }

    create() {
<<<<<<< HEAD
        GlobalData.currScene = this;
=======
        GlobalData.currGameScene = this;
        GlobalData.currLvl = 1;

        GlobalData.mapSizeX = 1280 * 2;
        GlobalData.mapSizeY = 793;
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb

        switch (GlobalData.charName) {
            case "archer":
                GlobalData.currChar = characters.archer;
                break;
            case "rogue":
                GlobalData.currChar = characters.rogue;
                break;
        }

        this.physics.world.setBounds(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY);

<<<<<<< HEAD
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

        generateLevel(this);

        this.score = 0;
        this.scoreMultiplier = 1;
        this.multiplierActive = false;

        this.coins = this.physics.add.staticGroup();
        for (let i = 0; i < 10; i++) {
            const coinX = Phaser.Math.Between(100, GlobalData.mapSizeX - 100);
            const coinY = Phaser.Math.Between(100, GlobalData.mapSizeY - 100);
            const coin = this.coins.create(coinX, coinY, 'items');
            coin.setFrame(50);
        }

        const trigger = {object: this.coins, callback: collectCoin};

        GlobalData.triggers.push(trigger);

        this.potions = this.physics.add.staticGroup();
        for (let i = 0; i < 3; i++) {
            const potionX = Phaser.Math.Between(100, GlobalData.mapSizeX - 100);
            const potionY = Phaser.Math.Between(100, GlobalData.mapSizeY - 100);
            const potion = this.potions.create(potionX, potionY, 'items');
            potion.setFrame(22);
        }

        const trigger2 = {object: this.coins, callback: collectCoin};

        GlobalData.triggers.push(trigger2);

        // socket.on("spawnPlayer", (data) => {
        //     GlobalData.player = this.physics.add.sprite(data.x, data.y, 'rogue');
        //     this.physics.add.overlap(GlobalData.player, this.coins, this.collectCoin, null, this);
        //     this.physics.add.overlap(GlobalData.player, this.potions, this.collectPotion, null, this);
        // });
        
        
        /*CreatePlatform(this, 60, 60, 300);
        CreatePlatform(this, 480, 80, 100);

        CreateWall(this, 410, 0, 150);*/

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
=======
        this.add.tileSprite(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer0').setOrigin(0, 0).setScrollFactor(0, 1);
        this.add.tileSprite(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer1').setOrigin(0, 0).setScrollFactor(0, 1);
        this.add.tileSprite(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer2').setOrigin(0, 0).setScrollFactor(0.1, 1);
        this.add.tileSprite(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer3').setOrigin(0, 0).setScrollFactor(0.2, 1);
        this.add.tileSprite(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer4').setOrigin(0, 0).setScrollFactor(0.3, 1);
        this.add.tileSprite(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer5').setOrigin(0, 0).setScrollFactor(0.4, 1);
        this.add.tileSprite(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer6').setOrigin(0, 0).setScrollFactor(0.5, 1);
        this.add.tileSprite(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer7').setOrigin(0, 0).setScrollFactor(0.6, 1);
        this.add.tileSprite(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer8').setOrigin(0, 0).setScrollFactor(0.7, 1);
        this.add.tileSprite(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer9').setOrigin(0, 0).setScrollFactor(0.8, 1);
        this.add.tileSprite(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_1_layer10').setOrigin(0, 0).setScrollFactor(1, 1);
        this.add.tileSprite(-120, 0, GlobalData.mapSizeX * 1.2, GlobalData.mapSizeY, 'lvl_1_layer11').setOrigin(0, 0).setScrollFactor(1.2, 1).setDepth(3);

        GlobalData.ground = this.physics.add.staticBody(0, GlobalData.mapSizeY - 58, GlobalData.mapSizeX, 10);

        CreateStartZone(this, 410, 0, 3, 20);
        // CreateWall(this, 410, 0, 20 * 16);

        CreatePlatform(this, 60, 64, 300);
        CreatePlatform(this, 480, 80, 100);
    
    
        CreatePortal(this, "", 80, 250, 8, true);
        CreatePortal(this, "Game2", 500, 200, 8, false);
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb

        this.keyObjects = this.input.keyboard.addKeys({
            up: "SPACE",
            down: "S",
            left: "A",
            right: "D",
            hability_1: "ONE",
            hability_2: "TWO",
<<<<<<< HEAD
            hability_3: "THREE",
=======
            hability_3: "THREE"
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
        }); // keyObjects.up, keyObjects.down, keyObjects.left, keyObjects.right

        // Música
        GlobalData.backgroundMusic = this.sound.add('bg_m_lvl_1', { loop: true });
        GlobalData.backgroundMusic.play();

        socket.connect();
<<<<<<< HEAD
        socket.emit("readyToPlay", {charName: GlobalData.charName});
    }

    

    update() {
        if (this.gameOver || !GlobalData.player) {
            return;
        }

        if (this.movingPlatforms && this.movingPlatforms.length) {
            this.movingPlatforms.forEach((platform) => {
              movePlatform(platform);
            });
          }
=======
        socket.emit("LevelReady", {lvl: 1, groundY: GlobalData.ground.y, charName: GlobalData.charName});
    }

    update() {
        if (!GlobalData.player) {
            return;
        }

        if (GlobalData.playerReady && !this.physics.world.overlap(GlobalData.player, GlobalData.start_line) && !GlobalData.levelStarted) {
            GlobalData.playerReady = false;
            socket.emit("playerReady", {isReady : false});
        }
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb

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

<<<<<<< HEAD
        // if (Phaser.Input.Keyboard.JustUp(this.keyObjects.right) || Phaser.Input.Keyboard.JustUp(this.keyObjects.left)) {
        //     socket.emit("playerVelX", { playerVelX: 0});
        // }

=======
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
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
<<<<<<< HEAD

        // if (!this.gameOver && !this.isPaused) {
        //     this.movePlatform(this.movingPlatform, 500, 200, 300, 1.5);
        // }
=======
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    }
}
