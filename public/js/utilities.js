import { game, GlobalData } from './main.js';
import { socket } from './socket.js';

export function getDefaultGlobalData() {
    return {
        currGameScene: null,
        currLvl: 0,
        currUIScene: null,
        start_line: null,
        startWall: null, // Agregamos variable para la pared de la línea de salida
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
        timeElapsed: 0
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
    scene.isPaused = true;
    scene.muteBtn.setVisible(!scene.isMusicMuted);
    scene.unmuteBtn.setVisible(scene.isMusicMuted);
    scene.exitBtn.setVisible(true);
}

export function continueGame(scene) {
    scene.isPaused = false;
    scene.muteBtn.setVisible(false);
    scene.unmuteBtn.setVisible(false);
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
    GlobalData.backgroundMusic.stop();
    GlobalData.currUIScene.isPaused = false;
    GlobalData.currUIScene.scene.stop();
    GlobalData.currGameScene.scene.start(sceneName);
    resetGlobalData();
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

// Función comentada para crear zonas de daño (para futura implementación de la vida)
// export function CreateDamageZone(scene, x, y, width, height, key) {
//     // Ejemplo de implementación para zona de daño:
//     // const damageZone = scene.add.zone(x, y, width, height);
//     // scene.physics.add.existing(damageZone, true);
//     // damageZone.key = key;
//     // return damageZone;
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

//
// Modificamos CreateStartZone para que cree la pared de inicio de forma separada
//
export function CreateStartZone(scene, x, y, tilesX, tilesY) {
    const width = tilesX * 16;
    const height = tilesY * 16;
    
    CreatePlatform(scene, 0, height + 16, x + 16);
    // Creamos la pared de la línea de salida y la almacenamos en GlobalData.startWall
    const wallSprite = scene.add.tileSprite(x, translateY(y), 16, height, 'wall').setOrigin(0, 1);
    const wallCollider = scene.physics.add.staticBody(x, translateY(y) - height, 16, height);
    GlobalData.startWall = { sprite: wallSprite, collider: wallCollider };
    GlobalData.colliders.push(wallCollider);

    // Creamos la race_line (línea visual de inicio) y la almacenamos en GlobalData.start_line
    const race_lineSprite = scene.add.tileSprite(x, translateY(y), width, height, 'race_line').setOrigin(1);
    race_lineSprite.alpha = 0.5;
    const race_lineCollider = scene.physics.add.staticBody(x - width, translateY(y) - height, width, height);
    GlobalData.start_line = { race_line: race_lineSprite, collider: race_lineCollider };
    const trigger = { type: "start_line", object: race_lineCollider, callback: SetplayerReady };
    GlobalData.triggers.push(trigger);
}

export function CreateWall(scene, x, y, height) {
    const sprite = scene.add.tileSprite(x, translateY(y), 16, height, 'wall').setOrigin(0, 1);
    const collider = scene.physics.add.staticBody(x, translateY(y) - height, 16, height);
    GlobalData.greatWall = { sprite, collider };
    GlobalData.colliders.push(collider);
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
    partialReset();
    GlobalData.backgroundMusic.stop();
    GlobalData.currGameScene.scene.start(targetScene);
}

export function SetplayerReady() {
    if (!GlobalData.playerReady && !GlobalData.levelStarted) {
        console.log(GlobalData.player.name, "is ready!");
        GlobalData.playerReady = true;
        socket.emit("playerReady", { isReady: true });
    }
}

export function CreateTimer(scene, key, x, y, time, fontSize) {
    let reminingTime = time - 1;

    const timerText = scene.add.text(x, y, `${reminingTime}`, { fontFamily: 'Alagard', fontSize: `${fontSize}px`, fill: '#fff', stroke: '#000', strokeThickness: 8, align: 'center' });
    const timerEvent = scene.time.addEvent({
        delay: 1000,
        callback: () => {
            reminingTime--;
            timerText.setText(`${reminingTime}`);
            if (reminingTime < 0) {
                removeTimer(key);
                removeGreatWall();
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

//
// Actualizamos removeGreatWall para eliminar la pared y línea de salida creadas en CreateStartZone
//
export function removeGreatWall() {
    socket.emit("gamestarted", { started: true });
    console.log("open the gates!");
    if (GlobalData.startWall) {
        if (GlobalData.startWall.sprite) GlobalData.startWall.sprite.destroy();
        if (GlobalData.startWall.collider) GlobalData.startWall.collider.destroy();
        GlobalData.startWall = null;
    }
    if (GlobalData.start_line) {
        if (GlobalData.start_line.race_line) GlobalData.start_line.race_line.destroy();
        if (GlobalData.start_line.collider) GlobalData.start_line.collider.destroy();
        GlobalData.start_line = null;
    }
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

export function partialReset() {
    GlobalData.start_line = null;
    GlobalData.startWall = null;
    GlobalData.player = null;
    GlobalData.playerData = null;
    GlobalData.players = {};
    GlobalData.playersData = {};
    GlobalData.colliders = [];
    GlobalData.triggers = [];
    GlobalData.levelStarted = false;
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
