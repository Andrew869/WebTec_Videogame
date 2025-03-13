import { game, GlobalData } from './main.js';
import { characters } from './characters.js';

export const socket = io({ autoConnect: false });

socket.on('connect', () => {
    // console.log(socket.id); // an alphanumeric id...
});

// 
socket.on("currentPlayers", (players) => {
    for (let playerId in players) {
        if(playerId === socket.id)
            createPlayer(playerId, players[playerId]);
        else 
            createPlayer(playerId, players[playerId], false);
    }
});

socket.on("newPlayer", (data) => {
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
    updatePlayerVelY(data.id, data.playerVelY);
});

socket.on("updateAction", (data) => {
    // console.log(`${socket.id} - ${data.playerAction}`);
    updatePlayerAction(data.id, data.playerAction);
});

socket.on("playerDisconnected", (playerId) => {
    removePlayer(playerId);
});

function createPlayer(playerId, playerData, isItMine = true) {
    const charName = playerData.charName;
    const player = GlobalData.currScene.physics.add.sprite(playerData.x, playerData.y, playerData.charName);
    // player.id = playerId;
    player.setName(playerId); // Asigna el id al sprite para identificarlo
    player.setSize(characters[charName].size.width, characters[charName].size.height);
    player.setOffset(characters[charName].offset.x, characters[charName].offset.y);
    player.setCollideWorldBounds(true);

    const data = {
        currentSpeed : GlobalData.speed,
        currentJumpForce : GlobalData.jumpForce,
        isAttacking : false,
        isLanding : false,
        isJumping : false,
        isOnGround : false,
        prevOnGround : true
    }

    GlobalData.playersData[playerId] = data;

    GlobalData.currScene.physics.add.collider(player, GlobalData.ground);
    
    GlobalData.colliders.forEach(collider => {
        GlobalData.currScene.physics.add.collider(player, collider);
    });
    
    GlobalData.players[playerId] = player;

    if(isItMine){
        player.setDepth(2);
        GlobalData.player = player;
        GlobalData.playerData = data;

        // GlobalData.playerStastes = playerStastes;
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
