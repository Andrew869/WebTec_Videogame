import { game, GlobalData } from './main.js';
import { characters } from './characters.js';
<<<<<<< HEAD
=======
import { exitGame, CreateTimer, removeTimer, removePlayer} from './utilities.js';
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb

export const socket = io({ autoConnect: false });

socket.on('connect', () => {
    // console.log(socket.id); // an alphanumeric id...
});

<<<<<<< HEAD
// 
=======
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
socket.on("currentPlayers", (players) => {
    for (let playerId in players) {
        if(playerId === socket.id)
            createPlayer(playerId, players[playerId]);
<<<<<<< HEAD
        else 
            createPlayer(playerId, players[playerId], false);
=======
        else {
            console.log(players[playerId].lvl + " - " + GlobalData.currLvl);
            if(players[playerId].lvl === GlobalData.currLvl) createPlayer(playerId, players[playerId], false);
        }
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    }
});

socket.on("newPlayer", (data) => {
<<<<<<< HEAD
    createPlayer(data.id, data.playerData, false);
});

socket.on("updatePosition", (data) => {
    updatePlayerPosition(data.id, data.position);
});

socket.on("updateVelX", (data) => {
    // console.log(`playerVelX - ${data.playerVelX}`);
    updatePlayerVelX(data.id, data.playerVelX);
});

socket.on("updateVelY", (data) => {
    // console.log(`playerVelY - ${data.playerVelY}`);
=======
    // console.log(data.playerData.lvl + " - " + GlobalData.currLvl);
    if(data.playerData.lvl === GlobalData.currLvl)
        createPlayer(data.id, data.playerData, false);
});

socket.on("updatePosition", (data) => {
    if(data.lvl === GlobalData.currLvl)
        updatePlayerPosition(data.id, data.position);
});

socket.on("updateVelX", (data) => {
    if(data.lvl === GlobalData.currLvl)
        updatePlayerVelX(data.id, data.playerVelX);
});

socket.on("updateVelY", (data) => {
    if(data.lvl === GlobalData.currLvl)
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    updatePlayerVelY(data.id, data.playerVelY);
});

socket.on("updateAction", (data) => {
<<<<<<< HEAD
    // console.log(`${socket.id} - ${data.playerAction}`);
=======
    if(data.lvl === GlobalData.currLvl)
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    updatePlayerAction(data.id, data.playerAction);
});

socket.on("playerDisconnected", (playerId) => {
    removePlayer(playerId);
});

<<<<<<< HEAD
function createPlayer(playerId, playerData, isItMine = true) {
    const charName = playerData.charName;
    const player = GlobalData.currScene.physics.add.sprite(playerData.x, playerData.y, playerData.charName);
    // player.id = playerId;
=======
socket.on("startTimer", () => {
    console.log("start timer");
    CreateTimer(GlobalData.currUIScene, "start_timer",GlobalData.halfWidth, GlobalData.halfHeight, 5, 100);
});

socket.on("removeTimer", () => {
    removeTimer("start_timer");
});

socket.on("redrawReadyPlayersText", (data) => {
    GlobalData.currUIScene.readyPlayersText.setText('Ready: ' + data.text);
});

socket.on("returnToMenu", () => {
    exitGame(GlobalData.currGameScene);
});

function createPlayer(playerId, playerData, isItMine = true) {
    const charName = playerData.charName;
    const player = GlobalData.currGameScene.physics.add.sprite(playerData.x, playerData.y, playerData.charName);
    player.setOrigin(0.5);
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    player.setName(playerId); // Asigna el id al sprite para identificarlo
    player.setSize(characters[charName].size.width, characters[charName].size.height);
    player.setOffset(characters[charName].offset.x, characters[charName].offset.y);
    player.setCollideWorldBounds(true);
<<<<<<< HEAD

    const data = {
=======
    // player.alpha = 0.5;

    const data = {

        playerReady: false,
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
        currentSpeed : GlobalData.speed,
        currentJumpForce : GlobalData.jumpForce,
        isAttacking : false,
        isLanding : false,
        isJumping : false,
        isOnGround : false,
        prevOnGround : true
    }

<<<<<<< HEAD
    GlobalData.playersData[playerId] = data;

    GlobalData.currScene.physics.add.collider(player, GlobalData.ground);
    
    GlobalData.colliders.forEach(collider => {
        GlobalData.currScene.physics.add.collider(player, collider);
    });

    GlobalData.triggers.array.forEach(triggers => {
        GlobalData.currScene.physics.add.overlap(player, triggers, this.collectCoin, null, this);
    });
    
=======
    GlobalData.currGameScene.physics.add.collider(player, GlobalData.ground);
    
    GlobalData.colliders.forEach(collider => {
        GlobalData.currGameScene.physics.add.collider(player, collider);
    });
    
    GlobalData.triggers.forEach(trigger => {
        const object = trigger.object;
        switch (trigger.type) {
            case 'portal':
                {
                    const targetScene = trigger.targetScene;
                    GlobalData.currGameScene.physics.add.overlap(player, object, (player, object) => (isItMine? trigger.callback(targetScene) : removePlayer(player.name)), null, GlobalData.currGameScene);
                }
                break;
            case 'start_line':
                {
                    GlobalData.currGameScene.physics.add.overlap(player, object, isItMine? trigger.callback : () => {}, null, GlobalData.currGameScene);
                    GlobalData.start_line = object;
                }
                break;
        }
    });

>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    GlobalData.players[playerId] = player;

    if(isItMine){
        player.setDepth(2);
        GlobalData.player = player;
        GlobalData.playerData = data;

        // GlobalData.playerStastes = playerStastes;
<<<<<<< HEAD
        GlobalData.mainCamera = GlobalData.currScene.cameras.main;
        GlobalData.mainCamera.setZoom(2);
        GlobalData.mainCamera.startFollow(GlobalData.player);
        GlobalData.mainCamera.setBounds(0, 0, GlobalData.mapSizeX, GlobalData.currScene.scale.height);
    }
    // else {
    //     const playerStastes = {
    //         isAttacking : false,
    //         isLanding : false,
    //         isJumping : false,
    //         isOnGround : false,
    //         prevOnGround : true
    //     }
    //     GlobalData.playersStates[playerId] = playerStastes;
    // }
=======
        GlobalData.mainCamera = GlobalData.currGameScene.cameras.main;
        GlobalData.mainCamera.setZoom(2);
        GlobalData.mainCamera.startFollow(GlobalData.player);
        GlobalData.mainCamera.setBounds(0, 0, GlobalData.mapSizeX, GlobalData.mapSizeY);
    }
    else {
        GlobalData.playersData[playerId] = data;
    }
    socket.emit("UIReady");
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
}

function updatePlayerVelX(playerId, playerVelX) {
    const player = GlobalData.players[playerId];
    player.setVelocityX(playerVelX);
    if(player.body.velocity.x < 0) player.setFlipX(true);
    else if(player.body.velocity.x > 0) player.setFlipX(false);
}

function updatePlayerVelY(playerId, playerVelY) {
    const player = GlobalData.players[playerId];
    player.setVelocityY(playerVelY);
}

function updatePlayerAction(playerId, playerAction) {
    const player = GlobalData.players[playerId];
    const playerData = GlobalData.playersData[playerId];

    switch(playerAction) {
        case 'jump':
            {
                playerData.isJumping = true;
                player.setVelocityY(-playerData.currentJumpForce);
                player.anims.play(player.texture.key + '_' + 'jump', true);
                player.on('animationcomplete', (animation, frame) => {
                    playerData.isJumping = false;
                });
            }
            break;
        case 'attack':
            {
                playerData.isAttacking = true;
                player.anims.play(player.texture.key + '_' + 'attack');
                player.on('animationcomplete', (animation, frame) => {
                    playerData.isAttacking = false;
                });
            }
            break;
    }
}

function updatePlayerPosition(playerId, position) {
    const player = GlobalData.players[playerId];
    if (player) {
        player.setPosition(position.x, position.y);
    }
<<<<<<< HEAD
}

// Remove offline player
function removePlayer(playerId) {
    const player = GlobalData.players[playerId];
    if (player) {
        player.destroy();
        delete GlobalData.players[playerId];
        delete GlobalData.playersData[playerId];
    }
}
=======
}
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
