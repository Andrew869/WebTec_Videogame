import { GlobalData } from '../main.js';
import { socket } from '../socket.js';
import { characters } from '../characters.js';
import { SendPos, CreateStartZone, CreatePlatform, CreateWall, CreateDamageZone2,CreatePortal, updateScore } from '../utilities.js';

export default class Game2 extends Phaser.Scene {
    constructor() {
        super({ key: "Game2" });

        this.keyObjects;

        this.namesText;
    }

    preload() {
    }

    create() {
        GlobalData.currGameScene = this;
        GlobalData.currLvl = 2;
        this.namesText = {};
        GlobalData.mapSizeX = 1548 
        GlobalData.mapSizeY = 2304

        switch (GlobalData.charName) {
            case "archer":
                GlobalData.currChar = characters.archer;
                break;
            case "rogue":
                GlobalData.currChar = characters.rogue;
                break;
        }

        this.physics.world.setBounds(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY);

        this.add.tileSprite(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY, 'lvl_2_sky').setOrigin(0, 0).setScrollFactor(0, 1).setScale(3);
        this.add.tileSprite(0, GlobalData.mapSizeY - 768, GlobalData.mapSizeX, GlobalData.mapSizeY,'lvl_2_layer0').setOrigin(0, 0).setScrollFactor(0, 1).setScale(3);
        this.add.tileSprite(0, GlobalData.mapSizeY - 768, GlobalData.mapSizeX, GlobalData.mapSizeY,'lvl_2_layer1').setOrigin(0, 0).setScrollFactor(0, 1).setScale(3);
        this.add.tileSprite(0, GlobalData.mapSizeY - 768, GlobalData.mapSizeX, GlobalData.mapSizeY,'lvl_2_layer2').setOrigin(0, 0).setScrollFactor(0.1, 1).setScale(3);
        this.add.tileSprite(0, GlobalData.mapSizeY - 768, GlobalData.mapSizeX, GlobalData.mapSizeY,'lvl_2_layer3').setOrigin(0, 0).setScrollFactor(0.2, 1).setScale(3);
        this.add.tileSprite(0, GlobalData.mapSizeY - 768, GlobalData.mapSizeX, GlobalData.mapSizeY,'lvl_2_layer4').setOrigin(0, 0).setScrollFactor(0.3, 1).setScale(3);
        this.add.tileSprite(0, GlobalData.mapSizeY - 768, GlobalData.mapSizeX, GlobalData.mapSizeY,'lvl_2_layer5').setOrigin(0, 0).setScrollFactor(0.4, 1).setScale(3);
        this.add.tileSprite(0, GlobalData.mapSizeY - 768, GlobalData.mapSizeX, GlobalData.mapSizeY,'lvl_2_layer6').setOrigin(0, 0).setScrollFactor(0.5, 1).setScale(3);
        this.add.tileSprite(0, GlobalData.mapSizeY - 768, GlobalData.mapSizeX, GlobalData.mapSizeY,'lvl_2_layer7').setOrigin(0, 0).setScrollFactor(0.6, 1).setScale(3);
        this.add.tileSprite(0, GlobalData.mapSizeY - 768, GlobalData.mapSizeX, GlobalData.mapSizeY,'lvl_2_layer8').setOrigin(0, 0).setScrollFactor(0.7, 1).setScale(3);
        this.add.tileSprite(0, GlobalData.mapSizeY - 768, GlobalData.mapSizeX, GlobalData.mapSizeY,'lvl_2_layer9').setOrigin(0, 0).setScrollFactor(0.8, 1).setScale(3);
        this.add.tileSprite(0, GlobalData.mapSizeY - 768, GlobalData.mapSizeX, GlobalData.mapSizeY,'lvl_2_layer10').setOrigin(0, 0).setScrollFactor(0.9, 1).setScale(3);
        this.add.tileSprite(0, GlobalData.mapSizeY - 768, GlobalData.mapSizeX, GlobalData.mapSizeY,'lvl_2_layer11').setOrigin(0, 0).setScrollFactor(1, 1).setScale(3);

        GlobalData.ground = this.physics.add.staticBody(0, GlobalData.mapSizeY - 60, GlobalData.mapSizeX, 10);
        
        CreateStartZone(this, 410, 0, 3, 20);
        // CreateWall(this, 410, 0, 20 * 16);

        CreateDamageZone2(this, 510, 0, 64, 20);
        //CreateDamageZone(this, 600, 0, 200, 50);  
        CreateDamageZone2(this, 1000, 0, 150, 20); 
        CreateDamageZone2(this, 1600, 0, 300, 20);
        CreateDamageZone2(this, 2200, 0, 100, 20);

        CreatePlatform(this, 600, 60, 100);
        CreatePlatform(this, 480, 250, 100);

        CreatePlatform(this, 500, 800, 150);
        CreateWall(this, 620, 850, 80);
        CreateWall(this, 620, 950, 80);
        CreatePlatform(this, 720, 820, 100);
        //CreatePlatform(this, 200, 950, 100);

        CreatePlatform(this, 500, 100, 120);
        //CreatePlatform(this, 300, 1150, 120);
        //CreatePlatform(this, 500, 1250, 120);

        CreatePlatform(this, 650, 1600, 200);

        CreatePlatform(this, 600, 200, 150);
        //CreatePlatform(this, 500, 350, 100);
        //CreatePlatform(this, 200, 500, 120);

        //CreatePlatform(this, 800, 1600, 150);
        //CreateWall(this, 950, 1550, 80);
        CreatePlatform(this, 610, 1550, 50);
        CreateWall(this,650, 1550, 80);
        CreateWall(this, 500, 1400, 80);
        CreatePlatform(this, 500, 1400, 50);
        CreatePlatform(this, 400, 1350, 200); 
        CreatePlatform(this, 650, 1300, 200);
        CreatePlatform(this, 300, 1250, 200);
        CreatePlatform(this, 500, 1200, 200);
        CreatePlatform(this, 400, 1100, 200);
        CreatePlatform(this, 700, 1000, 200);
        CreatePlatform(this, 900, 900, 200);
        CreatePlatform(this, 700, 700, 200);
        CreatePlatform(this, 500, 600, 200);
        CreatePlatform(this, 300, 500, 200);
        CreatePlatform(this, 500, 400, 200);

        CreatePortal(this, "", 80, 250, 8, true);
        CreatePortal(this, "FinalScene", GlobalData.mapSizeX/2, 1750, 8, false);
        //CreatePortal(this, "FinalScene", 500, 300, false);

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
        GlobalData.backgroundMusic = this.sound.add('bg_m_lvl_2', { loop: true });
        GlobalData.backgroundMusic.play();

        socket.connect();
        // console.log(GlobalData.charName);
        socket.emit("LevelReady", {lvl: 2, groundY: GlobalData.ground.y, playerName: GlobalData.playerName,charName: GlobalData.charName});
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

        Object.keys(this.namesText).forEach(playerId => {
            this.namesText[playerId].setPosition(GlobalData.players[playerId].x, GlobalData.players[playerId].y - 40);
        });
    }
}
