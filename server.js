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
let playersReady = 0;
let gamestarted = false;

// Setting static directory
app.use(express.static('public'));

// using phaser module as /phaser
app.use("/phaser", express.static("node_modules/phaser/dist"));

app.get('/', (req, res) => {
    res.sendFile('public/index.html');
});

io.on("connection", (socket) => {
    if (gamestarted) { 
        socket.emit("returnToMenu");
        return
    };
    console.log("New player connected:", socket.id);

    socket.on("LevelReady", (data) => {

        players[socket.id] = {
            lvl: data.lvl,
            x: 80,
            y: 667 - 250,
            charName: data.charName,
            isReady: false
        };

        // Sending list of current players to client
        socket.emit("currentPlayers", players);
        // Sendig new player to other clients
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
    });

    socket.on("playerVelX", (data) => {
        // console.log(`${socket.id} - velX(${data.playerVelX})`);
        socket.broadcast.emit("updateVelX", { id: socket.id, lvl: players[socket.id].lvl ,playerVelX: data.playerVelX});
    });

    socket.on("playerVelY", (data) => {
        // console.log(`${socket.id} - velY(${data.playerVelY})`);
        socket.broadcast.emit("updateVelY", { id: socket.id, lvl: players[socket.id].lvl ,playerVelY: data.playerVelY});
    });

    socket.on("playerAction", (data) => {
        // console.log(`${socket.id} - ${data.playerAction}`);
        socket.broadcast.emit("updateAction", { id: socket.id, lvl: players[socket.id].lvl ,playerAction: data.playerAction});
    });

    // When a client disconnects
    socket.on("disconnect", () => {
        console.log("player disconnected:", socket.id);
        delete players[socket.id];
        if(!Object.keys(players).length) {
            gamestarted = false;
        }

        // Notifing to online clients
        socket.broadcast.emit("playerDisconnected", socket.id);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
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