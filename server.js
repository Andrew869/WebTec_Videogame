const express = require("express");
const open = require('open').default;
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 3000;

let players = {};
<<<<<<< HEAD
=======
let playersReady = 0;
let gamestarted = false;
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb

// Setting static directory
app.use(express.static('public'));

// using phaser module as /phaser
app.use("/phaser", express.static("node_modules/phaser/dist"));

app.get('/', (req, res) => {
    res.sendFile('public/index.html');
});

io.on("connection", (socket) => {
<<<<<<< HEAD
    console.log("New player connected:", socket.id);

    

    socket.on("readyToPlay", (data) => {

        players[socket.id] = {
            x: Math.random() * 100,
            y: 450,
            charName: data.charName
=======
    if (gamestarted) { 
        socket.emit("returnToMenu");
        return
    };
    console.log("New player connected:", socket.id);

    socket.on("LevelReady", (data) => {

        players[socket.id] = {
            lvl: data.lvl,
            x: 80,
            y: data.groundY - 250,
            charName: data.charName,
            isReady: false
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
        };

        // Sending list of current players to client
        socket.emit("currentPlayers", players);
        // Sendig new player to other clients
<<<<<<< HEAD
        socket.broadcast.emit("newPlayer", { id: socket.id, playerData: players[socket.id] });
    });

    socket.on("playerPosition", (data) => {
        players[socket.id].x = data.x;
        players[socket.id].y = data.y;
        socket.broadcast.emit("updatePosition", { id: socket.id, position: data });
=======
        socket.broadcast.emit("removeTimer");
        socket.broadcast.emit("newPlayer", { id: socket.id, playerData: players[socket.id] });
    });

    socket.on("UIReady", () => {
        sendReadyPlayers();
    });

    socket.on("gamestarted", (data) => {
        gamestarted = data.started;
    });

    socket.on("playerReady", (data) => {
        players[socket.id].isReady = data.isReady;
        // let playersReady = 0;
        
        sendReadyPlayers();

        if(playersReady === Object.keys(players).length) {
            io.emit("startTimer");
        }
        else if(playersReady < Object.keys(players).length){
            io.emit("removeTimer");
        }
    });

    // socket.on("playerNotReady", () => {

    // });

    socket.on("playerPosition", (data) => {
        players[socket.id].x = data.x;
        players[socket.id].y = data.y;
        socket.broadcast.emit("updatePosition", { id: socket.id, lvl: players[socket.id].lvl ,position: data });
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    });

    socket.on("playerVelX", (data) => {
        // console.log(`${socket.id} - velX(${data.playerVelX})`);
<<<<<<< HEAD
        socket.broadcast.emit("updateVelX", { id: socket.id, playerVelX: data.playerVelX});
=======
        socket.broadcast.emit("updateVelX", { id: socket.id, lvl: players[socket.id].lvl ,playerVelX: data.playerVelX});
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    });

    socket.on("playerVelY", (data) => {
        // console.log(`${socket.id} - velY(${data.playerVelY})`);
<<<<<<< HEAD
        socket.broadcast.emit("updateVelY", { id: socket.id, playerVelY: data.playerVelY});
=======
        socket.broadcast.emit("updateVelY", { id: socket.id, lvl: players[socket.id].lvl ,playerVelY: data.playerVelY});
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    });

    socket.on("playerAction", (data) => {
        // console.log(`${socket.id} - ${data.playerAction}`);
<<<<<<< HEAD
        socket.broadcast.emit("updateAction", { id: socket.id, playerAction: data.playerAction});
=======
        socket.broadcast.emit("updateAction", { id: socket.id, lvl: players[socket.id].lvl ,playerAction: data.playerAction});
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
    });

    // When a client disconnects
    socket.on("disconnect", () => {
        console.log("player disconnected:", socket.id);
        delete players[socket.id];
<<<<<<< HEAD
=======
        if(!Object.keys(players).length) {
            gamestarted = false;
        }

>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
        // Notifing to online clients
        socket.broadcast.emit("playerDisconnected", socket.id);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
<<<<<<< HEAD
    open(`http://localhost:${PORT}`);
});

=======
    // open(`http://localhost:${PORT}`);
});

function sendReadyPlayers (){
    playersReady = 0;
    Object.values(players).forEach(player => {
        if(player.isReady) {
            playersReady++;
        }
    });
    const text = `${playersReady} / ${Object.keys(players).length}`
    console.log(text);
    io.emit("redrawReadyPlayersText", {text: text});

}
>>>>>>> a33f8233a1f06346192c30f700bdf6ae88d7a9fb
