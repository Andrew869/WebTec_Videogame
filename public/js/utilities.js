import { game, GlobalData } from './main.js';
import { socket } from './socket.js';

export function getDefaultGlobalData() {
    return {
        currGameScene: null,
        currLvl: 0,
        currUIScene: null,
        start_line : null,
        playerName: "",
        player: null,
        playerData: null,
        players: {},
        playersData: {},
        colliders: [],
        triggers: [],
        gameStarted: false,
        levelStarted: false,
        width: 1280,
        halfWidth: 1280 / 2,
        height: 720,
        halfHeight: 720 / 2,
        mapSizeX: 1280 * 2,
        mapSizeY: 793,
        speed: 160,
        jumpForce: 400,
        greatWall: null,
        timers: {},
        score: 0,
        timeElapsed: 0,
        currHealth: 3
    };
}

export function resetGlobalData() {
    Object.assign(GlobalData, getDefaultGlobalData());
}

export function createButton(scene, x, y, text, callback) {
    let button = scene.add.text(x, y, text, {
        fontFamily: 'Alagard', fontSize: 38, color: '#000',
        stroke: '#6F4E37', strokeThickness: 8,
        align: 'center'
    }).setOrigin(0.5)
        .setDepth(1)
        .setInteractive()
        .on('pointerdown', callback)
        .on('pointerover', () => button.setStyle({ color: '#fff' }))
        .on('pointerout', () => button.setStyle({ color: '#000' }));
}

export function SendPos() {
    socket.emit("playerPosition", { x: GlobalData.player.x, y: GlobalData.player.y });
}

//botones pause continue
export function pauseGame(scene) {
    // if (this.gameOver) return;

    scene.isPaused = true;
    // GlobalData.currGameScene.physics.pause();
    // scene.anims.pauseAll();

    scene.muteBtn.setVisible(!scene.isMusicMuted);
    scene.unmuteBtn.setVisible(scene.isMusicMuted);
    // scene.restartBtn.setVisible(true);
    scene.exitBtn.setVisible(true);
}

export function continueGame(scene) {
    scene.isPaused = false;
    // GlobalData.currGameScene.physics.resume();
    // scene.anims.resumeAll();

    scene.muteBtn.setVisible(false);
    scene.unmuteBtn.setVisible(false);
    // scene.restartBtn.setVisible(false);
    scene.exitBtn.setVisible(false);
}

export function toggleMusic(scene) {
    scene.isMusicMuted = !scene.isMusicMuted;
    localStorage.setItem('isMusicMuted', scene.isMusicMuted);

    if (scene.isMusicMuted) {
        scene.sound.setVolume(0);
        scene.muteBtn.setVisible(false);
        scene.unmuteBtn.setVisible(true);
    } else {
        scene.sound.setVolume(1);
        scene.muteBtn.setVisible(true);
        scene.unmuteBtn.setVisible(false);
    }
}

// export function restartGame() {
//     if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
//         this.backgroundMusic.stop();
//     }

//     this.isPaused = false;
//     this.backgroundMusic.stop();

//     this.scene.restart();
// }

export function exitGame(sceneName) {
    // Redirige al menu
    // stoping scenes
    GlobalData.backgroundMusic.stop();
    GlobalData.currUIScene.isPaused = false;
    // GlobalData.currGameScene.physics.resume();
    // scene.anims.resumeAll();
    
    GlobalData.currUIScene.scene.stop();
    
    // changing scene
    GlobalData.currGameScene.scene.start(sceneName);
    
    // reseting global vars
    resetGlobalData();
    // disconnecting from server
    socket.disconnect();
}

export function createFloatingPlatform(x, y) {
    const platform = this.platforms.create(x, y, 'platform');
    platform.setScale(0.35);
    platform.refreshBody();

    platform.body.setSize(platform.width * 0.7 * 0.9, platform.height * 0.7 * 0.3);
    platform.body.setOffset(platform.width * 0.05, platform.height * 0.7);
}

// export function completeLevel() {
//     if (this.isLevelCompleted) return;

//     this.isLevelCompleted = true;
//     this.physics.pause();

//     this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
//         if (progress === 1) {
//             if (this.backgroundMusic) this.backgroundMusic.stop();
//             this.scene.start('MyScene2', { score: this.score });
//         }
//     });

//     if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
//         this.backgroundMusic.stop();
//     }
// }

export function translateY(y) {
    return GlobalData.ground.y - y;
}

export function collectCoin(player, coin) {
    coin.disableBody(true, true);
    const points = this.multiplierActive ? 20 : 10;
    this.score += points;
    // this.updateScoreText();

    this.registry.set('score', this.score);
    this.events.emit('updateUI');
}

export function collectBonus(player, bonus) {
    bonus.disableBody(true, true);
    this.activateMultiplier();
}

// export function activateMultiplier() {
//     this.multiplierActive = true;
//     this.multiplierTime = 20;

//     // Actualizar registro global
//     this.registry.set('multiplierActive', true);
//     this.registry.set('multiplierTime', 20);
//     this.events.emit('updateUI');

//     this.time.addEvent({
//         delay: 1000,
//         callback: () => {
//             this.multiplierTime--;
//             this.registry.set('multiplierTime', this.multiplierTime);
//             this.events.emit('updateUI');

//             if(this.multiplierTime <= 0) {
//                 this.multiplierActive = false;
//                 this.registry.set('multiplierActive', false);
//                 this.events.emit('updateUI');
//             }
//         },
//         callbackScope: this,
//         repeat: 19
//     });
// }

export function updateScoreText() {
    let text = `Player: ${this.score}`;

    if (this.multiplierActive) {
        text += `   X2   ${this.multiplierTime}s`;
    }

    this.scoreText.setText(text);
}

export function movePlatform(platform, startX, startY, range, speed) {
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

export function CreatePlatform(scene, x, y, width) {
    scene.add.tileSprite(x, translateY(y), width, 17, 'platform').setOrigin(0, 0);
    const collider = scene.physics.add.staticBody(x, translateY(y) + 3, width, 12);
    GlobalData.colliders.push(collider);
}

export function CreateWall(scene, x, y, height, isGate = false) {
    const sprite = scene.add.tileSprite(x, translateY(y), 16, height, 'wall').setOrigin(0, 1);
    const collider = scene.physics.add.staticBody(x, translateY(y) - height, 16, height);
    GlobalData.colliders.push(collider);
    if (isGate) {
        GlobalData.greatWall = {sprite, collider};
    }
}

export function CreateDamageZone(scene, x, y, width, height) {
    const object = scene.physics.add.staticBody(x - width, translateY(y) - height, width, height);
    const trigger = {type: "damage_Zone", object: object, callback: SetDamage}
    GlobalData.triggers.push(trigger);
}

export function generateRandomLevel1(scene, startX, startY, mapSize) {
    const JUMP_HEIGHT = 400; 
    const JUMP_DISTANCE = 500; 
    const PLATFORM_SPACING = 300; 
    const WALL_PROBABILITY = 0.3; 
    
    let currentX = startX;
    let currentY = startY;
    
    while(currentX < mapSize) {
        if(Math.random() < WALL_PROBABILITY && currentX > 500) {
            const wallHeight = Phaser.Math.Between(100, 250);
            CreateWall(scene, currentX, currentY, wallHeight);
            
            if(wallHeight > JUMP_HEIGHT/2) {
                CreatePlatform(scene, currentX - 80, currentY - wallHeight + 50, 60);
                CreatePlatform(scene, currentX + 40, currentY - wallHeight + 100, 60);
            }
            currentX += 150;
        } else {
            const platformWidth = Phaser.Math.Between(80, 200);
            CreatePlatform(scene, currentX, currentY, platformWidth);
            
            const nextX = currentX + platformWidth + Phaser.Math.Between(PLATFORM_SPACING - 100, PLATFORM_SPACING + 100);
            if(nextX - currentX > JUMP_DISTANCE) {
                const intermediateX = currentX + (nextX - currentX)/2;
                CreatePlatform(scene, intermediateX - 50, currentY - 150, 100);
            }
            
            currentX = nextX;
        }
        
        currentY += Phaser.Math.Between(-50, 50);
        currentY = Phaser.Math.Clamp(currentY, startY - 200, startY + 200);
    }
}

export function generateAscendingLevel2(scene, startX, startY, mapSize) {
    const JUMP_HEIGHT = 400;
    const ASCENT_STEP = 250; 
    const PLATFORM_SPACING = 350;
    
    let currentX = startX;
    let currentY = startY;
    let level = 0;
    
    while(level < 8 && currentY > 200) { 
        const platformWidth = Phaser.Math.Between(120, 200);
        CreatePlatform(scene, currentX, currentY, platformWidth);
        
        CreatePlatform(scene, currentX + platformWidth - 100, currentY - ASCENT_STEP + 50, 80);
        CreatePlatform(scene, currentX + platformWidth + 200, currentY - ASCENT_STEP, 120);
        
        currentX += platformWidth + PLATFORM_SPACING;
        currentY -= ASCENT_STEP;
        level++;
        
        if(currentX > mapSize * 0.7) {
            currentX = startX;
            currentY -= ASCENT_STEP * 0.8;
        }
    }
}

export function CreatePortal(scene, targetScene, x, y, size, flipX = false) {
    const portal = scene.physics.add.sprite(x, translateY(y), 'portal')
        .setOrigin(0.5)
        .setSize(3, 28)
        .setOffset(flipX? 12 : 17 , 2)
        .setScale(size)
        // .setDepth(2)
        .setImmovable(true)
        .refreshBody();

    // portal.setOffset(flipX? 12 : 17 , 2);
    portal.setFlip(flipX);
    
    portal.body.allowGravity = false;

    portal.anims.play('portal_anim', true);

    if(targetScene) {
        const trigger = {type: "portal" , object: portal, callback: warpPlayer, targetScene: targetScene}
        GlobalData.triggers.push(trigger);
    }
}

// export function teleportPlayer(coords){
//     console.log(coords);
//     GlobalData.player.setPosition(coords.x, coords.y);
// }

export function warpPlayer(targetScene){
    partialReset();
    // console.log(GlobalData.timeElapsed);
    GlobalData.backgroundMusic.stop();
    GlobalData.currGameScene.scene.start(targetScene);
}

export function CreateStartZone(scene, x, y, tilesX, tilesY) {
    const width = tilesX * 16;
    const height = tilesY * 16;
    
    CreatePlatform(scene, 0, height + 16, x + 16);
    CreateWall(scene, x, y, height, true);

    const race_line =  scene.add.tileSprite(x, translateY(y), width, height, 'race_line').setOrigin(1);
    race_line.alpha = 0.5;
    const object = scene.physics.add.staticBody(x - width, translateY(y) - height, width, height);
    const trigger = {type: "start_line", object: object, callback: SetplayerReady}
    GlobalData.triggers.push(trigger);
}

export function SetplayerReady(){
    if (!GlobalData.playerReady && !GlobalData.levelStarted) {
        console.log(GlobalData.player.name, "is ready!");
        GlobalData.playerReady = true;
        socket.emit("playerReady", {isReady : true});
    }
}

export function SetDamage() {
    GlobalData.currHealth;
}

export function CreateTimer (scene, key ,x, y, time, fontSize) {
    let reminingTime = time - 1;

    const timerText = scene.add.text(x, y, `${reminingTime}`, {fontFamily: 'Alagard', fontSize: `${fontSize}px`, fill: '#fff', stroke: '#000', strokeThickness: 8, align: 'center' });
    const timerEvent = scene.time.addEvent({
        delay: 1000,
        callback: () => {
            reminingTime--;
            timerText.setText(`${reminingTime}`);
            if (reminingTime < 0){
                removeTimer(key);
                removeGreatWall();
            }
        },
        callbackScope: scene,
        repeat: reminingTime
    });

    GlobalData.timers[key] = {timerEvent: timerEvent, timerText: timerText, time: time};
}

export function removeTimer(key){
    const timer = GlobalData.timers[key]
    if (timer){
        timer.timerEvent.remove();
        timer.timerText.destroy();
    }
}

export function removeGreatWall() {
    socket.emit("gamestarted", {started: true});
    console.log("open the gates!");
    GlobalData.greatWall.sprite.destroy();
    GlobalData.greatWall.collider.destroy();
    GlobalData.gameStarted = true;
    GlobalData.levelStarted = true;
}

export function removePlayer(playerId) {
    const player = GlobalData.players[playerId];
    if (player) {
        player.destroy();
        delete GlobalData.players[playerId];
        delete GlobalData.playersData[playerId];
        const nameText = GlobalData.currGameScene.namesText[playerId];
        nameText.destroy();
        delete GlobalData.currGameScene.namesText[playerId];
    }
}

export function partialReset(){
    GlobalData.svtart_line = null;
    GlobalData.player = null;
    GlobalData.playerData = null;
    GlobalData.players = {};
    GlobalData.playersData = {};
    GlobalData.colliders = [];
    GlobalData.triggers = [];
    GlobalData.levelStarted = false;
    // GlobalData.score = 0;
}

export function updateScore(points) {
    GlobalData.score += points;
    GlobalData.currUIScene.scoreText.setText(GlobalData.score.toString().padStart(5, '0'));
}

export function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}