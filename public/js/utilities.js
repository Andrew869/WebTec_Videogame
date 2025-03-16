import { game, GlobalData } from './main.js';
import { socket } from './socket.js';

<<<<<<< HEAD
=======
export function getDefaultGlobalData() {
    return {
        currGameScene: null,
        currLvl: 0,
        currUIScene: null,
        start_line : null,
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
        timeElapsed: 0
    };
}

export function resetGlobalData() {
    Object.assign(GlobalData, getDefaultGlobalData());
}

>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
export function createButton(scene, x, y, text, callback) {
    let button = scene.add.text(x, y, text, {
        fontFamily: 'Alagard', fontSize: 38, color: '#000',
        stroke: '#6F4E37', strokeThickness: 8,
        align: 'center'
    }).setOrigin(0.5)
<<<<<<< HEAD
      .setDepth(1)
      .setInteractive()
      .on('pointerdown', callback)
      .on('pointerover', () => button.setStyle({ color: '#fff' }))
      .on('pointerout', () => button.setStyle({ color: '#000' }));
=======
        .setDepth(1)
        .setInteractive()
        .on('pointerdown', callback)
        .on('pointerover', () => button.setStyle({ color: '#fff' }))
        .on('pointerout', () => button.setStyle({ color: '#000' }));
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
}

export function SendPos() {
    socket.emit("playerPosition", { x: GlobalData.player.x, y: GlobalData.player.y });
}

//botones pause continue
export function pauseGame(scene) {
    // if (this.gameOver) return;
<<<<<<< HEAD
    
    scene.isPaused = true;
    game.scene.scenes[1].physics.pause();
    scene.anims.pauseAll();
    
=======

    scene.isPaused = true;
    // GlobalData.currGameScene.physics.pause();
    // scene.anims.pauseAll();

>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    scene.muteBtn.setVisible(!scene.isMusicMuted);
    scene.unmuteBtn.setVisible(scene.isMusicMuted);
    // scene.restartBtn.setVisible(true);
    scene.exitBtn.setVisible(true);
}

export function continueGame(scene) {
    scene.isPaused = false;
<<<<<<< HEAD
    game.scene.scenes[1].physics.resume();
    scene.anims.resumeAll();
    
=======
    // GlobalData.currGameScene.physics.resume();
    // scene.anims.resumeAll();

>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
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

export function exitGame(scene) {
    // Redirige al menu
<<<<<<< HEAD
    GlobalData.backgroundMusic.stop();
    scene.scene.start('MainMenu');
=======
    // stoping scenes
    GlobalData.backgroundMusic.stop();
    scene.isPaused = false;
    // GlobalData.currGameScene.physics.resume();
    // scene.anims.resumeAll();

    scene.scene.stop(GlobalData.currGameScene);
    // reseting global vars
    resetGlobalData();
    // changing to main scene
    scene.scene.start('MainMenu');
    // disconnecting from server
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    socket.disconnect();
}

export function createFloatingPlatform(x, y) {
    const platform = this.platforms.create(x, y, 'platform');
    platform.setScale(0.35);
    platform.refreshBody();
<<<<<<< HEAD
    
=======

>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    platform.body.setSize(platform.width * 0.7 * 0.9, platform.height * 0.7 * 0.3);
    platform.body.setOffset(platform.width * 0.05, platform.height * 0.7);
}

// export function completeLevel() {
//     if (this.isLevelCompleted) return;
<<<<<<< HEAD
    
//     this.isLevelCompleted = true;
//     this.physics.pause();
    
=======

//     this.isLevelCompleted = true;
//     this.physics.pause();

>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
//     this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
//         if (progress === 1) {
//             if (this.backgroundMusic) this.backgroundMusic.stop();
//             this.scene.start('MyScene2', { score: this.score });
//         }
//     });
<<<<<<< HEAD
    
=======

>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
//     if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
//         this.backgroundMusic.stop();
//     }
// }

<<<<<<< HEAD
export function translateY(y){
=======
export function translateY(y) {
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
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
<<<<<<< HEAD
    
=======

>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
//     this.time.addEvent({
//         delay: 1000,
//         callback: () => {
//             this.multiplierTime--;
//             this.registry.set('multiplierTime', this.multiplierTime);
//             this.events.emit('updateUI');
<<<<<<< HEAD
            
=======

>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
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
<<<<<<< HEAD
    
    if(this.multiplierActive) {
        text += `   X2   ${this.multiplierTime}s`;
    }
    
=======

    if (this.multiplierActive) {
        text += `   X2   ${this.multiplierTime}s`;
    }

>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
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

<<<<<<< HEAD
export function CreatePlatform(scene, x, y, width){
=======
export function CreatePlatform(scene, x, y, width) {
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    scene.add.tileSprite(x, translateY(y), width, 17, 'platform').setOrigin(0, 0);
    const collider = scene.physics.add.staticBody(x, translateY(y) + 3, width, 12);
    GlobalData.colliders.push(collider);
}

<<<<<<< HEAD
export function CreateWall(scene, x, y, height){
    scene.add.tileSprite(x, translateY(y), 16, height, 'wall').setOrigin(0, 1);
    const collider = scene.physics.add.staticBody(x, translateY(y) - height , 16, height);
    GlobalData.colliders.push(collider);
}

export function generateLevel(scene) {
    const levelWidth = GlobalData.mapSizeX;
    let xPosition = 60;

    const MIN_PLATFORM_WIDTH = 100;
    const MAX_PLATFORM_WIDTH = 220;
    const MIN_GAP = 30;
    const MAX_GAP = 80;
    const MIN_Y = 80;
    const MAX_Y = 280;
    const MAX_VERTICAL_STEP = 60; 
    const MAX_WALL_HEIGHT = 120; 

    let previousY = Phaser.Math.Between(MIN_Y, MAX_Y);
    let needsStairCase = false;

    while (xPosition < levelWidth - MAX_PLATFORM_WIDTH) {
        let platformWidth = Phaser.Math.Between(MIN_PLATFORM_WIDTH, MAX_PLATFORM_WIDTH);
        let yPosition = previousY;
        let forcedHeight = false;

        if (needsStairCase) {
            yPosition = Phaser.Math.Clamp(previousY - MAX_VERTICAL_STEP, MIN_Y, MAX_Y);
            platformWidth = Phaser.Math.Between(MIN_PLATFORM_WIDTH, 150);
            forcedHeight = true;
            needsStairCase = false;
        } else {
            const yVariation = Phaser.Math.Between(-MAX_VERTICAL_STEP, MAX_VERTICAL_STEP);
            yPosition = Phaser.Math.Clamp(previousY + yVariation, MIN_Y, MAX_Y);
        }

        CreatePlatform(scene, xPosition, yPosition, platformWidth);

        if (Phaser.Math.Between(0, 100) <= 70 && !forcedHeight) {
            let wallHeight = Phaser.Math.Between(80, 150);
            
            if (wallHeight > MAX_WALL_HEIGHT) {
                CreatePlatform(scene, xPosition - 20, yPosition - wallHeight - 20, 60);
                wallHeight = MAX_WALL_HEIGHT;
                needsStairCase = true;
            }
            
            CreateWall(scene, xPosition - 15, 0, wallHeight);
        }

        if (Phaser.Math.Between(1, 100) <= 50) {
            const supportHeight = (scene.scale.height - 58) - translateY(yPosition);
            if (supportHeight > 0) {
                CreateWall(scene, xPosition + platformWidth * 0.5, 0, supportHeight);
            }
        }

        const verticalDifference = Math.abs(yPosition - previousY);
        const dynamicMaxGap = MAX_GAP - Math.floor(verticalDifference * 1.5);
        const gap = Phaser.Math.Clamp(
            Phaser.Math.Between(MIN_GAP, dynamicMaxGap),
            MIN_GAP,
            dynamicMaxGap
        );

        xPosition += platformWidth + gap;
        previousY = yPosition;

        if (verticalDifference > MAX_VERTICAL_STEP) {
            const midX = xPosition - gap + (gap / 2);
            const midY = (previousY + yPosition) / 2;
            CreatePlatform(scene, midX, midY, 60);
            xPosition += 60; 
        }
    }
}

export function collectCoin(player, coin) {
    console.log("¡Moneda recogida!");
    coin.disableBody(true, true);
    this.sound.play('moneda');
    this.score += (100 * this.scoreMultiplier);
    this.scoreText.setText(`Score: ${this.score}`);
}

export function collectPotion(player, potion) {
    console.log("¡Poción recogida!");
    potion.disableBody(true, true);
    this.sound.play('bonus');
    if (!this.multiplierActive) {
        this.multiplierActive = true;
        this.scoreMultiplier = 2;
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.scoreMultiplier = 1;
                this.multiplierActive = false;
            },
            callbackScope: this
        });
    }
=======
export function CreateWall(scene, x, y, height) {
    const sprite = scene.add.tileSprite(x, translateY(y), 16, height, 'wall').setOrigin(0, 1);
    const collider = scene.physics.add.staticBody(x, translateY(y) - height, 16, height);
    GlobalData.greatWall = {sprite, collider};
    GlobalData.colliders.push(collider);
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
    CreateWall(scene, x, y, height);

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
    console.log(playerId);
    const player = GlobalData.players[playerId];
    if (player) {
        player.destroy();
        delete GlobalData.players[playerId];
        delete GlobalData.playersData[playerId];
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
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
}