import { GlobalData } from '../main.js';
import { socket } from '../socket.js';
import { characters } from '../characters.js';
import { SendPos, CreateStartZone, CreatePlatform, CreateWall, CreateDamageZoneSpikes1,CreateDamageZone1, CreatePortal, updateScore } from '../utilities.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });

        this.keyObjects;

        this.namesText;
        this.coins;
    }

    preload() {
    }

    create() {
        GlobalData.currGameScene = this;
        GlobalData.currLvl = 1;
        this.namesText = {};

        GlobalData.mapSizeX = 1280 * 2;
        GlobalData.mapSizeY = 793;

        switch (GlobalData.charName) {
            case "archer":
                GlobalData.currChar = characters.archer;
                break;
            case "rogue":
                GlobalData.currChar = characters.rogue;
                break;
        }

        this.physics.world.setBounds(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY);

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

        CreateStartZone(this, 400, 0, 3, 20);
        CreateDamageZone1(this, 510, 0, 64, 20);
        //CreateDamageZone(this, 600, 0, 200, 20);  
        CreateDamageZone1(this, 1000, 0, 150, 20); 
        CreateDamageZone1(this, 1600, 0, 300, 20);
        CreateDamageZone1(this, 2200, 0, 100, 20);

        CreateDamageZoneSpikes1(this, 700, 100, 100, 16);
        CreateDamageZoneSpikes1(this, 1280, 0, 60, 16);
        CreateDamageZoneSpikes1(this, 1550, 60, 50, 16);
        CreateDamageZoneSpikes1(this, 2000, 0, 100, 20);

        // CreateWall(this, 410, 0, 20 * 16);

        //CreatePlatform(this, 60, 64, 300);
        //CreatePlatform(this, 480, 80, 100);
    
        CreatePlatform(this, 500, 100, 200);
        CreatePlatform(this, 800, 80, 150);
        CreatePlatform(this, 1000, 120, 100);

        CreateWall(this, 1300, 0, 100);
        CreatePlatform(this, 1450, 60, 200);
        CreatePlatform(this, 1630, 120, 100);
        CreatePlatform(this, 1800, 200, 100);
        CreatePlatform(this, 2000, 150, 100);
        CreatePlatform(this, 2200, 100, 100);

        CreatePlatform(this, 2600, 150, 150);
        CreateWall(this, 2800, 100, 120);
        CreatePlatform(this, 3000, 200, 200);

        CreateWall(this, 2400, -50, 200);     
    
        CreatePortal(this, "", 80, 250, 8, true);
        CreatePortal(this, "Game2", 2450, 80, 8, false);

        /*this.add.tileSprite(0, GlobalData.mapSizeY - 2, 'lava')
            .setOrigin(0, 1)createCoins
            .setDepth(2);

        this.add.tileSprite(1000, GlobalData.mapSizeY - 2, 300, 16, 'lava')
        .setOrigin(0, 1)
        .setDepth(2);*/

        /*this.add.tileSprite(500, translateY(100), 200, 16, 'spike')
        .setOrigin(0, 1)
        .setDepth(2);

        this.add.tileSprite(800, translateY(80), 150, 16, 'spike')
        .setOrigin(0, 1)
        .setDepth(2);

        this.add.tileSprite(1000, translateY(120), 100, 16, 'spike')
        .setOrigin(0, 1)
        .setDepth(2);*/

        this.keyObjects = this.input.keyboard.addKeys({
            up: "SPACE",
            down: "S",
            left: "A",
            right: "D",
            hability_1: "ONE",
            hability_2: "TWO",
            hability_3: "THREE",
            damage: "K" //K es para hacerse daño y poder probar la vida
        }); // keyObjects.up, keyObjects.down, keyObjects.left, keyObjects.right

        // Música
        GlobalData.backgroundMusic = this.sound.add('bg_m_lvl_1', { loop: true });
        GlobalData.backgroundMusic.play();

        socket.connect();
        socket.emit("LevelReady", {lvl: 1, groundY: GlobalData.ground.y, playerName: GlobalData.playerName, charName: GlobalData.charName});
    }

    update() {
        if (!GlobalData.player) {
            return;
        }

        if (GlobalData.playerReady && !this.physics.world.overlap(GlobalData.player, GlobalData.start_line) && !GlobalData.levelStarted) {
            GlobalData.playerReady = false;
            socket.emit("playerReady", {isReady : false});
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

        Object.keys(this.namesText).forEach(playerId => {
            this.namesText[playerId].setPosition(GlobalData.players[playerId].x, GlobalData.players[playerId].y - 40);
        });
    }
}
