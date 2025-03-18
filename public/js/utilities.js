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
        playerReady: false,
        playerData: null,
        players: {},
        playersData: {},
        colliders: [],
        triggers: [],
        gameStarted: false,
        levelStarted: false,
        gameOver: false,
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
        multiplier: 1,
        timeElapsed: 0,
        maxHealth: 6,
        damageCooldown: 500,
        lastDamageTime: 0,
        rng: null,
        seed: "",
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

// botones pause continue
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

export function exitGame(sceneName) {
    // GlobalData.currGameScene.physics.resume();
    // scene.anims.resumeAll();
    
    GlobalData.backgroundMusic.stop();
    // stoping scenes
    if(GlobalData.currUIScene){
        GlobalData.currUIScene.scene.stop();
        GlobalData.currUIScene.isPaused = false;
    }
    
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

export function translateY(y) {
    return GlobalData.ground.y - y;
}

export function collectCoin(player, coin) {
    coin.disableBody(true, true);
    const points = this.multiplierActive ? 20 : 10;
    this.score += points;
    this.registry.set('score', this.score);
    this.events.emit('updateUI');
}

export function collectBonus(player, bonus) {
    bonus.disableBody(true, true);
    this.activateMultiplier();
}

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
    const trigger = {type: "damage_Zone", object: object, callback: SetPlayerDamage}
    GlobalData.triggers.push(trigger);
}

export function CreatePortal(scene, targetScene, x, y, size, flipX = false) {
    const portal = scene.physics.add.sprite(x, translateY(y), 'portal')
        .setOrigin(0.5)
        .setSize(3, 28)
        .setOffset(flipX ? 12 : 17, 2)
        .setScale(size)
        .setImmovable(true)
        .refreshBody();

    portal.setFlip(flipX);
    portal.body.allowGravity = false;
    portal.anims.play('portal_anim', true);

    if (targetScene) {
        const trigger = { type: "portal", object: portal, callback: warpPlayer, targetScene: targetScene };
        GlobalData.triggers.push(trigger);
    }
}

export function warpPlayer(targetScene) {
    if(targetScene === "FinalScene" || targetScene === "GameOver") socket.disconnect();
    partialReset();
    GlobalData.backgroundMusic.stop();
    GlobalData.currGameScene.scene.start(targetScene);
}

export function CreateStartZone(scene, x, y, tilesX, tilesY) {
    const width = tilesX * 16;
    const height = tilesY * 16;
    
    CreatePlatform(scene, 0, height + 16, x + 16);
    CreateWall(scene, x, y, height, true);

    const race_line =  scene.add.tileSprite(x, translateY(y), width, height, 'race_line').setOrigin(1);
    race_line.alpha = 0.3;
    const object = scene.physics.add.staticBody(x - width, translateY(y) - height, width, height);
    const trigger = {type: "start_line", object: object, callback: SetplayerReady}
    GlobalData.triggers.push(trigger);
}

export function SetplayerReady(){
    if (!GlobalData.playerReady && !GlobalData.levelStarted) {
        console.log(GlobalData.player.name, "is ready!");
        GlobalData.playerReady = true;
        socket.emit("playerReady", { isReady: true });
    }
}

export function SetPlayerDamage(amount) {
    let now = GlobalData.currGameScene.time.now;

    if (now - GlobalData.lastDamageTime > GlobalData.damageCooldown) {
        GlobalData.playerData.currentHelth-=amount;
        GlobalData.lastDamageTime = now;
        updatehearts();
        GlobalData.currGameScene.sound.play('damage');

        GlobalData.currGameScene.tweens.add({
            targets: GlobalData.player,
            alpha: 0.5,
            yoyo: true,
            repeat: 5,
            duration: 100
        });
        if(GlobalData.playerData.currentHelth <= 0) {
            GlobalData.gameOver = true;
            console.log("Game over!");
            warpPlayer("GameOver");
        }
    }
}

export function CreateTimer (scene, key ,x, y, time, fontSize) {
    let reminingTime = time - 1;

    const timerText = scene.add.text(x, y, `${reminingTime}`, { fontFamily: 'Alagard', fontSize: `${fontSize}px`, fill: '#fff', stroke: '#000', strokeThickness: 8, align: 'center' }).setOrigin(0.5);
    const timerEvent = scene.time.addEvent({
        delay: 1000,
        callback: () => {
            reminingTime--;
            timerText.setText(`${reminingTime}`);
            if (reminingTime < 0) {
                removeTimer(key);
                removeGreatWall();
                GlobalData.currUIScene.readyPlayersText.setText("");
            }
        },
        callbackScope: scene,
        repeat: reminingTime
    });

    GlobalData.timers[key] = { timerEvent: timerEvent, timerText: timerText, time: time };
}

export function removeTimer(key) {
    const timer = GlobalData.timers[key];
    if (timer) {
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

    GlobalData.currGameScene.time.addEvent({ // event to spawn a bonus item
        delay: GlobalData.rng.between(5000, 15000),
        callback: () => {
            if (!GlobalData.gameOver) {
                const angle = -(GlobalData.rng.between(0, 180) * Math.PI / 180);
                createMultiplier(GlobalData.currGameScene, 5, 10000, GlobalData.player.x + 100 * Math.cos(angle), GlobalData.player.y + 100 * Math.sin(angle));
            }
        },
        callbackScope: GlobalData.currGameScene,
        loop: false
    });
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

export function partialReset() {
    GlobalData.start_line = null;
    GlobalData.player = null;
    GlobalData.playerData = null;
    GlobalData.players = {};
    GlobalData.playersData = {};
    GlobalData.colliders = [];
    GlobalData.triggers = [];
    GlobalData.levelStarted = false;
}

export function updateScore(points) {
    GlobalData.score += points * GlobalData.multiplier;
    if(GlobalData.score >= 0) GlobalData.currUIScene.scoreText.setText(GlobalData.score.toString().padStart(5, '0'));
    else GlobalData.currUIScene.scoreText.setText(GlobalData.score.toString());
}

export function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}

export function updatehearts() {
    const hearts = GlobalData.currUIScene.hearts;
    let life = GlobalData.playerData.currentHelth;

    hearts.forEach(heart => {
        if (life >= 2) {
            heart.setFrame(45);
            life -= 2;
        } else if (life === 1) {
            heart.setFrame(46);
            life -= 1;
        } else {
            heart.setFrame(47);
        }
    });
}

export function createMultiplier(scene, multiplier, time, x, y) {
    const item = scene.physics.add.image(x, y, 'items', 22).setScale(3);
    GlobalData.currUIScene.item = item;
    scene.physics.add.collider(item, GlobalData.ground);

    GlobalData.colliders.forEach(collider => {
        scene.physics.add.collider(item, collider);
    });

    GlobalData.currUIScene.startTime = GlobalData.timeElapsed;
    
    GlobalData.currUIScene.countdownText = GlobalData.currGameScene.add.text(item.x, item.y, "00", {
        fontFamily: 'Alagard', fontSize: '16px', fill: '#DC3545', stroke: '#000', strokeThickness: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: { x: 4, y: 2 }
    }).setOrigin(0.5);

    scene.physics.add.overlap(GlobalData.player, item, (player, object) => {
        GlobalData.currGameScene.sound.play('bonus');
        object.destroy();
        GlobalData.currUIScene.countdownText.destroy();
        GlobalData.currUIScene.startTime = 0
        delete GlobalData.currUIScene.countdownText;

        GlobalData.multiplier = multiplier
        GlobalData.currUIScene.multiplierText.setText(`x${GlobalData.multiplier}`);
        GlobalData.currUIScene.multiplierText.setColor('#28A745');
        GlobalData.currGameScene.time.addEvent({
            delay: time,
            callback: () => {
                GlobalData.multiplier = 1;
                GlobalData.currUIScene.multiplierText.setText(`x${GlobalData.multiplier}`);
                GlobalData.currUIScene.multiplierText.setColor('#fff');
            },
            callbackScope: GlobalData.currGameScene,
            loop: false
        });
    }, 
    null, GlobalData.currGameScene);

    GlobalData.currGameScene.time.addEvent({ // event to despawn the item
        delay: 3000,
        callback: () => {
            item.destroy();
            if (GlobalData.currUIScene.countdownText){
                GlobalData.currUIScene.countdownText.destroy();
                GlobalData.currUIScene.startTime = 0
                delete GlobalData.currUIScene.countdownText;
            }
        },
        callbackScope: GlobalData.currGameScene,
        loop: false
    });
}

export function createCoins(scene, itemAmount, minX, minY, maxX, maxY, frame = 48) {
    // if(frame < 48) frame = 48;
    // else if(frame > 52) frame = 52;
    let coinsGroup = scene.physics.add.group();

    for (let i = 0; i < itemAmount; i++) {
        let x = GlobalData.rng.between(minX, maxX);
        let y = GlobalData.rng.between(minY, maxY);

        let coin = coinsGroup.create(x, translateY(y), 'items', frame);

        coin.setScale(1);
    }

    // scene.physics.add.collider(coinsGroup, GlobalData.ground);

    const trigger = {type: "items", object: coinsGroup, callback: coinManager }
    GlobalData.triggers.push(trigger);
}

export function coinManager(player, coin){
    // Setting the amount of points earned depending of what frame is
    let points = coin.frame.name - 47;
    points = 2 * points -1;
    
    if(points > 0) GlobalData.currGameScene.sound.play('coin');
    else GlobalData.currGameScene.sound.play('coint');
    
    coin.destroy();
    updateScore(points);
}

// export function removeItem(player, coin){
//     coin.destroy();
// }

export function generateItems() {
    const scene = GlobalData.currGameScene;
    if (GlobalData.currLvl === 1){
        createCoins(scene, 25, 410, 0, GlobalData.mapSizeX - 200, 600, 48);
        createCoins(scene, 20, 410, 0, GlobalData.mapSizeX - 200, 600, 49);
        createCoins(scene, 15, 410, 0, GlobalData.mapSizeX - 200, 600, 50);
        createCoins(scene, 10, 410, 0, GlobalData.mapSizeX - 200, 600, 51);
        createCoins(scene, 5, 410, 0, GlobalData.mapSizeX - 200, 600, 52);
    }
    else createCoins(scene, 30, 300, GlobalData.mapSizeY, 900, 400, 40);
}