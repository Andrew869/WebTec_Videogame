import { game, GlobalData } from './main.js';

export const socket = io();

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
    createPlayer(data.id, data.position, false);
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

function createPlayer(playerId, position, isItMine = true) {
    const player = game.scene.scenes[1].physics.add.sprite(position.x, position.y, "rogue");
    player.setName(playerId); // Asigna el id al sprite para identificarlo
    player.setSize(GlobalData.currChar.size.width, GlobalData.currChar.size.height);
    player.setOffset(GlobalData.currChar.offset.x, GlobalData.currChar.offset.y);
    player.setCollideWorldBounds(true);
    
    game.scene.scenes[1].physics.add.collider(player, GlobalData.ground);
    
    // game.scene.scenes[1].players[playerId] = player;
    GlobalData.players[playerId] = player;

    if(isItMine){
        player.setDepth(2);
        GlobalData.player = player;
        // GlobalData.playerStastes = playerStastes;
        GlobalData.mainCamera = game.scene.scenes[1].cameras.main;
        GlobalData.mainCamera.setZoom(2);
        GlobalData.mainCamera.startFollow(GlobalData.player);
        GlobalData.mainCamera.setBounds(0, 0, GlobalData.mapSizeX, game.scene.scenes[1].scale.height);
    }
    else {
        const playerStastes = {
            isAttacking : false,
            isLanding : false,
            isJumping : false,
            isOnGround : false,
            prevOnGround : true
        }
        GlobalData.playersStates[playerId] = playerStastes;
    }
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
    const playerStates = GlobalData.playersStates[playerId];

    switch(playerAction) {
        case 'jump':
            {
                playerStates.isJumping = true;
                player.setVelocityY(-300);
                player.anims.play(GlobalData.currChar.charName + '_' + 'jump', true);
                player.on('animationcomplete', (animation, frame) => {
                    playerStates.isJumping = false;
                });
            }
            break;
        case 'attack':
            {
                playerStates.isAttacking = true;
                player.anims.play(GlobalData.currChar.charName + '_' + 'attack');
                player.on('animationcomplete', (animation, frame) => {
                    playerStates.isAttacking = false;
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
        delete GlobalData.playersStates[playerId];
    }
}
