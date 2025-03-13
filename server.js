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

// Setting static directory
app.use(express.static('public'));

// using phaser module as /phaser
app.use("/phaser", express.static("node_modules/phaser/dist"));

app.get('/', (req, res) => {
    res.sendFile('public/index.html');
});

io.on("connection", (socket) => {
    console.log("New player connected:", socket.id);

    

    socket.on("readyToPlay", (data) => {

        players[socket.id] = {
            x: Math.random() * 100,
            y: 450,
            charName: data.charName
        };

        // Sending list of current players to client
        socket.emit("currentPlayers", players);
        // Sendig new player to other clients
        socket.broadcast.emit("newPlayer", { id: socket.id, playerData: players[socket.id] });
    });

    socket.on("playerPosition", (data) => {
        players[socket.id].x = data.x;
        players[socket.id].y = data.y;
        socket.broadcast.emit("updatePosition", { id: socket.id, position: data });
    });

    socket.on("playerVelX", (data) => {
        // console.log(`${socket.id} - velX(${data.playerVelX})`);
        socket.broadcast.emit("updateVelX", { id: socket.id, playerVelX: data.playerVelX});
    });

    socket.on("playerVelY", (data) => {
        // console.log(`${socket.id} - velY(${data.playerVelY})`);
        socket.broadcast.emit("updateVelY", { id: socket.id, playerVelY: data.playerVelY});
    });

    socket.on("playerAction", (data) => {
        // console.log(`${socket.id} - ${data.playerAction}`);
        socket.broadcast.emit("updateAction", { id: socket.id, playerAction: data.playerAction});
    });

    // When a client disconnects
    socket.on("disconnect", () => {
        console.log("player disconnected:", socket.id);
        delete players[socket.id];
        // Notifing to online clients
        socket.broadcast.emit("playerDisconnected", socket.id);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
    open(`http://localhost:${PORT}`);
});

